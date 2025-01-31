'use server';

import { keccak256 } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { authGuard } from '../../auth';
import { env } from '@/env';
import { constructError } from '../errors';

export const generateLinkingToken = authGuard(async (user) => {
  if (!env.TESTNET_SIGNER_PRIVATE_KEY?.startsWith('0x')) {
    // eslint-disable-next-line no-console
    console.error('TESTNET_SIGNER_PRIVATE_KEY is required');
    return constructError('Server configuration error');
  }

  const ts = Date.now() + 1000 * 60 * 5;
  const hash = keccak256(Buffer.from(`${ts}${user.id}`));

  const x = privateKeyToAccount(
    env.TESTNET_SIGNER_PRIVATE_KEY as `0x${string}`,
  );

  const token = await x.sign({ hash });

  return {
    userId: user.id,
    ts,
    token,
  };
});
