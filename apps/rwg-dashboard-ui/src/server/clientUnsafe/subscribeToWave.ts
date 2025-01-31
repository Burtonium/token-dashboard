import prisma from '../prisma/client';
import type { User } from '../auth';
import { getCurrentWave } from '../actions/ticket-waves/getCurrentWave';
import { AwardedTicketsType } from '@prisma/client';

export const subscribeToWave_clientUnsafe = async (user: User) => {
  return prisma.$transaction(
    async (tx) => {
      const currentWave = await getCurrentWave(tx, user.addresses);

      if (!currentWave) {
        throw new Error('No current wave');
      }

      if (!currentWave.whitelisted || !currentWave.whitelist[0]) {
        throw new Error('Not whitelisted');
      }

      if (currentWave.availableSeats <= 0) {
        throw new Error('No seats available');
      }

      if (currentWave.memberships.length > 0) {
        throw new Error('One or more memberships already to that address.');
      }

      const waveMembership = Promise.all([
        tx.waveMembership
          .create({
            data: {
              address: currentWave.whitelist[0].address,
              waveId: currentWave.id,
              reedeemableTickets: currentWave.ticketsPerMember,
              seatNumber: currentWave._count.memberships + 1,
              awardedTickets: {
                create: {
                  type: AwardedTicketsType.WaveSignupBonus,
                  amount: currentWave.ticketsPerMember,
                },
              },
            },
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            throw new Error('Something went wrong creating wave membership.');
          }),
        tx.rewardWave
          .update({
            where: {
              id: currentWave.id,
            },
            data: {
              availableSeats: {
                decrement: 1,
              },
            },
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            throw new Error('Something went wrong');
          }),
      ]);

      return waveMembership;
    },
    { isolationLevel: 'RepeatableRead' },
  );
};
