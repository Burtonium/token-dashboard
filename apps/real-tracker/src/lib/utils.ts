import { Transfer } from "../model";

export const parseTransferAddresses = (transfers: Transfer[]) => {
  const addressesSet = transfers.reduce((acc, transfer) => {
    acc.add(transfer.from);
    acc.add(transfer.to);
    return acc;
  }, new Set<string>());

  addressesSet.delete("0x0000000000000000000000000000000000000000");

  return Array.from(addressesSet);
};
