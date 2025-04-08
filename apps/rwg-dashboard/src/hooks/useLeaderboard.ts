import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useRawPasses } from './useRawPasses';
import { z } from 'zod';
import usePrimaryAddress from './usePrimaryAddress';

const RpLeaderboardData = z.array(
  z.object({
    affiliateCode: z.string(),
    lowestId: z.number(),
    points: z.number(),
    rank: z.number(),
    rankScore: z.number(),
    totalPasses: z.number(),
    wallet: z.string(),
  }),
);

const bzrConversionRate = 0.35;

const API_BASE_URL = 'https://rp-leaderboard-api.prod.walletwars.io';

export const useLeaderboard = () => {
  const {
    baseAllocation,
    passes: rawPasses,
    nfts: { isLoading, isSuccess, error },
  } = useRawPasses();
  const walletAddress = usePrimaryAddress();

  const leaderboard = useQuery({
    queryKey: ['leaderboard', walletAddress],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/?address=${walletAddress}`,
        {
          method: 'GET',
          next: { revalidate: 60 },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }

      const data = RpLeaderboardData.parse(await response.json());

      return data.length > 0
        ? data[0]
        : {
            points: 0,
            totalPasses: 0,
            wallet: walletAddress,
            rankScore: 0,
            rank: 0,
          };
    },
    enabled: !!walletAddress,
  });

  const totalTokens = useMemo(() => {
    if (!leaderboard.data) {
      return 0;
    }
    return leaderboard.isSuccess && isSuccess
      ? rawPasses.reduce(
          (result, g) => result + g.qty * g.bzrPerPass,
          Math.floor(leaderboard.data.points * bzrConversionRate),
        )
      : 0;
  }, [rawPasses, leaderboard.isSuccess, leaderboard.data, isSuccess]);

  return {
    data: leaderboard.data,
    rawPasses: rawPasses,
    baseAllocation,
    totalTokens,
    isLoading: leaderboard.isLoading || isLoading,
    isSuccess: leaderboard.isSuccess && isSuccess,
    error: error ?? leaderboard.error,
  };
};

export default useLeaderboard;
