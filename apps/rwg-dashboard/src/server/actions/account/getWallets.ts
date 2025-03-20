'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { sortBy } from 'lodash';

export const getWallets = authGuard(async (user) => {
  const wallets = await prisma.linkedWallet.findMany({
    where: {
      dynamicUserId: user.id,
    },
  });

  return sortBy(
    wallets,
    (wallet) => wallet.lastSelectedAt?.getTime() ?? 0,
  ).reverse();
});
