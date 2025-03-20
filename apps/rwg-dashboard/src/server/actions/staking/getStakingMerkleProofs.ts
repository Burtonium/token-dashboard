'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '../../auth';
import { constructError } from '../errors';

export const getStakingMerkleProofs = authGuard(
  async (user, lastClaimEpoch: number) => {
    const walletAddress = user.addresses.find((address: string) =>
      address.startsWith('0x'),
    );

    if (!walletAddress) {
      return constructError('No wallet address found');
    }

    const proofs = await prisma.stakingVoteMerkleProof.findMany({
      where: {
        walletAddress,
        tree: {
          epoch: {
            gt: lastClaimEpoch,
          },
        },
      },
      include: {
        tree: {
          select: {
            epoch: true,
          },
        },
      },
      // This is important, as proofs must be supplied to the
      // smart contract in ascending order
      orderBy: {
        tree: {
          epoch: 'asc',
        },
      },
    });

    return proofs.map(({ proof, tree: { epoch } }) => ({
      proof,
      epoch,
    }));
  },
);
