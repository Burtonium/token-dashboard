import { signPublicSaleClaims } from '@/server/actions/claim/signPublicSaleClaims';
import { useAuthenticatedMutation } from './useAuthenticatedMutation';
import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { getClaimableAmounts } from '@/server/actions/claim/getClaimableAmounts';
import assert from 'assert';
import { useWriteTokenMaster } from '@/contracts/generated';
import { toHex } from 'viem';
import { usePublicClient } from 'wagmi';
import { updateClaimStatus } from '@/server/actions/claim/updateClaimStatus';
import useStateWatcher from './useStateWatcher';
import { useToken } from './useToken';
import { useNetworkGuard } from '@/providers/network-guard';
import { isDev } from '@/env';
import { serverActionErrorGuard } from '@/lib/serverActionErrorGuard';

export const useClaims = () => {
  const publicClient = usePublicClient();
  const claims = useAuthenticatedQuery({
    queryKey: ['claimableAmount'],
    queryFn: getClaimableAmounts,
  });

  const {
    queries: { balance },
  } = useToken();
  const writeTokenMaster = useWriteTokenMaster();
  const networkGuard = useNetworkGuard();

  const claimTokens = useAuthenticatedMutation({
    mutationFn: async (token) => {
      assert(publicClient, 'No public client');
      assert(claims.isSuccess && claims.data, 'Claims not loaded');
      assert(claims.data.claimable.length > 0, 'No claims to claim');

      await networkGuard(isDev ? [11155111] : [1]);

      const txs = [];
      for (const claim of claims.data.claimable) {
        assert(
          claim.signature?.startsWith('0x') && claim.signature.length === 132,
          'Claim signature not valid',
        );
        const tx = await writeTokenMaster
          .writeContractAsync({
            functionName: 'claimToken',
            args: [
              toHex(claim.id, { size: 16 }),
              claim.amount + (claim.bonus ?? 0n),
              claim.signature as `0x${string}`,
            ],
          })
          .catch((err: Error) => {
            // eslint-disable-next-line no-console
            console.error(err);

            if (err.message.includes('User rejected')) {
              return;
            }

            return serverActionErrorGuard(
              updateClaimStatus(token, claim.id, 'Error', err.message),
            );
          });

        if (tx) {
          txs.push(
            (async () => {
              await publicClient.waitForTransactionReceipt({ hash: tx });
              await serverActionErrorGuard(
                updateClaimStatus(token, claim.id, 'Claimed', tx),
              );
            })(),
          );
        }
      }

      await Promise.all(txs);
    },
    onError: () => claims.refetch(),
    onSuccess: () => Promise.all([claims.refetch(), balance.refetch()]),
  });

  const awaitClaimChanges = useStateWatcher(claims.data?.claims);

  const signClaims = useAuthenticatedMutation({
    mutationFn: signPublicSaleClaims,
    onSuccess: async () => {
      await claims.refetch();
      void awaitClaimChanges().then(() => {
        claimTokens.mutate();
      });
    },
  });

  const hasClaims =
    claims.isSuccess && claims.data && claims.data.claims.length > 0;

  const hasError =
    claims.isSuccess &&
    claims.data.claims.some((claim) => claim.status === 'Error');

  return {
    claims,
    allClaimed:
      claims.isSuccess &&
      claims.data &&
      claims.data.claims.length > 0 &&
      claims.data?.claims.every((claim) => claim.status === 'Claimed'),
    canClaim:
      claims.isSuccess &&
      claims.data &&
      (claims.data.amounts.claimableAmount > 0n ||
        claims.data.amounts.signableAmount > 0n),
    process: signClaims,
    claim: claimTokens,
    hasEnded:
      claims.isSuccess &&
      !!claims.data.period?.end &&
      new Date(claims.data.period.end).getTime() < new Date().getTime(),
    hasClaims,
    hasError,
    errors: claims.data?.claims
      .filter((claim) => claim.status === 'Error')
      .map((claim) => claim.reason ?? 'Unkown Error'),
  };
};
