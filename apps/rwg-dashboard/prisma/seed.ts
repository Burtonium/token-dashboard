/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { WAVE_CONFIGURATIONS } from '@/config/linkToWin';
import { readClaims } from './getClaimsData';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DB_POSTGRES_URL_NON_POOLING,
});

const waveConfig = WAVE_CONFIGURATIONS[1];

async function main() {
  await prisma.rewardWave.upsert({
    where: { id: 1 },
    update: {
      label: waveConfig.label,
      description: waveConfig.description,
      startTime: waveConfig.startTime,
      endTime: waveConfig.endTime,
      availableSeats: waveConfig.availableSeats,
      ticketsPerMember: waveConfig.ticketsPerMember,
      whitelist: {
        createMany: {
          data: waveConfig.whitelist.map((address) => ({
            address,
          })),
          skipDuplicates: true,
        },
      },
    },
    create: {
      id: 1,
      label: waveConfig.label,
      description: waveConfig.description,
      startTime: waveConfig.startTime,
      endTime: waveConfig.endTime,
      availableSeats: waveConfig.availableSeats,
      ticketsPerMember: waveConfig.ticketsPerMember,
      live: true,
      totalRewards: WAVE_CONFIGURATIONS[1].rewardPresets.reduce(
        (sum, preset) => sum + preset.remaining,
        0,
      ),
      rewardPresets: {
        createMany: {
          data: WAVE_CONFIGURATIONS[1].rewardPresets.slice(),
        },
      },
      whitelist: {
        createMany: {
          data: WAVE_CONFIGURATIONS[1].whitelist.map((address) => ({
            address,
          })),
        },
      },
    },
  });

  await prisma.claimPeriod.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
      claims: {
        createMany: {
          data: (await readClaims()).map(({ address, amount }) => ({
            blockchain: 'ethereum',
            address,
            amount: BigInt(amount).toString(),
            status: 'Pending',
          })),
          skipDuplicates: true,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: Error) => {
    console.error(e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
