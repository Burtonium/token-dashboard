import 'server-only';

import { EXPIRED_HOURS, MAX_CLAIM, WAGERING_HOURS } from '@/config/realbetApi';
import { env } from '@/env';
import { ApiClient, Bonus } from '@bltzr-gg/realbet-api';

const realbetApi = new ApiClient({
  secret: env.REALBET_API_SECRET_KEY,
  apiUrl: env.REALBET_API_URL,
});

export const rewardToBonusId: Record<number, number> = {
  10_000: 142,
  5_000: 168,
  2_500: 169,
  1_000: 170,
  500: 171,
};

export const bonusIdToReward: Record<number, number> = Object.entries(
  rewardToBonusId,
)
  .map(([reward, bonusId]) => [Number(bonusId), Number(reward)] as const)
  .reduce((acc, [bonusId, reward]) => ({ ...acc, [bonusId]: reward }), {});

export const creditUserBonus = async (
  realbetUserId: number,
  bonus:
    | {
        id: number;
      }
    | {
        name: string;
        amount: number;
        description: string;
      },
) => {
  if ('id' in bonus) {
    return Bonus.creditUserBonus(realbetApi, {
      userId: realbetUserId,
      bonusId: bonus.id,
    });
  } else if ('name' in bonus) {
    return Bonus.creditUserBonus(realbetApi, {
      userId: realbetUserId,
      bonusDetail: {
        amount: bonus.amount,
        name: bonus.name,
        description: bonus.description,
        maxClaim: MAX_CLAIM,
        wageringHours: WAGERING_HOURS,
        expiredHours: EXPIRED_HOURS,
      },
    });
  }

  throw new Error('Invalid bonus object provided');
};
