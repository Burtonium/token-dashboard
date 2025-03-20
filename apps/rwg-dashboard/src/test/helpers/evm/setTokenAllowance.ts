import { createTestClient, encodeAbiParameters, http, keccak256 } from 'viem';
import { hardhat } from 'viem/chains';

const setTokenAllowance = async (
  owner: `0x${string}`,
  spender: `0x${string}`,
  contract: `0x${string}`,
  value: bigint,
) => {
  const client = createTestClient({
    chain: hardhat,
    mode: 'hardhat',
    transport: http(),
  });

  const allowanceSlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }],
      [owner, 1n],
    ),
  );

  const spenderAllowanceSlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'bytes32' }],
      [spender, allowanceSlot],
    ),
  );

  await client.setStorageAt({
    address: contract,
    index: spenderAllowanceSlot,
    value: encodeAbiParameters([{ type: 'uint256' }], [value]),
  });
};

export default setTokenAllowance;
