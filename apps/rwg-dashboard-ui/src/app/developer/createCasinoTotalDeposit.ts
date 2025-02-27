'use server';

import { isDev } from '@/env';
import { decodeUser } from '@/server/auth';
import prisma from '@/server/prisma/client';
import assert from 'assert';

export const createCasinoTotalDeposit = async (
  authToken: string,
  total: {
    address: string;
    casino: string;
    blockchain: string;
    symbol: string;
    amount: number;
  },
) => {
  assert(isDev, 'Not in dev mode');
  const user = await decodeUser(authToken);

  await prisma.casinoDepositApiCall.upsert({
    where: {
      dynamicUserId: user.id,
    },
    create: {
      dynamicUserId: user.id,
      status: 'Success',
      totals: {
        create: {
          address: total.address,
          casino: total.casino,
          blockchain: total.blockchain,
          symbol: total.symbol,
          amount: total.amount.toString(),
        },
      },
    },
    update: {
      status: 'Success',
      totals: {
        create: {
          address: total.address,
          casino: total.casino,
          blockchain: total.blockchain,
          symbol: total.symbol,
          amount: total.amount.toString(),
        },
      },
    },
  });
};
