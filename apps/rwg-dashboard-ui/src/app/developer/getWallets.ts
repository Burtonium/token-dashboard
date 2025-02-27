'use server';

import { authGuard } from '@/server/auth';
import { isDev } from '@/env';
import { getDynamicAuthWallets } from '@/server/clientUnsafe/getDynamicAuthWallets';
import { sortBy } from 'lodash';

export const getWallets = authGuard(async (user) => {
  if (!isDev) {
    throw new Error('Not in dev mode');
  }

  const dynamicWallets = (await getDynamicAuthWallets(user.id)).map(
    (w) => w.publicKey,
  );

  return sortBy(
    user.addresses?.map((address) => ({
      address,
      isSpoofed: !dynamicWallets.includes(address),
    })),
    ['isSpoofed'],
  );
});
