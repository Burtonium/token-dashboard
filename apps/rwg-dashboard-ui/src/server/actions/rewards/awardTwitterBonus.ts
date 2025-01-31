'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '../../auth';
import { TWITTER_BONUS_TICKETS } from '@/config/linkToWin';
import { constructError } from '@/server/actions/errors';
import { getCurrentWave } from '../ticket-waves/getCurrentWave';

export const awardTwitterBonus = authGuard(async (user) => {
  return prisma.$transaction(async (tx) => {
    const previouslyShared = await tx.awardedTickets.findFirst({
      where: {
        type: 'TwitterShare',
        membership: {
          address: {
            in: user.addresses,
          },
        },
      },
    });

    if (previouslyShared) {
      return constructError('Already redeemed twitter share');
    }

    const currentWave = await getCurrentWave(tx, user.addresses);

    if (!currentWave) {
      return constructError('No active ticket wave');
    }

    const membership = currentWave.memberships[0];

    if (!membership) {
      return constructError('Not a member of the current wave');
    }

    await Promise.all([
      tx.awardedTickets.create({
        data: {
          type: 'TwitterShare',
          amount: TWITTER_BONUS_TICKETS,
          membershipId: membership.id,
        },
      }),
      tx.waveMembership.update({
        where: {
          id: membership.id,
          waveId: currentWave.id,
        },
        data: {
          reedeemableTickets: {
            increment: TWITTER_BONUS_TICKETS,
          },
        },
      }),
    ]);
  });
});
