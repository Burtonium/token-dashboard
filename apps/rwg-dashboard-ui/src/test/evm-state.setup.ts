/* eslint-disable no-console */
import { test as setup } from '@playwright/test';
import { mnemonicToAccount } from 'viem/accounts';
import {
  createPublicClient,
  createTestClient,
  encodeAbiParameters,
  http,
  keccak256,
  pad,
} from 'viem';
import fs from 'fs';
import path from 'path';
import { hardhat } from 'viem/chains';
import { z } from 'zod';

setup('Reset Token state', async () => {
  console.log('🔎 Checking for locally deployed REAL token');
  const localToken = fs.readFileSync(
    path.resolve(process.cwd(), './public/locally_deployed_addresses.json'),
  );
  const localTokenAddress = z
    .record(z.string())
    .parse(JSON.parse(localToken.toString()))['TestRealToken#REAL'];

  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  if (!localTokenAddress) {
    throw new Error('Local token not found');
  }

  const code = await publicClient.getCode({
    address: localTokenAddress as `0x${string}`,
  });

  if (!code || code === '0x') {
    throw new Error('Local token not found');
  }

  const client = createTestClient({
    chain: hardhat,
    mode: 'hardhat',
    transport: http(),
  });

  const userAccount = mnemonicToAccount(
    'test test test test test test test test test test test junk',
    { path: "m/44'/60'/0'/0/1" },
  );

  const userBalanceSlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }],
      [userAccount.address, 0n],
    ),
  );

  await client.setStorageAt({
    address: localTokenAddress as `0x${string}`,
    index: userBalanceSlot,
    value: pad('0x0'),
  });

  console.log('💰 Test User REAL Token balance set to 0');

  const treasuryAccount = mnemonicToAccount(
    'test test test test test test test test test test test junk',
    { path: "m/44'/60'/0'/0/0" },
  );

  const treasuryBalanceSlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }],
      [treasuryAccount.address, 0n],
    ),
  );

  await client.setStorageAt({
    address: localTokenAddress as `0x${string}`,
    index: treasuryBalanceSlot,
    value: pad(`0x${(10n ** 24n).toString(16)}`),
  });

  console.log('💰 Treasury REAL Token balance set to 1,000,000');
});
