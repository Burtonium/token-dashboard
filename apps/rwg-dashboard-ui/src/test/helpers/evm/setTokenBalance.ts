import { createTestClient, encodeAbiParameters, http, keccak256 } from 'viem';
import { hardhat } from 'viem/chains';

const setTokenBalance = async (
  address: `0x${string}`,
  contract: `0x${string}`,
  value: bigint,
) => {
  const client = createTestClient({
    chain: hardhat,
    mode: 'hardhat',
    transport: http(),
  });

  const userBalanceSlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }],
      [address, 0n],
    ),
  );

  await client.setStorageAt({
    address: contract,
    index: userBalanceSlot,
    value: encodeAbiParameters([{ type: 'uint256' }], [value]),
  });
};

export default setTokenBalance;
