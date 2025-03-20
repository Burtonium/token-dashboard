import { vi, describe } from 'vitest';
import * as amounts from './getClaimableAmounts';
import { signPublicSaleClaims } from './signPublicSaleClaims';
import prisma from '@/server/prisma/client';
import { privateKeyToAccount } from 'viem/accounts';
import { env } from '@/env';

vi.mock('@/server/auth', async () => ({
  decodeUser: vi.fn().mockResolvedValue({
    id: 'test-user-id',
    addresses: [
      '0x9f5748188F887b92e9503a48B6C22043478C1597',
      '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
    ],
  }),
}));

vi.mock('@/env', () => ({
  env: {
    TOKEN_MASTER_SIGNER_PRIVATE_KEY:
      '0x3f1c0e2b9c9e72116f2b69c4c6f2827bbf26cf4822c9c6f8ea124e7685cd282a',
  },
}));

vi.mock('@/server/prisma/client', () => ({
  default: {
    $transaction: vi.fn((callback) => callback(prisma)),
    claim: {
      update: vi.fn().mockResolvedValue({}),
    },
    reward: {
      updateMany: vi.fn().mockResolvedValue({}),
    },
  },
}));

vi.mock('./getClaimableAmounts', () => ({
  getClaimableAmounts: vi.fn().mockResolvedValue({}),
}));

vi.mock('@wagmi/core', () => ({
  readContracts: vi.fn().mockResolvedValue([
    {
      result: '0x1234567890',
    },
    {
      result: '0x9876543210',
    },
  ]),
}));

describe('signPublicSaleClaims', () => {
  it('Should work with pending claims', async () => {
    vi.spyOn(amounts, 'getClaimableAmounts').mockResolvedValue({
      signable: [
        {
          id: 'test-claim-id-1',
          address: '0x9f5748188F887b92e9503a48B6C22043478C1597',
          amount: 100,
          bonus: 250,
          status: 'Pending',
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
          status: 'Pending',
          period: {
            id: 'test-period-1',
            end: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), // last week
          },
        },
      ],
    });

    const spy = vi.spyOn(prisma.claim, 'update');

    const result = await signPublicSaleClaims('whatever');

    expect(result).to.equal(undefined);

    const account = privateKeyToAccount(
      '0x3f1c0e2b9c9e72116f2b69c4c6f2827bbf26cf4822c9c6f8ea124e7685cd282a',
    );

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 'test-claim-id-1',
      },
      data: {
        status: 'Signed',
        signature: await account.signMessage({
          message: { raw: '0x1234567890' },
        }),
        bonus: '250',
      },
    });

    expect(spy).toHaveBeenCalledWith({
      where: {
        id: 'test-claim-id-2',
      },
      data: {
        status: 'Signed',
        signature: await account.signMessage({
          message: { raw: '0x9876543210' },
        }),
        bonus: '1500',
      },
    });
  });

  it('Should fail if no pending claims', async () => {
    vi.spyOn(amounts, 'getClaimableAmounts').mockResolvedValue({
      signable: [],
    });

    const result = await signPublicSaleClaims('whatever');

    expect(result).toMatchObject({
      type: 'ServerActionError',
      error: true,
      message: 'No pending claims to sign.',
    });
  });
});
