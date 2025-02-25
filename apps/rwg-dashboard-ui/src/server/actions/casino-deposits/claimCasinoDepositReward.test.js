import { describe, it, expect, vi } from 'vitest';
import prisma from '@/server/prisma/client';
import * as dune from '@duneanalytics/client-sdk';
import * as Sentry from '@sentry/nextjs';
import { claimCasinoDepositReward } from './claimCasinoDepositReward';
import * as bonus from '@/server/server-only/creditUserBonus';
import { Bonus } from '@bltzr-gg/realbet-api';
import * as auth from '@/server/auth';

vi.mock('server-only', () => ({}));

vi.mock('@/env', () => ({
  env: {},
}));

vi.mock('@/lib/serverActionErrorGuard', () => ({
  isServerActionError: vi.fn().mockReturnValue(false),
}));

vi.mock('@/server/prisma/client', () => ({
  default: {
    $transaction: vi.fn((callback) => callback(prisma)),
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

vi.mock('@bltzr-gg/realbet-api', () => ({
  ApiClient: class {},
  Bonus: {
    creditUserBonus: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('@/server/auth', async () => ({
  authGuard: vi.fn((fn) => async (token, ...args) => {
    const user = {
      id: 'test-user-id',
      addresses: [
        '0x9f5748188F887b92e9503a48B6C22043478C1597',
        '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
      ],
    };

    return fn(user, ...args);
  }),
}));

describe('calculateCasinoDepositTotals', () => {
  it('Should not work if casino link is not found', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: undefined,
      apiCall: undefined,
    });

    const stuff = await claimCasinoDepositReward('whatever');

    expect(stuff).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Casino link required',
    });
  });

  it('Should return error if api call is not found', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
    });

    expect(await claimCasinoDepositReward('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'Api call not found',
    });
  });

  it('Should only not be claimable when state is pending', async () => {
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

    expect(await claimCasinoDepositReward('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'API Call in an invalid state to claim.',
    });
  });

  it('Should not be claimable if there are no totals', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Success',
        totals: [],
      },
    });

    expect(await claimCasinoDepositReward('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'API Call in an invalid state to claim.',
    });
  });

  it('Should not be claimable if the api call is errored', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        status: 'Error',
      },
    });

    expect(await claimCasinoDepositReward('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'API Call in an invalid state to claim.',
    });
  });

  it('Should return error if it is already claimed', async () => {
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

    expect(await claimCasinoDepositReward('whatever')).to.toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'API Call in an invalid state to claim.',
    });
  });

  it('Should create a reward upon successful claim', async () => {
    prisma.dynamicUser.findFirst.mockResolvedValue({
      casinoLink: {
        realbetUserId: 1,
        realbetUsername: 'test-user',
      },
      apiCall: {
        id: 'test-api-call-id',
        status: 'Success',
        totals: [
          {
            source: 'casino1',
            blockchain: 'evm',
            symbol: 'ETH',
            address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
            amount: 100,
          },
        ],
      },
    });

    const updateSpy = vi
      .spyOn(prisma.casinoDepositApiCall, 'update')
      .mockResolvedValue({
        rewardId: 'test-reward-id',
      });

    const creditSpy = vi.spyOn(Bonus, 'creditUserBonus').mockResolvedValue();

    await claimCasinoDepositReward('whatever');

    expect(updateSpy).toHaveBeenCalledWith({
      where: {
        id: 'test-api-call-id',
      },
      data: {
        status: 'Claimed',
        reward: {
          create: {
            userId: 'test-user-id',
            type: 'RealBetCredit',
            redeemed: true,
            amount: 200,
          },
        },
      },
    });

    expect(creditSpy).toHaveBeenCalled();

    updateSpy.mockRestore();
    creditSpy.mockRestore();
  });
});
