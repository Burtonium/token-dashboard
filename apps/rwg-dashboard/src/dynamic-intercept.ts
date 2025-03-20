/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
'use client';

import { env } from '@/env.js';

const MOCKED_URL = `https://app.dynamicauth.com/api/v0/sdk/${env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/settings?sdkVersion=WalletKit%2F3.9.10`;

if (env.NEXT_PUBLIC_VERCEL_ENV === 'test') {
  const originalFetch = global.fetch;

  global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : '';

    if (url.includes(MOCKED_URL)) {
      console.log('🔹 Mocking request:', url);
      const fetched = await (await originalFetch(input, init)).json();

      fetched.chains.push({
        enabled: true,
        name: 'hardhat',
        networks: [
          {
            chainName: 'hardhat',
            enabled: true,
            networkId: 31337,
            rpcUrl: 'http://localhost:8545',
          },
        ],
      });

      const network = fetched.networks.find(
        (n: { chainName: string }) => n.chainName === 'evm',
      );
      network.networks.push({
        chain: 'HARD',
        chainId: 31337,
        iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
        isTestnet: true,
        key: 'hardhat',
        name: 'Hardhat',
        nativeCurrency: {
          decimals: 18,
          iconUrl: 'https://app.dynamic.xyz/assets/networks/eth.svg',
          name: 'Ether',
          pricingProviderTokenId: 'ethereum',
          symbol: 'ETH',
        },
        networkId: 31337,
        rpcUrls: ['http://localhost:8545'],
        shortName: 'har',
        vanityName: 'Hardhat',
        chainName: 'Hardhat',
      });

      return Promise.resolve(
        new Response(JSON.stringify(fetched), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }

    return originalFetch(input, init);
  };

  console.log('✅ Mocked dynamic to include hardhat network');
}
