import 'server-only';

import prisma from '@/server/prisma/client';
import { subscribeToWave } from './subscribeToWave';
import { getDynamicAuthWallets } from './getDynamicAuthWallets';

export const createCasinoLink = async ({
  userId,
  realbetUserId,
  realbetUsername,
}: {
  userId: string;
  realbetUserId: number;
  realbetUsername: string;
}) => {
  const dynamicUser = await prisma.$transaction(
    async (tx) => {
      const wallets = await getDynamicAuthWallets(userId);

      // Delete existing links to the same realbet user
      await tx.casinoLink.deleteMany({
        where: {
          realbetUserId: realbetUserId,
        },
      });

      const dynamicUser = await tx.dynamicUser.upsert({
        where: { id: userId },
        update: {
          casinoLink: {
            create: {
              realbetUserId,
              realbetUsername,
            },
          },
          wallets: {
            deleteMany: {
              dynamicUserId: userId,
              address: {
                notIn: wallets?.map(({ publicKey }) => publicKey) ?? [],
              },
            },
            createMany: {
              data:
                wallets?.map(({ publicKey, chain }) => ({
                  chain,
                  address: publicKey,
                })) ?? [],
              skipDuplicates: true,
            },
          },
        },
        create: {
          id: userId,
          username: realbetUsername,
          casinoLink: {
            create: {
              realbetUserId,
              realbetUsername,
            },
          },
          wallets: {
            createMany: {
              data:
                wallets?.map(({ publicKey, chain }) => ({
                  chain,
                  address: publicKey,
                })) ?? [],
            },
          },
        },
        include: {
          casinoLink: true,
          wallets: true,
        },
      });

      return dynamicUser;
    },
    { isolationLevel: 'Serializable' },
  );
  try {
    await subscribeToWave({
      id: userId,
      addresses: dynamicUser.wallets.map((w) => w.address),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info('Couldnt subscribe to wave:', error);
  }

  return dynamicUser;
};
