import prisma from '../prisma/client';

export type User = {
  id: string;
  username?: string;
  email?: string;
  wallets?: {
    chain: string;
    address: string;
    lastSelectedAt?: Date;
  }[];
};

export const upsertDynamicUser_clientUnsafe = async (
  user: User,
  options: {
    deleteWallets?: boolean;
  } = { deleteWallets: true },
) => {
  const wallets = user.wallets?.map((wallet) => wallet.address);

  return prisma.dynamicUser.upsert({
    where: {
      id: user.id,
    },
    update: {
      ...user,
      wallets:
        user.wallets && user.wallets.length > 0
          ? {
              deleteMany: options.deleteWallets
                ? {
                    dynamicUserId: user.id,
                    address: {
                      notIn: wallets,
                    },
                  }
                : undefined,
              createMany: {
                data:
                  user.wallets?.map((wallet) => ({
                    chain: wallet.chain,
                    address: wallet.address,
                    lastSelectedAt: wallet.lastSelectedAt,
                  })) ?? [],
              },
            }
          : undefined,
    },
    create: {
      ...user,
      wallets: {
        createMany: {
          data:
            user.wallets?.map((wallet) => ({
              chain: wallet.chain,
              address: wallet.address,
              lastSelectedAt: wallet.lastSelectedAt,
            })) ?? [],
        },
      },
    },
  });
};
