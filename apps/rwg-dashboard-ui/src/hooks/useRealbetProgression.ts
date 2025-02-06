import { getRealbetProgression } from '@/server/actions/realbet/getProgression';
import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { useCasinoLink } from './useCasinoLink';
import { useMemo } from 'react';
import useTrackedBalances from './useTrackedBalances';
import { rakeToLevel, rakebackTiers } from '@/lib/utils/rakeback';
import { formatUnits } from 'viem';

const REAL_TOKEN_PRICE = 0.03;

export const useRealbetProgression = () => {
  const link = useCasinoLink();
  const trackedBalances = useTrackedBalances();

  const dollarValueTracked = useMemo(
    () =>
      trackedBalances.data &&
      Number(formatUnits(trackedBalances.data?.total, 18)) * REAL_TOKEN_PRICE,
    [trackedBalances.data],
  );

  const progression = useAuthenticatedQuery({
    queryKey: ['progression', link.data?.realbetUserId],
    enabled: !!link.data?.realbetUserId,
    queryFn: getRealbetProgression,
  });

  const { level, nextLevel } = useMemo(() => {
    const rate = progression.data?.rakeback.data?.rate;
    const level = rate ? rakeToLevel(rate) : undefined;
    const nextLevel = level
      ? rakebackTiers.find((tier) => tier.rank === level.rank + 1)
      : undefined;

    return { level, nextLevel };
  }, [progression.data]);

  const rakebackProgress = useMemo(() => {
    if (!dollarValueTracked) {
      return 0;
    }

    return !nextLevel ? 100 : (dollarValueTracked / nextLevel.threshold) * 100;
  }, [dollarValueTracked, nextLevel]);

  return {
    isLoading: progression.isLoading || trackedBalances.isLoading,
    isSuccess: progression.isSuccess && trackedBalances.isSuccess,
    error: progression.error ?? trackedBalances.error,
    data: {
      wagerLevel: progression.data?.wagerLevel,
      rakeback: {
        dollarValueTracked,
        progress: rakebackProgress,
        level,
        nextLevel,
        trackedBalances: trackedBalances.data,
      },
    },
    refetch: () =>
      Promise.all([progression.refetch(), trackedBalances.refetch()]),
  };
};

export * from '@/lib/utils/rakeback';
