'use server';

import type { Prisma } from '@prisma/client';
import prisma from '@/server/prisma/client';
import { authGuard } from '../../auth';

export const getCurrentWaveMembership = authGuard(
  async (user, tx?: Prisma.TransactionClient) => {
    const currentWave = await (tx ?? prisma).rewardWave.findFirst({
      where: {
        endTime: {
          gte: new Date(),
        },
        startTime: {
          lte: new Date(),
        },
        live: {
          equals: true,
        },
      },
      include: {
        memberships: {
          where: {
            address: {
              in: user.addresses,
            },
          },
          include: {
            rewards: true,
            awardedTickets: true,
          },
          take: 1,
        },
      },
    });

    return (
      currentWave?.memberships[0] && {
        ...currentWave?.memberships[0],
        rewards: currentWave?.memberships[0]?.rewards.map((r) => ({
          ...r,
          amount: Number(r.amount),
        })),
        awardedTickets: currentWave?.memberships[0]?.awardedTickets,
      }
    );
  },
);
