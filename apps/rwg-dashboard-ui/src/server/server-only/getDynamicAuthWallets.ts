import 'server-only';

import { env } from '@/env';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';

const WalletResponseSchema = z.object({
  wallets: z.array(
    z.object({
      publicKey: z.string(),
      chain: z.string(),
    }),
  ),
});

export const getDynamicAuthWallets = async (userId: string) => {
  const response = await fetch(
    `https://app.dynamicauth.com/api/v0/environments/${env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/users/${userId}/wallets`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env.DYNAMIC_API_KEY}`,
      },
    },
  );

  const responseJson = (await response.json()) as unknown;
  const walletResponse = WalletResponseSchema.safeParse(responseJson);

  if (!walletResponse.success) {
    const error = `Dynamic API Response Different Than Expected: ${JSON.stringify(responseJson)}`;
    Sentry.captureMessage(error);
    // eslint-disable-next-line no-console
    console.error(error);

    throw new Error(error);
  }

  return walletResponse.data.wallets;
};
