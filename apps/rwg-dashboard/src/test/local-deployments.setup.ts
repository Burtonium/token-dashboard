/* eslint-disable no-console */

import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

setup('Copying locally deployed addresses', async () => {
  const sourcePath = path.resolve(
    process.cwd(),
    '../evm-contracts/ignition/deployments/chain-31337/deployed_addresses.json',
  );

  const destPath = path.resolve(
    process.cwd(),
    './public/locally_deployed_addresses.json',
  );

  if (!fs.existsSync(sourcePath)) {
    console.error(
      '❌ JSON file not found. Please deploy solidity contracts locally before testing.',
    );
    process.exit(1);
  }

  fs.copyFileSync(sourcePath, destPath);
  console.log('✅ Locally deployed addresses copied to', destPath);
});
