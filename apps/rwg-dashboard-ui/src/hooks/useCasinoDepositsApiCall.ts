import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { fetchCasinoDepositTotals } from '@/server/actions/casino-deposits/fetchCasinoDepositTotals';

export const useCasinoDepositsApiCall = () => {
  return useAuthenticatedQuery({
    queryKey: ['casino-evm-deposits'],
    queryFn: fetchCasinoDepositTotals,
  });
};
