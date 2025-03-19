'use client';

import { Button } from '@bltzr-gg/ui';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCasinoLink } from '@/server/actions/account/getCasinoLink';
import Link from 'next/link';
import { signAccountLinkPayload } from './linkAccount';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';

export default function CasinoTestLinkerPage() {
  const router = useRouter();
  const params = useSearchParams();
  const loggedIn = useIsLoggedIn();

  const existingLink = useAuthenticatedQuery({
    queryKey: ['casinoLink'],
    enabled: loggedIn,
    queryFn: getCasinoLink,
  });

  const linkMutation = useMutation({
    mutationFn: async () => {
      const userId = params.get('extUserId');
      const ts = params.get('ts');
      const token = params.get('token');

      if (!userId || !ts || !token) {
        throw new Error('Missing parameters');
      }

      const { signature, body } = await signAccountLinkPayload(
        userId,
        ts,
        token,
      );

      const response = await fetch('/api/casino-link-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Processing-Signature': signature,
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Failed to link account');
      }

      router.push('/link-realbet');
    },
  });

  return (
    <div className="space-y-5 p-3 sm:p-5">
      <h2 className="mb-3 text-xl font-semibold">Realbet Test Linker</h2>
      <p className="mb-8 text-xl font-medium leading-tight text-white/80">
        Normally this would be on realbet.io, but we are testing what it&apos;s
        supposed to do here.
      </p>
      <p className="text-destructive empty:hidden">
        {linkMutation.error?.message}
      </p>
      {existingLink.data ? (
        <>
          <p className="text-primary empty:hidden">
            {existingLink.data?.realbetUsername} linked.&nbsp;
            <Button asChild>
              <Link className="font-bold text-primary" href="/link-realbet">
                Go Back
              </Link>
            </Button>
          </p>
        </>
      ) : (
        <Button
          loading={linkMutation.isPending}
          onClick={() => linkMutation.mutate()}
        >
          Link casino account
        </Button>
      )}
    </div>
  );
}
