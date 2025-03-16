import { defineConfig, devices } from '@playwright/test';

// Define Playwright configuration
export default defineConfig({
  testDir: './src/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Set base URL for tests
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Copying Locally Deployed Addresses 📦',
      testMatch: /.*local-deployments.setup.ts/,
    },
    {
      name: 'Resetting EVM State  🧹',
      testMatch: /.*evm-state.setup.ts/,
    },
    {
      name: 'Testing App 🧪',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
