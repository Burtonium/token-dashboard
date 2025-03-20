'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { constructError } from '../../server/actions/errors';
import { isDev } from '@/env';
import assert from 'assert';
import { getAddress } from 'viem';

export const addWallet = authGuard(
  async (user, { chain, address }: { chain: string; address: string }) => {
    assert(isDev, 'addWallet is only available in dev mode');

    const checksummedAddress = chain === 'EVM' ? getAddress(address) : address;

    return prisma.linkedWallet
      .create({
        data: {
          chain,
          address: checksummedAddress,
          dynamicUserId: user.id,
        },
      })
      .catch((e) => {
        const message = (e as Error).message.includes(
          'Foreign key constraint violated',
        )
          ? 'Dynamic user not found'
          : (e as Error).message?.includes('Unique constraint failed')
            ? 'Wallet already exists'
            : (e as Error).message;
        return constructError(`Failed to add wallet: ${message}`);
      });
  },
);
