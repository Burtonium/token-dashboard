'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '../../auth';
import { getCurrentWave } from '../ticket-waves/getCurrentWave';
import assert from 'assert';
import { getRandomWeightedItem } from '@/utils';
import {
  creditUserBonus,
  rewardToBonusId,
} from '../../server-only/creditUserBonus';
import { constructError } from '../errors';

export const awardRandomReward = authGuard(async (user, nearWins: number) => {
  return await prisma.$transaction(
    async (tx) => {
      const rewardWave = await getCurrentWave(tx);
      if (!rewardWave) {
        return constructError('No active ticket wave');
      }

      const waveMembership = await tx.waveMembership.findFirst({
        where: {
          address: {
            in: user.addresses,
          },
        },
      });

      if (!waveMembership || waveMembership.reedeemableTickets <= 0) {
        return constructError('No tickets remaining');
      }

      const preset = getRandomWeightedItem(
        rewardWave.rewardPresets,
        rewardWave.rewardPresets.map((p) => p.remaining),
      );

      try {
        assert(preset?.remaining, new Error());
      } catch {
        return constructError('Limit reached');
      }

      const [reward] = await Promise.all([
        tx.reward.create({
          data: {
            userId: user.id,
            type: preset.type,
            amount: preset.prize,
            membershipId: waveMembership.id,
            redeemed: preset.type === 'RealBetCredit',
          },
        }),
        tx.waveMembership.update({
          where: {
            id: waveMembership.id,
          },
          data: {
            reedeemableTickets: {
              decrement: 1,
            },
          },
        }),
        tx.rewardPresets.update({
          where: {
            id: preset.id,
          },
          data: {
            remaining: { decrement: 1 },
          },
        }),
      ]);

      if (reward.type === 'RealBetCredit') {
        const casinoLink = await tx.casinoLink.findFirst({
          where: {
            dynamicUserId: user.id,
          },
        });

        const bonusId = rewardToBonusId[Number(reward.amount)];

        try {
          assert(casinoLink, new Error());
        } catch {
          return constructError('Casino link not found');
        }

        try {
          assert(bonusId, new Error());
        } catch {
          return constructError(`Invalid reward: ${Number(reward.amount)}`);
        }

        try {
          await creditUserBonus(casinoLink.realbetUserId, {
            id: bonusId,
          });
        } catch {
          return constructError('Realbet API failed to credit user bonus');
        }
      }

      return {
        reward: {
          ...reward,
          amount: Number(reward.amount),
        },
        nearWins: Array.from({ length: nearWins }).map(() => {
          const item = getRandomWeightedItem(
            rewardWave.rewardPresets,
            rewardWave.rewardPresets.map((p) => p.remaining),
          );

          return { ...item, amount: item.prize };
        }),
      };
    },
    {
      isolationLevel: 'Serializable',
    },
  );
});
