'use server';

import { isDev } from '@/env';
import prisma from '@/server/prisma/client';
import assert from 'assert';

export const deleteClaim = async (claimId: number) => {
  assert(isDev, 'Not in dev mode');

  await prisma.claim.delete({
    where: {
      id: claimId,
    },
  });
};
