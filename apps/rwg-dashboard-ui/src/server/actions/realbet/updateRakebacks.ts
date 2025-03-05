import 'server-only';

import { getTrackedBalances } from '@/server/clientUnsafe/getTrackedBalances';
import prisma from '@/server/prisma/client';
import { User, ApiClient } from '@bltzr-gg/realbet-api';
import { env } from '@/env';
import { calculateRakebackFromReal } from '@/hooks/useRealbetProgression';
import { isServerActionError } from '@/lib/serverActionErrorGuard';
import { constructError } from '../errors';

const apiClient = new ApiClient({
  secret: env.REALBET_API_SECRET_KEY,
  apiUrl: env.REALBET_API_URL,
});

export const updateRakebacks = async (dynamicUserId: string) => {
  const [addresses, casinoLink] = await Promise.all([
    prisma.linkedWallet
      .findMany({
        where: {
          dynamicUserId,
        },
        select: {
          address: true,
        },
      })
      .then((wallets) => wallets.map((wallet) => wallet.address)),
    prisma.casinoLink.findUnique({
      where: {
        dynamicUserId,
      },
      select: {
        realbetUserId: true,
      },
    }),
  ]);

  if (!casinoLink) {
    return constructError('Casino link not found');
  }

  const balances = await getTrackedBalances({
    id: dynamicUserId,
    addresses,
  });

  if (isServerActionError(balances)) {
    return balances;
  }

  const rakeback = calculateRakebackFromReal(balances.total);

  await User.updateRakeback(apiClient, {
    rate: rakeback.tier?.rate,
    userId: casinoLink.realbetUserId,
  });
};
