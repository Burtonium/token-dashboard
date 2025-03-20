'use server';

import { isDev } from '@/env';
import prisma from '@/server/prisma/client';
import type { ClaimStatus } from '@prisma/client';
import assert from 'assert';

export const addClaim = async (
  address: string,
  amount: bigint,
  status: ClaimStatus,
  bonus?: bigint,
) => {
  assert(isDev, 'Not in dev mode');
  await prisma.claim.upsert({
    where: {
      address_blockchain_periodId: {
        address,
        blockchain: 'ethereum',
        periodId: 1,
      },
    },
    create: {
      address,
      amount: amount.toString(),
      status,
      blockchain: 'ethereum',
      periodId: 1,
      bonus: bonus?.toString(),
    },
    update: {
      amount: amount.toString(),
      bonus: bonus?.toString(),
      status,
    },
  });
};
