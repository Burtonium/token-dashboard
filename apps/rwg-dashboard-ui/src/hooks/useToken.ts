import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import config from '@/config/wagmi';
import { useWatchAsset, useWriteContract } from 'wagmi';
import assert from 'assert';
import useNetworkId from './useNetworkId';
import usePrimaryAddress from './usePrimaryAddress';
import { tokenAbi } from '@/contracts/generated';
import useContractAddresses from './useContractAddresses';

export const useToken = () => {
  const addresses = useContractAddresses();
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const { writeContractAsync } = useWriteContract();
  const { isSuccess } = useNetworkId();
  const primaryAddress = usePrimaryAddress();
  const { watchAsset } = useWatchAsset();

  const balance = useQuery({
    queryKey: ['balance', addresses.data.token, primaryAddress],
    enabled: !!primaryAddress && isSuccess && addresses.isSuccess,
    queryFn: () =>
      readContract(config, {
        abi: tokenAbi,
        address: addresses.data.token,
        functionName: 'balanceOf',
        args: [primaryAddress as `0x${string}`],
      }),
  });

  const tokenSymbol = useQuery({
    queryKey: ['symbol', addresses.data.token],
    enabled: isSuccess && !addresses.isPending,
    queryFn: () =>
      readContract(config, {
        abi: tokenAbi,
        address: addresses.data.token,
        functionName: 'symbol',
      }),
  });

  const decimals = useQuery({
    queryKey: ['decimals', addresses.data.token],
    enabled: !!primaryWallet && isSuccess,
    queryFn: () =>
      readContract(config, {
        abi: tokenAbi,
        address: addresses.data.token,
        functionName: 'decimals',
      }),
  });

  const mint = useMutation({
    mutationKey: ['mint', addresses.data.token, primaryAddress],
    mutationFn: async (amount: bigint) => {
      assert(primaryAddress?.startsWith('0x'), 'No primary address');

      const tx = await writeContractAsync({
        address: addresses.data.token,
        abi: tokenAbi,
        functionName: 'mint',
        args: [primaryAddress as `0x${string}`, amount],
      });

      await waitForTransactionReceipt(config, { hash: tx });
    },
    onSuccess: () => balance.refetch(),
  });

  const watchToken = () => {
    if (!primaryWallet) {
      setShowAuthFlow(true);
      return;
    }

    if (!tokenSymbol.data || !decimals.data) {
      return;
    }

    watchAsset({
      type: 'ERC20',
      options: {
        address: addresses.data.token,
        symbol: tokenSymbol.data,
        decimals: decimals.data,
      },
    });
  };

  return {
    errors: [balance.error, decimals.error].filter((e) => !!e),
    queries: {
      balance,
      decimals,
    },
    isLoading: balance.isLoading || decimals.isLoading,
    symbol: '$REAL',
    balance,
    decimals: decimals.data ?? 18,
    contract: tokenAbi,
    mint,
    watchToken,
  };
};
