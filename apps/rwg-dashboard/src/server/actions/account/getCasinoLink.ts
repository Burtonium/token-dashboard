'use server';

import prisma from '@/server/prisma/client';
import { authGuard } from '../../auth';

export const getCasinoLink = authGuard(async (user) => {
  const casinoLink = await prisma.casinoLink.findFirst({
    where: {
      dynamicUserId: user.id,
    },
  });

  if (!casinoLink) {
    return null;
  }

  return casinoLink;
});
