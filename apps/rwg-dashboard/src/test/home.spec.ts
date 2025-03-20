// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup, { account } from './wallet/basic.setup';
import { signin } from './helpers/signin';
import getLocallyDeployedContracts from './helpers/getLocallyDeployedContracts';
import setTokenBalance from './helpers/evm/setTokenBalance';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test.beforeAll(async () => {
  const contracts = await getLocallyDeployedContracts();
  await setTokenBalance(account.address, contracts.token, 10000n * 10n ** 18n);
  await setTokenBalance(
    account.address,
    contracts.tokenStaking,
    12340n * 10n ** 18n,
  );
});

test('should connect wallet to the MetaMask Test Dapp', async ({
  context,
  page,
  metamaskPage,
  extensionId,
}) => {
  // Create a new MetaMask instance
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId,
  );

  // Navigate to the homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/REAL VIP/);
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText('Welcome to the Real World');
  await expect(
    page.locator('[data-testid="real-available-balance"]'),
  ).toHaveText('0.00');

  await expect(page.locator('[data-testid="real-staked-balance"]')).toHaveText(
    '0.00',
  );
  await signin({ page, metamask });

  await expect(page.locator('nav [data-testid="connect-button"]')).toHaveText(
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  );
  await expect(
    page.locator('[data-testid="real-available-balance"]'),
  ).toHaveText('10,000.00');

  await expect(page.locator('[data-testid="real-staked-balance"]')).toHaveText(
    '12,340.00',
  );

  await expect(
    page.locator('[data-testid="link-realbet-button"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="realbet-progression-widget"]'),
  ).toBeVisible();
  await expect(page.locator('[data-testid="quest-track"]')).toBeVisible();
});
