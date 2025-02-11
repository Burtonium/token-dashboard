'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { constructError } from '../errors';
import { isDev } from '@/env';
import assert from 'assert';

export const addWallet = authGuard(
  async (user, { chain, address }: { chain: string; address: string }) => {
    assert(isDev, 'addWallet is only available in dev mode');

    return prisma.linkedWallet
      .create({
        data: {
          chain,
          address: address,
          dynamicUserId: user.id,
        },
      })
      .catch((e) => {
        return constructError(`Failed to add wallet: ${(e as Error).message}`);
      });
  },
);
