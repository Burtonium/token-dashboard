'use server';

import { authGuard } from '../../auth';
import prisma from '@/server/prisma/client';
import { ClaimStatus } from '@prisma/client';
import { constructError } from '@/server/actions/errors';
import * as Sentry from '@sentry/nextjs';

export const updateClaimStatus = authGuard(
  async (
    _user,
    claimId: number,
    status: typeof ClaimStatus.Claimed | typeof ClaimStatus.Error,
    reasonOrTx?: string,
  ) => {
    try {
      if (status !== 'Error' && status !== 'Claimed') {
        return constructError('Invalid status');
      }

      const claim = await prisma.claim.findUnique({
        where: {
          id: claimId,
        },
      });

      if (claim?.status !== 'Signed' && claim?.status !== 'Error') {
        return constructError('Invalid claim status');
      }

      await prisma.claim.update({
        where: {
          id: claimId,
        },
        data:
          status === ClaimStatus.Error
            ? { status, reason: reasonOrTx }
            : {
                status,
                txHash: reasonOrTx,
              },
      });
    } catch (error) {
      Sentry.captureException(error);
      // eslint-disable-next-line no-console
      console.error(error);

      return constructError('An unexpected error occurred');
    }
  },
);
