'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '@/server/auth';
import assert from 'assert';
import { isDev } from '@/env';

export const getClaims = authGuard(async ({ addresses }) => {
  assert(isDev, 'Not in dev mode');

  return (
    await prisma.claim.findMany({
      where: {
        address: {
          in: addresses,
        },
      },
    })
  ).map((claim) => ({
    ...claim,
    amount: BigInt(claim.amount.toFixed(0) ?? '0'),
    bonus: claim.bonus && BigInt(claim.bonus.toFixed(0) ?? '0'),
  }));
});
