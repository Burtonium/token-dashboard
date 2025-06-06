import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import useCountdown from '@/hooks/useCountdown';
import { calculateCasinoDepositTotals } from '@/server/actions/casino-deposits/calculateCasinoDepositTotals';
import { claimCasinoDepositReward } from '@/server/actions/casino-deposits/claimCasinoDepositReward';
import { fetchCasinoDepositTotals } from '@/server/actions/casino-deposits/fetchCasinoDepositTotals';
import { useMemo } from 'react';

export const SCAN_TIMEOUT_SECONDS = 180;

export const useCasinoDeposits = () => {
  const casinoLink = useCasinoLink();
  const scanCountdown = useCountdown();

  const deposits = useAuthenticatedQuery({
    enabled: casinoLink.isSuccess && !!casinoLink.data,
    queryKey: ['casino-evm-deposits'],
    queryFn: fetchCasinoDepositTotals,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const calculateDeposits = useAuthenticatedMutation({
    mutationFn: calculateCasinoDepositTotals,
    onSuccess: () => {
      scanCountdown.stop();
      return deposits.refetch();
    },
    onMutate: () => {
      scanCountdown.start(SCAN_TIMEOUT_SECONDS);
      return deposits.refetch();
    },
  });

  const totalDeposited = useMemo(
    () => deposits.data?.totals?.reduce((a, b) => a + b.amount, 0) ?? 0,
    [deposits.data?.totals],
  );

  const claim = useAuthenticatedMutation({
    mutationFn: claimCasinoDepositReward,
    onSuccess: () => deposits.refetch(),
  });

  const claimable = useMemo(
    () =>
      !!deposits.data &&
      deposits.data.totals.length > 0 &&
      deposits.data.status === 'Success',
    [deposits.data],
  );

  const claimed = useMemo(
    () => deposits.data?.status === 'Claimed',
    [deposits.data],
  );

  return {
    deposits,
    calculateDeposits,
    bonus: {
      claimed,
      claimable,
      claim,
    },
    score: deposits.data?.score ?? 0,
    totalDeposited,
    scanCountdown: {
      ...scanCountdown,
      remainingPercentage:
        scanCountdown.remaining &&
        1 - scanCountdown.remaining / SCAN_TIMEOUT_SECONDS,
    },
  };
};
