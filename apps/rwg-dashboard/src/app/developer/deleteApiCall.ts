'use server';

import { isDev } from '@/env';
import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import assert from 'assert';

export const deleteApiCall = authGuard(async (user) => {
  assert(isDev, 'Dev function only');
  return prisma.casinoDepositApiCall.delete({
    where: {
      dynamicUserId: user.id,
    },
  });
});
