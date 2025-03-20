import { getCurrentWave } from '@/server/actions/ticket-waves/getCurrentWave';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { serverActionErrorGuard } from '@/lib/serverActionErrorGuard';
import { useWalletAddresses } from './useWalletAddresses';

export const useCurrentTicketWave = () => {
  const { addresses } = useWalletAddresses();
  const currentWave = useQuery({
    queryKey: ['currentWave', addresses],
    queryFn: () => {
      return serverActionErrorGuard(getCurrentWave(undefined, addresses));
    },
  });

  const canSubscribe = useMemo(
    () =>
      currentWave.isSuccess &&
      !!currentWave.data &&
      currentWave.data.whitelisted &&
      currentWave.data.availableSeats > 0,
    [currentWave.isSuccess, currentWave.data],
  );

  return {
    ...currentWave,
    canSubscribe,
  };
};
