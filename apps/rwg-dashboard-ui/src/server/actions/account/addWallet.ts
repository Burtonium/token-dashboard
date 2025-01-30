import { decodeUser } from '@/server/auth';
import prisma from '@/server/prisma/client';

export const addWallet = async (
  authToken: string,
  { chain, address }: { chain: string; address: string },
) => {
  const user = await decodeUser(authToken);

  return prisma.linkedWallet.create({
    data: {
      chain,
      address,
      dynamicUserId: user.id,
    },
  });
};
