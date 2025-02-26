'use server';

import { authGuard } from '@/server/auth';
import type { Prisma } from '@prisma/client';
import prisma from '@/server/prisma/client';

const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => (e < m ? e : m));

const calculateBonus = (amount: bigint, bonus: bigint) =>
  bigIntMin(amount, bonus);

export const getClaimableAmounts = authGuard(
  async (user, tx?: Prisma.TransactionClient) => {
    const [userClaims, bonuses] = await Promise.all([
      (tx ?? prisma).claim.findMany({
        where: {
          address: {
            in: user.addresses.map((addr) => addr),
            mode: 'insensitive',
          },
        },
        include: {
          period: true,
        },
      }),
      (tx ?? prisma).reward.findMany({
        where: {
          userId: user.id,
          redeemed: false,
          type: 'TokenBonus',
          membership: {
            wave: {
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
          },
        },
      }),
    ]);

    // TODO use real token decimals
    const bonusAmount =
      bonuses.reduce(
        (sum, bonus) => sum + BigInt(bonus.amount?.toFixed(0) ?? 0n),
        0n,
      ) *
      10n ** 18n;

    const claims =
      userClaims.map((claim) => ({
        ...claim,
        amount: BigInt(claim.amount.toFixed(0)),
        bonus: claim.bonus && BigInt(claim.bonus.toFixed(0)),
      })) ?? [];

    const signable = claims
      .filter(
        (claim) => claim.status === 'Pending' && claim.period?.end > new Date(),
      )
      .map((claim) => ({
        ...claim,
        bonus: calculateBonus(claim.amount, bonusAmount),
      }));

    const signableAmount = signable.reduce(
      (sum, claim) => sum + claim.amount,
      BigInt(0),
    );

    const signableBonus = signable.reduce(
      (sum, claim) => sum + (claim.bonus ?? 0n),
      0n,
    );

    const claimed = claims.filter((claim) => claim.status === 'Claimed');
    const claimedAmount = claimed.reduce(
      (sum, claim) => sum + claim.amount,
      0n,
    );
    const claimedBonus = claimed.reduce(
      (sum, claim) => sum + (claim.bonus ?? 0n),
      0n,
    );
    const claimable = claims.filter(
      (claim) =>
        (claim.status === 'Signed' || claim.status === 'Error') &&
        (claim.period?.end.getTime() ?? 0) > new Date().getTime(),
    );
    const claimableAmount = claimable.reduce(
      (sum, claim) => sum + claim.amount,
      BigInt(0),
    );

    const claimableBonus = claimable.reduce(
      (sum, claim) => sum + (claim.bonus ?? 0n),
      0n,
    );

    return {
      signable,
      claimable,
      claimed,
      amounts: {
        signableAmount,
        signableBonus,
        claimedAmount: claimedAmount,
        claimedBonus,
        claimableAmount: claimableAmount,
        claimableBonus: claimableBonus,
        claimableTotal: claimableAmount + claimableBonus,
      },
      claims,
      period: claims.find(({ period }) => period.end > new Date()),
    };
  },
);
