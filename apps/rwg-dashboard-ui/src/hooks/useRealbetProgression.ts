import { getRealbetProgression } from '@/server/actions/realbet/getProgression';
import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { useCasinoLink } from './useCasinoLink';
import { useMemo } from 'react';
import useTrackedBalances from './useTrackedBalances';

export const rakebackTiers = [
  { threshold: 0, rate: 0 },
  { threshold: 100, rate: 0.01 },
  { threshold: 1_000, rate: 0.02 },
  { threshold: 2_500, rate: 0.03 },
  { threshold: 5_000, rate: 0.04 },
  { threshold: 10_000, rate: 0.05 },
  { threshold: 25_000, rate: 0.06 },
  { threshold: 50_000, rate: 0.07 },
  { threshold: 100_000, rate: 0.08 },
  { threshold: 250_000, rate: 0.09 },
  { threshold: 500_000, rate: 0.1 },
].map((item, index) => ({
  ...item,
  rank: index + 1,
}));

const rakeToLevel = (rake: number) =>
  rakebackTiers
    .slice()
    .reverse()
    .find((item) => item.rate <= rake);

export const useRealbetProgression = () => {
  const link = useCasinoLink();
  const trackedBalances = useTrackedBalances();

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

  return {
    isLoading: progression.isLoading || trackedBalances.isLoading,
    isSuccess: progression.isSuccess && trackedBalances.isSuccess,
    error: progression.error ?? trackedBalances.error,
    data: {
      wagerLevel: progression.data?.wagerLevel,
      rakeback: {
        level,
        nextLevel,

        trackedBalances: trackedBalances.data,
      },
    },
    refetch: () =>
      Promise.all([progression.refetch(), trackedBalances.refetch()]),
  };
};
