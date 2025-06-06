import { hardhat, mainnet, sepolia } from 'viem/chains';
import { type GetArrayElementType } from '@/types';

export * from 'viem/chains';

export const evm = [mainnet, sepolia] as const;
export const test = [hardhat] as const;
export const allNetworks = [...evm, ...test] as const;
export const production = allNetworks.filter((chain) => !chain.testnet);
export const development = allNetworks.filter(
  (chain) => chain.testnet === true,
);
export type NetworkId = GetArrayElementType<typeof allNetworks>['id'];
export type EVMId = GetArrayElementType<typeof evm>['id'];

export const isEvm = (id: NetworkId): id is EVMId =>
  evm.some((chain) => chain.id === id);

export const getNetworkType = (id: NetworkId): 'eip155' | 'solana' =>
  evm.some((chain) => chain.id === id) ? 'eip155' : 'solana';

export const networkIdExists = (
  id: string | number | undefined | null,
): id is NetworkId => allNetworks.some((chain) => chain.id === id);
