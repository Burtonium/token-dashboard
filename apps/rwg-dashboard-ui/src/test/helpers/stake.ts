import { type Page } from '@playwright/test';
import { type MetaMask } from '@synthetixio/synpress/playwright';

export async function stake(
  {
    page,
    metamask,
  }: {
    page: Page;
    metamask: MetaMask;
  },
  amount = 10000,
  tier = 0,
) {
  const originalUrl = page.url();
  await page.goto('/staking');
  await page.locator('[data-testid="staking-input"]').fill(amount.toString());
  await page
    .locator(`[data-testid="tier-${parseInt(tier.toString())}-button"]`)
    .click();
  await page.locator('[data-testid="stake-button"]').click();
  await metamask.confirmTransaction();
  await metamask.page
    .locator('[data-testid="page-container-footer-next"]')
    .click();
  await metamask.page
    .locator('[data-testid="page-container-footer-next"]')
    .click();
  await metamask.confirmTransactionAndWaitForMining();
  await page.goto(originalUrl);
}
