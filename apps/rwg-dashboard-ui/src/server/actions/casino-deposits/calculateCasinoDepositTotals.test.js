import { describe, it, expect, vi } from 'vitest';
import prisma from '@/server/prisma/client';
import * as dune from '@duneanalytics/client-sdk';
import * as Sentry from '@sentry/nextjs';

vi.mock('server-only', () => ({}));

vi.mock('@/env', () => ({
  env: {
    DUNE_API_KEY: 'test-api-key',
  },
}));

vi.mock('@/lib/serverActionErrorGuard', () => ({
  isServerActionError: vi.fn().mockReturnValue(false),
}));

vi.mock('@duneanalytics/client-sdk', () => ({
  DuneClient: class {
    constructor(apiKey) {
      expect(apiKey).toEqual('test-api-key');
    }

    async runQuery() {
      return {
        result: { rows: [{ source: 'casino1', totalUsdValue: 100 }] },
      };
    }
  },
}));

vi.mock('@/server/auth', () => ({
  decodeUser: vi.fn().mockResolvedValue({
    id: 'test-user-id',
    addresses: [
      '0x9f5748188F887b92e9503a48B6C22043478C1597',
      '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
    ],
  }),
}));

vi.mock('@/server/prisma/client', () => ({
  default: {
    dynamicUser: {
      findFirst: vi.fn(),
    },
    casinoDepositApiCall: {
      create: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      deleteMany: vi.fn().mockResolvedValue({}),
    },
  },
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

import { calculateCasinoDepositTotals } from './calculateCasinoDepositTotals';

describe('calculateCasinoDepositTotals', () => {
  it('Should work when api call is not found', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: undefined,
    });

    expect(
      async () => await calculateCasinoDepositTotals('whatever'),
    ).not.toThrow();
  });

  it('Retrying should work when api call is errored', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Error',
      },
    });

    expect(
      async () => await calculateCasinoDepositTotals('whatever'),
    ).not.toThrow();
  });

  it('Should return error if api call is pending and under 60 seconds old', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Pending',
        timestamp: new Date(),
      },
    });

    expect(await calculateCasinoDepositTotals('whatever')).toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Pending call, cannot recalculate.',
    });
  });

  it('Should allow recalculation after 60 seconds', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Pending',
        timestamp: new Date(Date.now() - 1000 * 61),
      },
    });

    vi.setSystemTime(new Date(Date.now() + 1000 * 61)); // Simulate future time

    expect(await calculateCasinoDepositTotals('whatever')).not.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Pending call, cannot recalculate.',
    });
  });

  it('Should return error if already claimed', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Claimed',
        timestamp: new Date(),
      },
    });

    expect(await calculateCasinoDepositTotals('whatever')).toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Already claimed deposits, cannot recalculate.',
    });
  });

  it('Should notify Sentry if DuneClient returns unexpected values', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
    });

    vi.spyOn(dune.DuneClient.prototype, 'runQuery').mockResolvedValueOnce({
      result: undefined,
    });

    const spy = vi.spyOn(Sentry, 'captureException');

    expect(await calculateCasinoDepositTotals('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Error calculating deposits.',
    });

    expect(spy).toHaveBeenCalled();
  });
});
