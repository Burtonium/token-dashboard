import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as realAbi from "./abi/TestReal";
import * as sRealAbi from "./abi/TestStakedReal";
import { Transfer } from "./model";
import { getBalances } from "./queries/balances";

const config = {
  rpcEndpoint: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  gateway: "https://v2.archive.subsquid.io/network/ethereum-sepolia",
  realToken: {
    address: "0x80503a00e1B60C9Be8E6f005C3d4fDbbDAbd5be2",
    fromBlock: 6_830_530,
  },
  sRealToken: {
    address: "0x59D0C681E593edd818075C8B56473bC7e31085e7",
    fromBlock: 7_584_974,
  },
} as const;

const processor = new EvmBatchProcessor()
  .setGateway(config.gateway)
  .setRpcEndpoint(config.rpcEndpoint)
  .setFinalityConfirmation(75)
  .addLog({
    range: { from: config.realToken.fromBlock },
    address: [config.realToken.address],
    topic0: [realAbi.events.Transfer.topic],
  })
  .addLog({
    range: { from: config.sRealToken.fromBlock },
    address: [config.sRealToken.address],
    topic0: [sRealAbi.events.Transfer.topic],
  });

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  const transfers: Transfer[] = [];
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (
        (log.address === config.realToken.address.toLowerCase() &&
          log.topics[0] === realAbi.events.Transfer.topic) ||
        (log.address === config.sRealToken.address.toLowerCase() &&
          log.topics[0] === sRealAbi.events.Transfer.topic)
      ) {
        let { from, to, value } = realAbi.events.Transfer.decode(log);
        transfers.push(
          new Transfer({
            id: log.id,
            from,
            to,
            value,
          }),
        );
      }
    }
  }

  await ctx.store.insert(transfers);

  const addresses = transfers.reduce((acc, transfer) => {
    acc.add(transfer.from);
    acc.add(transfer.to);
    return acc;
  }, new Set<string>());

  addresses.delete("0x0000000000000000000000000000000000000000");

  if (addresses.size > 0) {
    const balances = await getBalances(Array.from(addresses));
    console.log(balances);
  }
});
