import fs from 'fs';
import path from 'path';
import { createPublicClient, http } from 'viem';
import { hardhat } from 'viem/chains';
import { z } from 'zod';

const cachedCodeResults = new Map();

const getLocallyDeployedContracts = async () => {
  const localToken = fs.readFileSync(
    path.resolve(process.cwd(), './public/locally_deployed_addresses.json'),
  );

  const record = z.record(z.string()).parse(JSON.parse(localToken.toString()));

  const addresses = {
    token: record['TestRealToken#REAL'] as `0x${string}`,
    tokenVesting: record['TestTokenVesting#MockTokenVesting'] as `0x${string}`,
    tokenStaking: record['TestTokenStaking#TokenStaking'] as `0x${string}`,
    tokenMaster: record['TestTokenMaster#TestTokenMaster'],
  };

  const publicClient = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  await Promise.all(
    Object.entries(addresses).map(async ([key, address]) => {
      if (!cachedCodeResults.has(key + address)) {
        const code = await publicClient.getCode({
          address: address as `0x${string}`,
        });

        if (!code || code === '0x') {
          throw new Error(`Local ${key} not found`);
        }

        cachedCodeResults.set(key + address, true);
      }
    }),
  );

  return addresses;
};

export default getLocallyDeployedContracts;
