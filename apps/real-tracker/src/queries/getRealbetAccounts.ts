import pg from "pg";
import { z } from "zod";

const RealbetAccountsSchema = z
  .object({
    address: z.string(),
    realbetUserId: z.number(),
  })
  .array();

type RealbetAccounts = z.infer<typeof RealbetAccountsSchema>;

const buildQuery = (addresses: string[]) => `
  WITH addresses AS (
    SELECT address AS address FROM (VALUES ${addresses.map((address) => `('${address}')`).join(", ")}) AS v(address)
  )
  SELECT l.address, c."realbetUserId"
  FROM "LinkedWallet" l
  JOIN "CasinoLink" c ON l."dynamicUserId" = c."dynamicUserId"
  JOIN addresses a ON l.address = a.address;
`;

export const getRealbetAccounts = async (
  addresses: string[],
): Promise<RealbetAccounts> => {
  if (addresses.length === 0) {
    return [];
  }

  const client = new pg.Client(process.env.DB_URL);

  await client.connect();
  const { rows } = await client.query(buildQuery(addresses));
  await client.end();

  return z
    .object({ address: z.string(), realbetUserId: z.number() })
    .array()
    .parse(rows);
};
