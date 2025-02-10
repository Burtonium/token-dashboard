'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { constructError } from '../errors';

export const addWallet = authGuard(
  async (user, { chain, address }: { chain: string; address: string }) => {
    return prisma.linkedWallet
      .create({
        data: {
          chain,
          address: address,
          dynamicUserId: user.id,
        },
      })
      .catch((e) => {
        return constructError(`Failed to add wallet: ${(e as Error).message}`);
      });
  },
);
