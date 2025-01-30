import { decodeUser } from '@/server/auth';
import prisma from '@/server/prisma/client';

export const removeWallet = async (
  authToken: string,
  { chain, address }: { chain: string; address: string },
) => {
  const user = await decodeUser(authToken);

  return prisma.linkedWallet.delete({
    where: {
      chain,
      address,
      dynamicUserId: user.id,
    },
  });
};
