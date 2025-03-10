// Import necessary Synpress modules and setup
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import basicSetup from './wallet/basic.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test;

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
  await page.locator('nav [data-testid="connect-button"]').click();
  await page.locator('button:has-text("MetaMask")').click();

  await metamask.connectToDapp();
  await metamask.confirmSignature();

  await expect(page.locator('nav [data-testid="connect-button"]')).toHaveText(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  );
});
