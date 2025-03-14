'use server';

import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

export async function getLocallyDeployedAddresses() {
  const filePath = path.resolve(
    __dirname,
    '../realbet-evm-contracts/ignition/deployments/chain-31337/deployed_addresses.json',
  );

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return z.record(z.string()).parse(JSON.parse(data));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Could not read or parse the file at ${filePath}: ${error.message}`,
      );
    }
    throw new Error(
      `An unknown error occurred while reading the file at ${filePath}.`,
    );
  }
}

