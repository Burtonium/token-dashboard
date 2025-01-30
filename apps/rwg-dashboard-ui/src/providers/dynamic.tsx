'use client';

import { env } from '@/env';
import { DynamicContextProvider, getAuthToken } from '../lib/dynamic';
import {
  EthereumWalletConnectors,
  SolanaWalletConnectors,
  BitcoinWalletConnectors,
} from '../lib/dynamic';
import { addWallet } from '@/server/actions/account/addWallet';
import { upsertDynamicUser } from '@/server/clientUnsafe/upsertDynamicUser';

const isLocalhost =
  typeof window !== 'undefined' && window.location.hostname === 'localhost';

export default function ProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [
          EthereumWalletConnectors,
          SolanaWalletConnectors,
          BitcoinWalletConnectors,
        ],
        // these events are in the dynamic webhook, but we can also listen to them here
        // in a local environment to keep the database synced
        events: isLocalhost
          ? {
              onWalletAdded: ({ wallet }) => {
                const token = getAuthToken();
                if (!token) {
                  return;
                }
                void addWallet(token, {
                  chain: wallet.chain,
                  address: wallet.address,
                });
              },
              onWalletRemoved: ({ wallet }) => {
                const token = getAuthToken();
                if (!token) {
                  return;
                }
                void addWallet(token, {
                  chain: wallet.chain,
                  address: wallet.address,
                });
              },
              onUserProfileUpdate: (user) => {
                const token = getAuthToken();
                if (!token || !user.userId) {
                  return;
                }
                void upsertDynamicUser({
                  id: user.userId,
                  username: user.username ?? undefined,
                  wallets: user.verifiedCredentials
                    ?.filter((wallet) => wallet.chain && wallet.address)
                    .map((wallet) => ({
                      chain: wallet.chain!,
                      address: wallet.address!,
                    })),
                });
              },
              onEmbeddedWalletCreated: (creds) => {
                const token = getAuthToken();
                if (!token || !creds?.chain || !creds.address) {
                  return;
                }
                void addWallet(token, {
                  chain: creds.chain,
                  address: creds.address,
                });
              },
            }
          : undefined,
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
