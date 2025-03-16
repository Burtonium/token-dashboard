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
import { useSuspenseQuery } from '@tanstack/react-query';
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

  return useSuspenseQuery({
    queryKey: ['testingEnvOverride', network],
    queryFn: () => {
      return env.NEXT_PUBLIC_VERCEL_ENV === 'test'
        ? fetchLocallyDeployedAddresses()
        : Promise.resolve({
            token: tokenAddress[network],
            tokenVesting: tokenVestingAddress[network],
            tokenStaking: tokenStakingAddress[network],
            tokenMaster: tokenMasterAddress[network],
          });
    },
  });
};

export default useContractAddresses;
