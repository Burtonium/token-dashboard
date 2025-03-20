'use server';

import prisma from '@/server/prisma/client';
import { decodeUser } from '@/server/auth';
import { type RewardWave } from '@prisma/client';
import { isDev } from '@/env';
import assert from 'assert';

export const saveWave = async (
  authToken: string,
  wave: Pick<
    RewardWave,
    'label' | 'live' | 'availableSeats' | 'ticketsPerMember' | 'id'
  > & { userTickets: number },
) => {
  assert(isDev, 'Not in dev mode');
  const user = await decodeUser(authToken);

  const { addresses } = user;

  const membership = await prisma.rewardWave.findFirst({
    where: {
      id: wave.id,
    },
    include: {
      memberships: {
        where: {
          address: {
            in: addresses,
          },
        },
      },
    },
  });

  return prisma.rewardWave.update({
    where: {
      id: wave.id,
    },
    include: {
      memberships: true,
    },
    data: {
      label: wave.label,
      live: wave.live,
      availableSeats: wave.availableSeats,
      ticketsPerMember: wave.ticketsPerMember,
      memberships: membership
        ? {
            update: {
              where: {
                id: membership.id,
              },
              data: {
                reedeemableTickets: wave.userTickets,
              },
            },
          }
        : undefined,
    },
  });
};
