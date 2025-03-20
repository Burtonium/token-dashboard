'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '@/server/auth'; // Make sure this import path is correct

export const removeWallet = authGuard(
  (user, { chain, address }: { chain: string; address: string }) =>
    prisma.linkedWallet.delete({
      where: {
        chain,
        address,
        dynamicUserId: user.id,
      },
    }),
);
