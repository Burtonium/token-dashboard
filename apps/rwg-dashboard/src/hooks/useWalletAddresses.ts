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

  const addresses = useMemo(() => {
    if (!wallets.data) {
      return undefined;
    }
    return uniq(wallets.data.map((w) => w.address));
  }, [wallets.data]);

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
