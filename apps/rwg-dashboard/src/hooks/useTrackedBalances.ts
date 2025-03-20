import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { getTrackedBalances } from '@/server/actions/realbet/getTrackedBalances';
import { useCasinoLink } from './useCasinoLink';

const useTrackedBalances = () => {
  const casinoLink = useCasinoLink();

  return useAuthenticatedQuery({
    enabled: casinoLink.isLinked,
    queryKey: ['scanned-balances'],
    queryFn: getTrackedBalances,
  });
};

export default useTrackedBalances;
