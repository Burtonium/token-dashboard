import 'dotenv/config';
import { defineConfig } from '@wagmi/cli';
import { etherscan, react } from '@wagmi/cli/plugins';
import { mainnet, sepolia } from 'wagmi/chains';
import uniswapV4QuoterAbi from './src/contracts/abi/uniswapV4Quoter';
import uniswapV4RouterAbi from './src/contracts/abi/uniswapV4Router';
import permit2Abi from '@/contracts/abi/permit2';

export default defineConfig({
  out: 'src/contracts/generated.ts',
  contracts: [
    {
      name: 'UniswapV4Quoter',
      abi: uniswapV4QuoterAbi,
      address: {
        [mainnet.id]: '0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203',
        [sepolia.id]: '0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227',
      },
    },
    {
      name: 'UniswapV4Router',
      abi: uniswapV4RouterAbi,
      address: {
        [mainnet.id]: '0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af',
        [sepolia.id]: '0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b',
      },
    },
    {
      name: 'Permit2',
      abi: permit2Abi,
      address: {
        [mainnet.id]: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
        [sepolia.id]: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
      },
    },
    {
      name: 'UniswapPoolHook',
      abi: [],
      address: {
        [mainnet.id]: '0x4eD2730DBab326F0889b0Fdf5868f789a1781080',
        [sepolia.id]: '0x882104c70A54Af22311Bb1C324eB0ebaBca5D080',
      },
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: 'Token',
          address: {
            [sepolia.id]: '0xBE2bC88bac5F1C94360AC4Df95424529511e25E2',
            [mainnet.id]: '0x90836D7f096506D8A250f9DC27306d4Ac1351e6c',
          },
        },
        {
          name: 'TokenVesting',
          address: {
            [sepolia.id]: '0xC6a6EbB044629647eb5CD2eFCC1C748c38349154',
          },
        },
        {
          name: 'TokenStaking',
          address: {
            [sepolia.id]: '0xffbA2e307793896455dd7a90664ff9B2af758474',
          },
        },
        {
          name: 'TokenMaster',
          address: {
            [sepolia.id]: '0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0',
          },
        },
      ],
    }),
    react(),
  ],
});
