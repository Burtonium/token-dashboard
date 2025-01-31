import { useUserWallets } from '@dynamic-labs/sdk-react-core';
import usePrimaryAddress from './usePrimaryAddress';
import { uniq } from 'lodash';
import { useMemo } from 'react';
import { isAddress } from 'viem';
import { isSolanaAddress } from '@/utils';

export const useWalletAddresses = () => {
  const primaryAddress = usePrimaryAddress();
  const walletAddresses = useUserWallets();
  const addresses = uniq(
    walletAddresses
      .map((w) => [w.address, ...w.additionalAddresses.map((a) => a.address)])
      .flat()
      .concat(primaryAddress ?? '')
      .filter(Boolean) ?? [],
  );

  return {
    addresses,
    evm: useMemo(() => addresses.filter((a) => isAddress(a)), [addresses]),
    solana: useMemo(
      () => addresses.filter((a) => isSolanaAddress(a)),
      [addresses],
    ),
  };
};
