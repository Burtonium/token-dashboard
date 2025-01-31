'use server';

import { authGuard } from '../../auth';
import prisma from '../../prisma/client';
import { calculateDepositsScore } from '@/server/utils';

export const fetchCasinoDepositTotals = authGuard(async (user) => {
  const apiCall = await prisma.casinoDepositApiCall.findFirst({
    where: {
      dynamicUserId: user.id,
    },
    include: {
      totals: {
        orderBy: {
          amount: 'desc',
        },
      },
    },
  });

  const score = calculateDepositsScore(apiCall?.totals ?? []);

  return apiCall
    ? {
        ...apiCall,
        score,
        totals: apiCall?.totals.map((t) => ({
          ...t,
          amount: Number(t.amount),
        })),
      }
    : null;
});
