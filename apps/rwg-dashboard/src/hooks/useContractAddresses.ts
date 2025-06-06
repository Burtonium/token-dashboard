'use client';

import { networkIdExists } from '@/config/networks';
import {
  tokenAddress,
  tokenMasterAddress,
  tokenStakingAddress,
  tokenVestingAddress,
  uniswapPoolHookAddress,
} from '@/contracts/generated';
import { env } from '@/env';
import { useSuspenseQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { hardhat } from 'viem/chains';
import { useChainId } from 'wagmi';
import { Address, zeroAddress } from 'viem';

const fetchLocallyDeployedAddresses = async () => {
  const response =
    typeof window === 'undefined'
      ? null
      : await fetch(
          `${window.location.origin}/locally_deployed_addresses.json`,
        );

  const locallyDeployedJson = z
    .record(z.string())
    .parse((await response?.json()) ?? {});

  return {
    token: locallyDeployedJson['TestRealToken#REAL'] as `0x${string}`,
    tokenVesting: locallyDeployedJson[
      'TestTokenVesting#MockTokenVesting'
    ] as `0x${string}`,
    tokenStaking: locallyDeployedJson[
      'TestTokenStaking#TokenStaking'
    ] as `0x${string}`,
    tokenMaster: locallyDeployedJson[
      'TestTokenMaster#TestTokenMaster'
    ] as `0x${string}`,
    uniswapPoolHook: zeroAddress as Address,
  };
};

const useContractAddresses = () => {
  const chainId = useChainId();

  return useSuspenseQuery({
    queryKey: ['testingEnvOverride', chainId],
    queryFn: () => {
      if (!chainId || !networkIdExists(chainId)) {
        return Promise.resolve({
          token: tokenAddress[11155111],
          tokenVesting: tokenVestingAddress[11155111],
          tokenStaking: tokenStakingAddress[11155111],
          tokenMaster: tokenMasterAddress[11155111],
          uniswapPoolHook: uniswapPoolHookAddress[11155111],
        });
      }

      return env.NEXT_PUBLIC_ENVIRONMENT === 'test' || chainId === hardhat.id
        ? fetchLocallyDeployedAddresses()
        : Promise.resolve({
            token: tokenAddress[chainId],
            tokenVesting: tokenVestingAddress[chainId],
            tokenStaking: tokenStakingAddress[chainId],
            tokenMaster: tokenMasterAddress[chainId],
            uniswapPoolHook: uniswapPoolHookAddress[chainId],
          });
    },
  });
};

export default useContractAddresses;
