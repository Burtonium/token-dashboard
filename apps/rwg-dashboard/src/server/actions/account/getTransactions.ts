'use server';

import { authGuard } from '@/server/auth';
import prisma from '@/server/prisma/client';
import { type TokenType } from '@prisma/client';

const getTransactions = authGuard(
  async (user, { page, token }: { page?: number; token?: TokenType } = {}) => {
    return prisma.transfers.findMany({
      where: {
        token,
        OR: [
          {
            from: {
              in: user.addresses,
            },
          },
          {
            to: {
              in: user.addresses,
            },
          },
        ],
      },
      take: 100,
      skip: page ? page * 100 : 0,
    });
  },
);

export default getTransactions;
