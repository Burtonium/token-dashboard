'use server';

import prisma from '@/server/prisma/client';
import { creditUserBonus } from '@/server/server-only/creditUserBonus';
import assert from 'assert';
import { calculateDepositsScore } from '@/server/utils';
import { constructError } from '@/server/actions/errors';
import { authGuard } from '@/server/auth';
import * as Sentry from '@sentry/nextjs';

export const claimCasinoDepositReward = authGuard(async (user) => {
  return prisma
    .$transaction(
      async (tx) => {
        const dynamicUser = await tx.dynamicUser.findFirst({
          where: {
            id: user.id,
          },
          include: {
            apiCall: {
              include: {
                totals: true,
              },
            },
            casinoLink: true,
          },
        });

        if (!dynamicUser?.casinoLink) {
          return constructError('Casino link required');
        }

        const apiCall = dynamicUser.apiCall;

        if (!apiCall) {
          return constructError('Api call not found');
        }

        if (apiCall.status !== 'Success' || apiCall.totals.length === 0) {
          return constructError('API Call in an invalid state to claim');
        }

        assert(dynamicUser.casinoLink, 'Casino link not found');

        const amount = calculateDepositsScore(apiCall.totals);

        const updatedCall = await tx.casinoDepositApiCall.update({
          where: {
            id: apiCall.id,
          },
          data: {
            status: 'Claimed',
            reward: {
              create: {
                userId: user.id,
                type: 'RealBetCredit',
                redeemed: true,
                amount,
              },
            },
          },
        });

        assert(updatedCall?.rewardId, 'Reward id not found');

        try {
          await creditUserBonus(dynamicUser.casinoLink.realbetUserId, {
            name: 'Casino Deposits Bonus Claim',
            amount: Number(amount),
            description:
              'You got this bonus because you deposited to eligible casinos.',
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          Sentry.captureException(e);
          throw new Error('Realbet API failed to credit user bonus');
        }
      },
      {
        isolationLevel: 'RepeatableRead',
      },
    )
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      Sentry.captureException(e);
      return constructError('Failed to claim bonus');
    });
});
