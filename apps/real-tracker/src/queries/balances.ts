import pg from "pg";
import { z } from "zod";

const buildQuery = (addresses: string[]) => `
  WITH AddressList AS (
    SELECT address FROM (VALUES ${addresses.map((address) => `('${address}')`).join(", ")}) AS v(address)
  ),
  AddressBalance AS (
    SELECT
      address,
      SUM(CASE 
          WHEN t.from = address THEN -t.value 
          ELSE t.value 
      END) AS balance
    FROM transfer t
    JOIN AddressList a ON t.from = a.address OR t.to = a.address
    GROUP BY address
  )

  SELECT address, balance FROM AddressBalance;
`;

export const getBalances = async (addresses: string[]) => {
  if (addresses.length === 0) {
    return [];
  }
  const client = new pg.Client({
    host: "localhost", // Use the service name from docker-compose
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.POSTGRES_DB,
    user: "postgres", // Default PostgreSQL user
    password: process.env.POSTGRES_PASSWORD || "postgres",
  });

  await client.connect();
  const { rows } = await client.query(buildQuery(addresses));
  await client.end();

  return z
    .array(z.object({ address: z.string(), balance: z.string() }))
    .parse(rows);
};
