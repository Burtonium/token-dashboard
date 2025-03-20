import { type Page } from '@playwright/test';
import { type MetaMask } from '@synthetixio/synpress/playwright';

export async function seedBalance(
  {
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  },
  amount = 10000,
) {
  const originalUrl = page.url();
  await page.goto('/developer');
  await page.locator('[data-testid="token"]').click();
  await page.locator('[data-testid="mint-input"]').fill(amount.toString());
  await page.locator('[data-testid="mint-input"]').blur();
  await page.locator('[data-testid="mint-button"]').click();
  await metamask.confirmTransactionAndWaitForMining();
  await page.goto(originalUrl);
}
