import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as realAbi from "./abi/TestReal";
import * as sRealAbi from "./abi/TestStakedReal";
import { updateRakebacks } from "./lib/updateRakebacks";
import { parseTransferAddresses } from "./lib/utils";
import { Transfer } from "./types";
import { insertTransactions } from "./queries/insertTransfers";
import { getAddress } from "viem";
import getConfig from "./config";

if (!process.env.DB_URL) {
  throw new Error("DB_URL environment variable is not set");
}

(async () => {
  const config = await getConfig();

  const processor = new EvmBatchProcessor()
    .setGateway(config.gateway)
    .setRpcEndpoint(config.rpcEndpoint)
    .setFinalityConfirmation(config.finality)
    .addLog({
      range: { from: config.realToken.fromBlock },
      address: [config.realToken.address],
      topic0: [realAbi.events.Transfer.topic],
    })
    .addLog({
      range: { from: config.sRealToken.fromBlock },
      address: [config.sRealToken.address],
      topic0: [sRealAbi.events.Transfer.topic],
    })
    .setFields({
      log: {
        transactionHash: true,
      },
    });

  const db = new TypeormDatabase();

  processor.run(db, async (ctx) => {
    const transfers: Transfer[] = [];
    for (let block of ctx.blocks) {
      for (let log of block.logs) {
        const address = getAddress(log.address);
        if (
          (address === config.realToken.address &&
            log.topics[0] === realAbi.events.Transfer.topic) ||
          (address === config.sRealToken.address &&
            log.topics[0] === sRealAbi.events.Transfer.topic)
        ) {
          let { from, to, value } = realAbi.events.Transfer.decode(log);
          transfers.push({
            hash: log.transactionHash,
            from: getAddress(from),
            to: getAddress(to),
            token: address === config.realToken.address ? "Real" : "sReal",
            value: value.toString(),
          });
        }
      }
    }

    await Promise.all([
      insertTransactions(transfers),
      updateRakebacks(ctx, parseTransferAddresses(transfers)),
    ]);
  });
})();
