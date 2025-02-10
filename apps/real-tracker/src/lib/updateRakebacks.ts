import { getBalances } from "../queries/getBalances";
import { getRealbetAccounts } from "../queries/getRealbetAccounts";
import { ApiClient, User } from "@bltzr-gg/realbet-api";
import { formatUnits } from "viem";
import { DataHandlerContext } from "@subsquid/evm-processor";

const realbetApi = new ApiClient({
  secret: process.env.REALBET_API_SECRET_KEY!,
  apiUrl: process.env.REALBET_API_URL!,
});

const USD_PRICE_PER_REAL = 0.03;

const rakebackTiers = [
  [500_000, 0.1],
  [250_000, 0.09],
  [100_000, 0.08],
  [50_000, 0.07],
  [25_000, 0.06],
  [10_000, 0.05],
  [5_000, 0.04],
  [2500, 0.03],
  [1_000, 0.02],
  [100, 0.01],
  [0, 0],
] as const;

const balanceToRakeback = (amount: string) => {
  const balance =
    Number(formatUnits(BigInt(amount.split(".")?.[0]), 18)) *
    USD_PRICE_PER_REAL;

  return rakebackTiers.find(([threshold]) => balance >= threshold)?.[1];
};

export const updateRakebacks = async (
  ctx: DataHandlerContext<unknown>,
  addresses: string[],
) => {
  if (addresses.length > 0) {
    const [balances, accounts] = await Promise.all([
      getBalances(addresses).catch((err) => {
        ctx.log.error(`Error fetching balances: ${(err as Error).message}`);
        throw err;
      }),
      getRealbetAccounts(addresses).catch((err) => {
        ctx.log.error(
          `Error fetching realbet accounts: ${(err as Error).message}`,
        );
        throw err;
      }),
    ]);

    for (const account of accounts) {
      const balance = balances.find((b) => b.address === account.address);
      const rakeback = balanceToRakeback(balance?.balance ?? "0") ?? 0;
      try {
        await User.updateRakeback(realbetApi, {
          userId: account.realbetUserId,
          rate: rakeback,
        });
        ctx.log.info(
          `Updated rakeback for realbet user id "${account.realbetUserId}"`,
        );
      } catch (e) {
        ctx.log.error(
          `Error updating rakeback for realbet user id "${account.realbetUserId}": ${(e as Error).message}`,
        );
        throw e;
      }
    }
  }
};
