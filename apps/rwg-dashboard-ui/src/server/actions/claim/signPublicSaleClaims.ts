'use server';

import prisma from '../../prisma/client';
import { constructError } from '../errors';
import { decodeUser } from '../../auth';
import { getClaimableAmounts } from './getClaimableAmounts';
import { readContracts } from '@wagmi/core';
import { tokenMasterAddress, tokenMasterAbi } from '@/contracts/generated';
import config from '@/config/wagmi';
import assert from 'assert';
import { privateKeyToAccount } from 'viem/accounts';
import { env, isDev } from '@/env';
import { toHex } from 'viem';
import { isServerActionError } from '@/lib/serverActionErrorGuard';

export const signPublicSaleClaims = async (authToken: string) => {
  let user;
  try {
    user = await decodeUser(authToken);
  } catch (error) {
    return constructError((error as Error).message);
  }

  assert(isDev, 'token master not deployed to prod');
  if (!env.TOKEN_MASTER_SIGNER_PRIVATE_KEY?.startsWith('0x')) {
    return constructError('No signer key');
  }

  return prisma.$transaction(async (tx) => {
    const claimable = await getClaimableAmounts(authToken, tx);

    if (isServerActionError(claimable)) {
      return claimable;
    }

    const { signable } = claimable;

    const hashedMessages = (
      await readContracts(config, {
        contracts: signable.map((claim) => ({
          address: tokenMasterAddress['11155111'],
          abi: tokenMasterAbi,
          functionName: 'getMessageHash',
          args: [
            toHex(claim.id, { size: 16 }),
            claim.address,
            claim.amount + claim.bonus,
            toHex(0, { size: 32 }),
          ],
        })),
      })
    ).map((read) => read.result);

    if (hashedMessages.length !== signable.length) {
      return constructError('Found different amount of hashes than expected.');
    }
    if (!hashedMessages.every((result) => typeof result === 'string')) {
      return constructError('Something went wrong while signing the claims.');
    }

    const account = privateKeyToAccount(
      env.TOKEN_MASTER_SIGNER_PRIVATE_KEY as `0x${string}`,
    );

    const signatures = await Promise.all(
      hashedMessages.map((hashedMessage) =>
        account.signMessage({ message: { raw: hashedMessage } }),
      ),
    );

    await Promise.all([
      Promise.all(
        signable.map((claim, index) =>
          tx.claim.update({
            where: { id: claim.id },
            data: {
              status: 'Signed',
              signature: signatures[index],
              bonus: claim.bonus.toString(),
            },
          }),
        ),
      ),
      tx.reward.updateMany({
        where: {
          userId: user.id,
          AND: {
            membership: {
              address: {
                in: user.addresses,
              },
              wave: {
                endTime: {
                  gte: new Date(),
                },
                startTime: {
                  lte: new Date(),
                },
                live: {
                  equals: true,
                },
              },
            },
          },
        },
        data: {
          redeemed: true,
        },
      }),
    ]);
  });
};
