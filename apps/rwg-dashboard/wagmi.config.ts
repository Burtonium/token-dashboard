import 'dotenv/config';
import { defineConfig } from '@wagmi/cli';
import { react, etherscan } from '@wagmi/cli/plugins';
import { sepolia } from 'viem/chains';

export default defineConfig({
  out: 'src/contracts/generated.ts',
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: 'Token',
          address: {
            [sepolia.id]: '0xBE2bC88bac5F1C94360AC4Df95424529511e25E2',
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
