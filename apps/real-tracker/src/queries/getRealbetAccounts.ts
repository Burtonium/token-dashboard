import pg from "pg";
import { z } from "zod";

const buildQuery = (addresses: string[]) => `
  WITH addresses AS (
    SELECT LOWER(address) AS address FROM (VALUES ${addresses.map((address) => `('${address.toLowerCase()}')`).join(", ")}) AS v(address)
  )
  SELECT l.address, c."realbetUserId"
  FROM "LinkedWallet" l
  JOIN "CasinoLink" c ON l."dynamicUserId" = c."dynamicUserId"
  JOIN addresses a ON LOWER(l.address) = a.address;
`;

export const getRealbetAccounts = async (addresses: string[]) => {
  if (addresses.length === 0) {
    throw new Error("No addresses provided");
  }
  const client = new pg.Client(process.env.DASHBOARD_DB_URL);

  await client.connect();
  const { rows } = await client.query(buildQuery(addresses));
  await client.end();

  return z
    .object({ address: z.string(), realbetUserId: z.number() })
    .array()
    .parse(rows);
};
