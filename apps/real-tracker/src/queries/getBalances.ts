import pg from "pg";
import { z } from "zod";

const BalancesSchema = z
  .object({
    address: z.string(),
    balance: z.string().default("0"),
  })
  .array();

type Balances = z.infer<typeof BalancesSchema>;

const buildQuery = (addresses: string[]) => `
  WITH addresses AS (
    SELECT address FROM (VALUES ${addresses.map((address) => `('${address}')`).join(", ")}) AS v(address)
  ),
  balances AS (
    SELECT
      address,
      SUM(CASE 
          WHEN t.from = address AND t.to <> address THEN -t.value
          WHEN t.to = address AND t.from <> address THEN t.value
          ELSE 0
      END) AS balance
    FROM "Transfers" t
    JOIN addresses a ON t.from = a.address OR t.to = a.address
    GROUP BY address
  )

  SELECT address, balance FROM balances;
`;

export const getBalances = async (addresses: string[]): Promise<Balances> => {
  if (addresses.length === 0) {
    return [];
  }
  const client = new pg.Client(process.env.DB_URL);

  await client.connect();
  const { rows } = await client.query(buildQuery(addresses));
  await client.end();

  return z
    .array(z.object({ address: z.string(), balance: z.string().default("0") }))
    .parse(rows);
};
