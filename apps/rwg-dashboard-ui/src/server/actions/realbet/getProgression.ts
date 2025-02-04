'use server';

import { ApiClient, User } from '@bltzr-gg/realbet-api';
import { env } from '@/env';
import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { constructError } from '../errors';

const realbetApi = new ApiClient({
  secret: env.REALBET_API_SECRET_KEY,
  apiUrl: env.REALBET_API_URL,
});

export const getRealbetProgression = authGuard(async (user) => {
  const link = await prisma.casinoLink.findFirst({
    where: {
      dynamicUserId: user.id,
    },
  });

  if (!link) {
    return constructError('No casino link found');
  }

  try {
    const [rakeback, level] = await Promise.all([
      User.getRakeback(realbetApi, { userId: link.realbetUserId }),
      User.getVipLevel(realbetApi, { userId: link.realbetUserId }),
    ]);

    return {
      rakeback,
      level,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error((error as Error).message);
    return constructError('Something went wrong with the Realbet API');
  }
});
