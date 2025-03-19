// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup, { account } from './wallet/basic.setup';
import { signin } from './helpers/signin';
import getLocallyDeployedContracts from './helpers/getLocallyDeployedContracts';
import setTokenBalance from './helpers/evm/setTokenBalance';
import setTokenAllowance from './helpers/evm/setTokenAllowance';
import deletePreviousStakes from './helpers/evm/deletePreviousStakes';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test.beforeAll(async () => {
  const contracts = await getLocallyDeployedContracts();

  await setTokenBalance(account.address, contracts.token, 10000n * 10n ** 18n);
  await setTokenBalance(account.address, contracts.tokenStaking, 0n);
  await setTokenAllowance(
    account.address,
    contracts.tokenStaking,
    contracts.token,
    0n,
  );
  await deletePreviousStakes(account.address, contracts.tokenStaking);
});

test.only('should connect wallet to the MetaMask Test Dapp', async ({
  context,
  page,
  metamaskPage,
  extensionId,
}, testInfo) => {
  testInfo.setTimeout(90000);
  // Create a new MetaMask instance
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId,
  );

  await page.goto('/staking');
  await signin({ page, metamask });
  await page.locator('[data-testid="staking-input"]').fill('10000');
  await page.locator(`[data-testid="tier-1-button"]`).click();
  await page.locator('[data-testid="stake-button"]').click();
  await metamask.confirmTransaction();
  await metamask.confirmTransactionAndWaitForMining();
  await page.waitForTimeout(5000);
  await metamask.confirmTransactionAndWaitForMining();
  await page.waitForTimeout(5000);
  await expect(page.locator('[data-testid="staked-balance"]')).toHaveText(
    '10,000.00',
    { timeout: 10000 },
  );
  await expect(page.locator('[data-testid="token-balance"]')).toHaveText(
    '0.00',
  );
  await expect(page.locator('[data-testid="current-multiplier"]')).toHaveText(
    '0.50x',
    { timeout: 10000 },
  );
});
