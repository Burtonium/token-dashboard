import { uniq } from 'lodash';
import { useMemo } from 'react';
import { isAddress } from 'viem';
import { isSolanaAddress } from '@/utils';
import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { getWallets } from '@/server/actions/account/getWallets';

export const useWalletAddresses = () => {
  const wallets = useAuthenticatedQuery({
    queryKey: ['walletAddresses'],
    queryFn: getWallets,
  });

  const addresses = useMemo(
    () =>
      wallets.data ? uniq([...wallets.data?.map((w) => w.address)]) : undefined,
    [wallets.data],
  );

  return {
    ...wallets,
    addresses,
    evm: useMemo(() => addresses?.filter((a) => isAddress(a)), [addresses]),
    solana: useMemo(
      () => addresses?.filter((a) => isSolanaAddress(a)),
      [addresses],
    ),
  };
};
