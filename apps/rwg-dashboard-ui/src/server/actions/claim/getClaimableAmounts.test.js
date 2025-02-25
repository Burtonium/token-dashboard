import { describe, it, vi } from 'vitest';
import { getClaimableAmounts } from './getClaimableAmounts';
import { Decimal } from '@prisma/client/runtime/library';

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

vi.mock('@/server/prisma/client', () => {
  return {
    default: {
      claim: {
        findMany: vi.fn().mockResolvedValue([
          // claimed
          {
            id: 'test-claim-id-1',
            address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
            amount: 100,
            bonus: 250,
            status: 'Claimed',
            period: {
              id: 'test-period-1',
              end: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // last week
            },
          },
          {
            id: 'test-claim-id-2',
            address: '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
            amount: 2500,
            bonus: 1500,
            status: 'Claimed',
            period: {
              id: 'test-period-1',
              end: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // last week
            },
          },
          // signable claims
          {
            id: 'test-claim-id-3',
            address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
            amount: 100,
            status: 'Pending',
            period: {
              id: 'test-period-2',
              end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
            },
          },
          {
            id: 'test-claim-id-4',
            address: '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
            amount: 100,
            status: 'Pending',
            period: {
              id: 'test-period-2',
              end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
            },
          },
          // claimable
          {
            id: 'test-claim-id-5',
            address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
            amount: 100,
            bonus: 1000,
            status: 'Signed',
            period: {
              id: 'test-period-2',
              end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
            },
          },
          // expired
          {
            id: 'test-claim-id-6',
            address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
            amount: 100,
            status: 'Pending',
            period: {
              id: 'test-period-3',
              end: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // last week
            },
          },
          {
            id: 'test-claim-id-7',
            address: '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
            amount: 100,
            status: 'Pending',
            period: {
              id: 'test-period-3',
              end: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // last week
            },
          },
        ]),
      },
      reward: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: 'test-reward-id',
            userId: 'test-user-id',
            type: 'TokenBonus',
            redeemed: false,
            amount: 10000,
          },
        ]),
      },
    },
  };
});

describe('getClaimableAmounts', () => {
  it('Should return the correct amounts', async () => {
    const result = await getClaimableAmounts('whatever');

    expect(result.amounts).to.toMatchObject({
      claimedAmount: 2600n,
      claimedBonus: 1750n,
      claimableBonus: 1000n,
      claimableAmount: 100n,
      claimableTotal: 1100n,
      signableAmount: 200n,
    });
  });
});
