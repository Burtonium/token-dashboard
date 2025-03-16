import { type Page } from '@playwright/test';
import { type MetaMask } from '@synthetixio/synpress/playwright';

export async function signin({
  page,
  metamask,
}: {
  page: Page;
  metamask: MetaMask;
}) {
  await page.locator('nav [data-testid="connect-button"]').click();
  await page.locator('button:has-text("MetaMask")').click();

  await metamask.connectToDapp();
  await metamask.confirmSignature();
}
