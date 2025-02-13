'use server';

import assert from 'assert';
import prisma from '../../server/prisma/client';
import { isDev } from '@/env';
import { authGuard } from '@/server/auth';

export const deleteWallet = authGuard((user, address: string) => {
  assert(isDev, 'Dev function only');

  return prisma.linkedWallet.delete({
    where: {
      dynamicUserId: user.id,
      address,
    },
  });
});
