import pg from "pg";
import { z } from "zod";
import { Transfer } from "../types";

const buildQuery = (transfers: Transfer[]) => `
  INSERT INTO "Transfers" ("hash", "token", "from", "to", "value")
  VALUES ${transfers
    .map(
      (transfer) =>
        `('${transfer.hash}', '${transfer.token}', '${transfer.from}', '${transfer.to}', '${transfer.value}')`,
    )
    .join(", ")} ON CONFLICT DO NOTHING;
`;

export const insertTransactions = async (transfers: Transfer[]) => {
  if (transfers.length === 0) {
    return;
  }

  const client = new pg.Client(process.env.DB_URL);

  await client.connect();
  const { rows } = await client.query(buildQuery(transfers));
  await client.end();

  return z
    .object({ address: z.string(), realbetUserId: z.number() })
    .array()
    .parse(rows);
};
