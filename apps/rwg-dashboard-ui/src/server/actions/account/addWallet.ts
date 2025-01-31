'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';

export const addWallet = authGuard(
  async (user, { chain, address }: { chain: string; address: string }) => {
    return prisma.linkedWallet.create({
      data: {
        chain,
        address,
        dynamicUserId: user.id,
      },
    });
  },
);
