'use server';

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
import { isSolanaAddress } from '@/utils';

const EVM_QUERY_ID = 4537410;
const SOL_QUERY_ID = 4805053;

const CasinoTotalSchema = z.object({
  blockchain: z.string(),
  source: z.string(),
  symbol: z.string(),
  totalUsdValue: z.number(),
  address: z.string(),
});

const client = new DuneClient(env.DUNE_API_KEY ?? '');

class Timer {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  public getElapsed(): number {
    return Date.now() - this.startTime;
  }
}

const CasinoDepositTotalRowsSchema = z
  .unknown()
  .transform((o) => toCamel(o))
  .pipe(z.array(CasinoTotalSchema));

const fetchEVMDepositTotals = async (address: string) => {
  const queryParameters = [QueryParameter.text('user_address', address)];
  const query = await client.runQuery({
    queryId: EVM_QUERY_ID,
    query_parameters: queryParameters,
  });

  return CasinoDepositTotalRowsSchema.parse(
    query.result?.rows.map((r) => ({
      ...r,
      address,
    })),
  );
};

const fetchSOLDepositTotals = async (address: string) => {
  const queryParameters = [QueryParameter.text('user_address', address)];

  const query = await client.runQuery({
    queryId: SOL_QUERY_ID,
    query_parameters: queryParameters,
  });

  return CasinoDepositTotalRowsSchema.parse(
    query.result?.rows.map((r) => ({
      ...r,
      blockchain: 'solana',
      address,
    })),
  ).filter((r) => ['SOL', 'USDC', 'USDT', 'SHIB'].includes(r.symbol));
};

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
    const addresses = user.addresses.filter(
      (address) => isAddress(address) || isSolanaAddress(address),
    );

    const timer = new Timer();

    const results = (
      await Promise.all(
        addresses.map((address) => {
          if (isAddress(address)) {
            return fetchEVMDepositTotals(address);
          } else if (isSolanaAddress(address)) {
            return fetchSOLDepositTotals(address);
          }
          throw new Error('Invalid address');
        }),
      )
    ).flat();

    const elapsed = timer.getElapsed();

    return await prisma.casinoDepositApiCall.update({
      where: {
        id: pendingCall.id,
      },
      data: {
        status: 'Success',
        elapsed,
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
