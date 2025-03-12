// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from './wallet/basic.setup';
import * as dynamic from './mocks/dynamic';

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
  await page.locator('nav [data-testid="connect-button"]').click();
  await page.locator('button:has-text("MetaMask")').click();

  await metamask.connectToDapp();
  await metamask.confirmSignature();

  await expect(page.locator('nav [data-testid="connect-button"]')).toHaveText(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  );

  await page.goto('/developer');
  await page.waitForLoadState('load');
  await page.locator('[data-testid="token"]').click();
  await page.locator('[data-testid="mint-input"]').fill('10000');
  await page.locator('[data-testid="mint-input"]').blur();
  await expect(page.locator('[data-testid="mint-button"]')).toBeEnabled();
  await page.locator('[data-testid="mint-button"]').click();
  await metamask.confirmSignature();
  await page.goto('/');
});
