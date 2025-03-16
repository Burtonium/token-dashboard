// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from './wallet/basic.setup';
import * as dynamic from './mocks/dynamic';
import { signin } from './helpers/signin';
import { seedBalance } from './helpers/seedBalance';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

test('should connect wallet to the MetaMask Test Dapp', async ({
  context,
  page,
  metamaskPage,
  extensionId,
}, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 30000);
  // Create a new MetaMask instance
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId,
  );

  // Intercept and mock the API request
  await page.route(
    'https://app.dynamicauth.com/api/v0/sdk/84fc7be7-9397-4241-b0f9-9f6d0d882755/settings?sdkVersion=WalletKit%2F3.9.10',
    (route) =>
      route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dynamic.settings),
      }),
  );

  // Navigate to the homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/REAL VIP/);
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText('Welcome to the Real World');

  await signin({ page, metamask });

  await expect(page.locator('nav [data-testid="connect-button"]')).toHaveText(
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  );

  await seedBalance({ page, metamask }, 10000);
  await page.waitForTimeout(1000);
  await expect(
    page.locator('[data-testid="real-available-balance"]'),
  ).toHaveText('10,000.00');

  await expect(page.locator('[data-testid="real-staked-balance"]')).toHaveText(
    '0.00',
  );
});
