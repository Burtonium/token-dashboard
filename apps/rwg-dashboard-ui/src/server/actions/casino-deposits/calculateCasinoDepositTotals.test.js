import { describe, it, expect, vi } from 'vitest';
import prisma from '@/server/prisma/client';
import * as dune from '@duneanalytics/client-sdk';
import * as Sentry from '@sentry/nextjs';
import { calculateCasinoDepositTotals } from './calculateCasinoDepositTotals';

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
  QueryParameter: {
    text: vi.fn(),
  },
  DuneClient: class {
    constructor(apiKey) {
      expect(apiKey).toEqual('test-api-key');
    }

    async runQuery() {
      return {
        result: {
          rows: [
            {
              blockchain: 'ethereum',
              source: 'rollbit',
              symbol: 'ETH',
              totalUsdValue: 1000,
            },
          ],
        },
      };
    }
  },
}));

vi.mock('@/server/auth', () => ({
  decodeUser: vi.fn().mockResolvedValue({
    id: 'test-user-id',
    addresses: ['0x9f5748188F887b92e9503a48B6C22043478C1597'],
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

describe('calculateCasinoDepositTotals', () => {
  it('Should not work if casino link is not found', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: undefined,
      apiCall: undefined,
    });

    expect(await calculateCasinoDepositTotals('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Casino link required',
    });
  });

  it('Should work when api call is not found', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: undefined,
    });

    const totals = await calculateCasinoDepositTotals('whatever');

    expect(totals).not.to.have.property('type').equal('ServerActionError');
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

    expect(await calculateCasinoDepositTotals('whatever'))
      .not.to.have.property('type')
      .equal('ServerActionError');
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

    const querySpy = vi
      .spyOn(dune.DuneClient.prototype, 'runQuery')
      .mockResolvedValueOnce({
        result: undefined,
      });

    const spy = vi.spyOn(Sentry, 'captureException');

    expect(await calculateCasinoDepositTotals('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Error calculating deposits.',
    });

    expect(spy).toHaveBeenCalledOnce();

    querySpy.mockRestore();
  });

  it('Should return error if DuneClient throws', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
    });

    const spy = vi
      .spyOn(dune.DuneClient.prototype, 'runQuery')
      .mockRejectedValueOnce(new Error('Test error'));

    expect(await calculateCasinoDepositTotals('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Error calculating deposits.',
    });

    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
