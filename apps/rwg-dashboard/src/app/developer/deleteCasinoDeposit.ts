'use server';

import { isDev } from '@/env';
import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import assert from 'assert';

export const deleteCasinoTotalDeposit = authGuard(async (_user, id: number) => {
  assert(isDev, 'Not in dev mode');

  await prisma.casinoDepositTotal.delete({
    where: {
      id,
    },
  });
});
