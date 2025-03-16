'use client';

import useNetworkId from './useNetworkId';
import { networkIdExists } from '@/config/networks';
import {
  tokenAddress,
  tokenMasterAddress,
  tokenStakingAddress,
  tokenVestingAddress,
} from '@/contracts/generated';
import { env } from '@/env';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const fetchLocallyDeployedAddresses = async () => {
  const locallyDeployedJson = z
    .record(z.string())
    .parse(await (await fetch('./locally_deployed_addresses.json')).json());

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
  };
};

const useContractAddresses = () => {
  const { data } = useNetworkId();

  const defaultNetwork = 11155111;
  const network = networkIdExists(data) ? data : defaultNetwork;

  const {
    data: overrides,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ['testingEnvOverride'],
    enabled: env.NEXT_PUBLIC_VERCEL_ENV === 'test',
    queryFn: fetchLocallyDeployedAddresses,
  });

  return {
    token: tokenAddress[network],
    tokenVesting: tokenVestingAddress[network],
    tokenStaking: tokenStakingAddress[network],
    tokenMaster: tokenMasterAddress[network],
    isPending,
    isLoading,
    ...overrides,
  };
};

export default useContractAddresses;
