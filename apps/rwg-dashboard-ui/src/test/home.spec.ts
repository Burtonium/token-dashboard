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

  // Click the connect button
  await page.locator('nav #connect').click();

  // Connect MetaMask to the dapp
  await metamask.connectToDapp();

  // Verify the connected account address
  await expect(page.locator('#accounts')).toHaveText(
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  );
});

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/REAL VIP/);
});

test('main heading is visible', async ({ page }) => {
  await page.goto('/');
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();
  await expect(mainHeading).toHaveText('Welcome to the Real World');
});
