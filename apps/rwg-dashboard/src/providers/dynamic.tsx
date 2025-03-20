'use client';

import { env } from '@/env';
import { DynamicContextProvider, getAuthToken } from '../lib/dynamic';
import {
  EthereumWalletConnectors,
  SolanaWalletConnectors,
  BitcoinWalletConnectors,
} from '../lib/dynamic';

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
              onAuthSuccess: async (data) => {
                try {
                  const { upsertSelf } = await import(
                    '@/app/developer/upsertSelf'
                  );

                  if (!data.user.userId) {
                    // eslint-disable-next-line no-console
                    console.error('No userId in log in event');
                    return;
                  }
                  void upsertSelf({
                    id: data.user.userId,
                    username: data.user.username ?? undefined,
                  });
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error('Error upserting user:', (e as Error).message);
                }
              },
              onWalletAdded: async ({ wallet }) => {
                const { addWallet } = await import('@/app/developer/addWallet');
                const token = getAuthToken();
                if (!token) {
                  return;
                }
                void addWallet(token, {
                  chain: wallet.chain,
                  address: wallet.address,
                });
              },
              onWalletRemoved: async ({ wallet }) => {
                const { deleteWallet } = await import(
                  '@/app/developer/deleteWallet'
                );
                const token = getAuthToken();
                if (!token) {
                  return;
                }
                void deleteWallet(token, wallet.address);
              },
              onUserProfileUpdate: (user) => {
                const token = getAuthToken();
                if (!token || user.userId === undefined) {
                  return;
                }

                void import('@/app/developer/upsertSelf')
                  .then((mod) =>
                    mod.upsertSelf({
                      id: user.userId!,
                      username: user.username ?? undefined,
                      wallets: user.verifiedCredentials
                        ?.filter((wallet) => wallet.chain && wallet.address)
                        .map((wallet) => ({
                          chain: wallet.chain!,
                          address: wallet.address!,
                        })),
                    }),
                  )
                  .catch(() => {
                    // ignore, module could be deleted in prod
                  });
              },
              onEmbeddedWalletCreated: async (creds) => {
                const { addWallet } = await import('@/app/developer/addWallet');

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
