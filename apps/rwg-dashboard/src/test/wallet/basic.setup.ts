import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';
import { mnemonicToAccount } from 'viem/accounts';

const SEED_PHRASE =
  'test test test test test test test test test test test junk';
const PASSWORD = 'Tester@1234';

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);
  await metamask.importWallet(SEED_PHRASE);
  await metamask.addNetwork({
    name: 'Hardhat',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
  });

  await metamask.switchAccount('Account 2');
});

export const account = mnemonicToAccount(
  'test test test test test test test test test test test junk',
  { path: "m/44'/60'/0'/0/1" },
);
