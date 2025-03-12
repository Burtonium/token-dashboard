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

export const fetchLocallyDeployedAddresses = async () => {
  const locallyDeployedJson = await import(
    '@bltzr-gg/realbet-evm-contracts/ignition/deployments/chain-31337/deployed_addresses.json'
  );

  return {
    token: locallyDeployedJson.default['TestRealToken#REAL'] as `0x${string}`,
    tokenVesting: locallyDeployedJson.default[
      'TestTokenVesting#MockTokenVesting'
    ] as `0x${string}`,
    tokenStaking: locallyDeployedJson.default[
      'TestTokenStaking#TokenStaking'
    ] as `0x${string}`,
    tokenMaster: locallyDeployedJson.default[
      'TestTokenMaster#TestTokenMaster'
    ] as `0x${string}`,
  };
};

const useContractAddresses = () => {
  const { data } = useNetworkId();

  const defaultNetwork = 11155111;
  const network = networkIdExists(data) ? data : defaultNetwork;

  const { data: overrides } = useQuery({
    queryKey: ['testingEnvOverride'],
    enabled: env.NEXT_PUBLIC_VERCEL_ENV === 'test',
    queryFn: fetchLocallyDeployedAddresses,
  });

  return {
    token: tokenAddress[network],
    tokenVesting: tokenVestingAddress[network],
    tokenStaking: tokenStakingAddress[network],
    tokenMaster: tokenMasterAddress[network],
    ...overrides,
  };
};

export default useContractAddresses;
