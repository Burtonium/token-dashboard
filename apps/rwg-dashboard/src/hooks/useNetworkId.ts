import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from 'wagmi';

const useNetworkId = () => {
  const chainId = useChainId();
  const { primaryWallet, sdkHasLoaded } = useDynamicContext();

  return useQuery({
    queryKey: [
      'network',
      primaryWallet?.id,
      primaryWallet?.connector?.key,
      chainId,
    ],
    enabled: sdkHasLoaded,
    queryFn: () => primaryWallet?.connector.getNetwork() ?? null,
  });
};

export default useNetworkId;
