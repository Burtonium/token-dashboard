import { useMutation } from '@tanstack/react-query';
import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import { generateLinkingToken } from '@/server/actions/account/generateLinkingToken';
import { env } from '@/env';
import { serverActionErrorGuard } from '@/lib/serverActionErrorGuard';

export const useLinkCasinoAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const authToken = getAuthToken();

      if (!authToken) {
        throw new Error('No token');
      }
      const linkingData = await serverActionErrorGuard(
        generateLinkingToken(authToken),
      );

      if (!linkingData) {
        throw new Error('Error generating linking token');
      }

      const { userId, ts, token } = linkingData;

      let url;
      if (env.NEXT_PUBLIC_CASINO_URL.startsWith('/')) {
        url = new URL(env.NEXT_PUBLIC_CASINO_URL, window.location.origin);
      } else {
        url = new URL(env.NEXT_PUBLIC_CASINO_URL);
      }
      url.searchParams.append('extUserId', userId);
      url.searchParams.append('ts', ts.toString());
      url.searchParams.append('token', token);
      url.searchParams.append(
        'callbackUrl',
        `${window.location.origin}/api/casino-link-callback`,
      );

      window.location.href = url.toString();
    },
  });
};
