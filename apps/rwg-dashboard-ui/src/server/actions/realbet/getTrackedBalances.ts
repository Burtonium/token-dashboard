'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { z } from 'zod';
import { constructError } from '../errors';
import { TokenType } from '@prisma/client';

const BalancesSchema = z
  .object({
    token: z.nativeEnum(TokenType),
    balance: z
      .string()
      .or(z.null())
      .transform((value) => BigInt(value?.split('.')?.[0] ?? 0)),
  })
  .array();

export const getTrackedBalances = authGuard(async (user) => {
  const results = await prisma.$queryRaw`
    SELECT
      token,
      CAST(SUM(amount) AS TEXT) AS balance
    FROM (
      SELECT
        t.token,
        t.value AS amount
      FROM "LinkedWallet" l
      JOIN "Transfers" t
        ON l.address = t.to
      WHERE l."dynamicUserId" = ${user.id}
      UNION ALL
      SELECT
        t.token,
        -t.value AS amount
      FROM "LinkedWallet" l
      JOIN "Transfers" t
        ON l.address = t.from
      WHERE l."dynamicUserId" = ${user.id}
    ) AS transfers
    GROUP BY token;
  `;

  if (Array.isArray(results) && results.length === 0) {
    return constructError('No linked wallets found');
  }

  const balances = BalancesSchema.parse(results).reduce(
    (acc, item) => ({
      ...acc,
      [item.token]: item.balance,
    }),
    { Real: 0n, sReal: 0n } satisfies Record<TokenType, bigint>,
  );

  return {
    ...balances,
    total: balances.Real + balances.sReal,
  };
});
