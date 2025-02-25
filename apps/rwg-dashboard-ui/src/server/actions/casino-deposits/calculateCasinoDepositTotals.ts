'use server';

import assert from 'assert';
import { QueryParameter, DuneClient } from '@duneanalytics/client-sdk';
import { z } from 'zod';
import { decodeUser } from '@/server/auth';
import * as Sentry from '@sentry/nextjs';

import { env } from '@/env';
import { toCamel } from '@/lib/utils';
import prisma from '@/server/prisma/client';
import { isAddress } from 'viem';
import { constructError } from '../errors';
import { isServerActionError } from '@/lib/serverActionErrorGuard';

const QUERY_ID = 4537410;

const CasinoTotalSchema = z.object({
  blockchain: z.string(),
  source: z.string(),
  symbol: z.string(),
  totalUsdValue: z.number(),
  address: z.string(),
});

const CasinoDepositTotalRowsSchema = z
  .unknown()
  .transform((o) => toCamel(o))
  .pipe(z.array(CasinoTotalSchema));

export const calculateCasinoDepositTotals = async (authToken: string) => {
  if (!env.DUNE_API_KEY) {
    // eslint-disable-next-line no-console
    console.error('DUNE_API_KEY is required');
    return constructError('Server configuration error');
  }

  const user = await decodeUser(authToken);

  if (isServerActionError(user)) {
    return user;
  }

  const dynamicUser = await prisma.dynamicUser.findFirst({
    where: {
      id: user.id,
    },
    include: {
      casinoLink: true,
      apiCall: true,
    },
  });

  if (!dynamicUser?.casinoLink) {
    return constructError('Casino link required');
  }

  const existingCall = dynamicUser.apiCall;

  if (
    existingCall?.status === 'Pending' &&
    new Date().getTime() - existingCall.timestamp.getTime() < 1000 * 60
  ) {
    return constructError('Pending call, cannot recalculate.');
  }

  if (existingCall && existingCall.status === 'Claimed') {
    return constructError('Already claimed deposits, cannot recalculate.');
  }

  await prisma.casinoDepositApiCall.deleteMany({
    where: {
      dynamicUserId: user.id,
    },
  });

  const pendingCall = await prisma.casinoDepositApiCall.create({
    data: {
      status: 'Pending',
      dynamicUserId: user.id,
    },
  });

  try {
    const client = new DuneClient(env.DUNE_API_KEY ?? '');
    const addresses = user.addresses.filter((address) => isAddress(address)); // currently only supporting evm
    const paramsList = addresses.map((address) =>
      QueryParameter.text('user_address', address),
    );

    // eslint-disable-next-line no-console
    console.time(`Dune.com API call for user: ${user.id}`);

    const responses = await Promise.all(
      paramsList.map(
        async (params) =>
          await client.runQuery({
            queryId: QUERY_ID,
            query_parameters: [params],
          }),
      ),
    );

    // eslint-disable-next-line no-console
    console.timeEnd(`Dune.com API call for user: ${user.id}`);

    const results = responses
      .map((response, i) => {
        const address = addresses[i];
        assert(address, 'Something went wrong.');
        assert(response?.result?.rows, 'Rows were not found in the query');
        const rowsWithAddress = response.result.rows.map((r) => ({
          ...r,
          address,
        }));

        return CasinoDepositTotalRowsSchema.parse(rowsWithAddress);
      })
      .flat();

    return await prisma.casinoDepositApiCall.update({
      where: {
        id: pendingCall.id,
      },
      data: {
        status: 'Success',
        totals: {
          createMany: {
            data: results.map((p) => ({
              casino: p.source,
              blockchain: p.blockchain,
              symbol: p.symbol,
              address: p.address,
              amount: p.totalUsdValue.toFixed(2),
            })),
          },
        },
      },
    });
  } catch (error) {
    Sentry.captureException(error);

    await prisma.casinoDepositApiCall.update({
      where: {
        id: pendingCall.id,
      },
      data: {
        status: 'Error',
      },
    });

    return constructError('Error calculating deposits.');
  }
};
