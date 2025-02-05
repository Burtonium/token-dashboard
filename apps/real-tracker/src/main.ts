import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as realAbi from "./abi/TestReal";
import * as sRealAbi from "./abi/TestStakedReal";
import { updateRakebacks } from "./lib/updateRakebacks";
import { parseTransferAddresses } from "./lib/utils";
import { Transfer } from "./types";
import { insertTransactions } from "./queries/insertTransfers";
import { getAddress } from "viem";

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
