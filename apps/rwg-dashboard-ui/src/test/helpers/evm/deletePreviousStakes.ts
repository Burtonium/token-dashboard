import { createTestClient, encodeAbiParameters, http, keccak256 } from 'viem';
import { hardhat } from 'viem/chains';

const deletePreviousStakes = async (
  owner: `0x${string}`,
  contract: `0x${string}`,
) => {
  const client = createTestClient({
    chain: hardhat,
    mode: 'hardhat',
    transport: http(),
  });

  // Base slot for mapping (userStakes)
  const mappingBaseSlot = 4n;

  // Compute mapping key slot: keccak256(abi.encode(owner, mappingBaseSlot))
  const mappingKeySlot = keccak256(
    encodeAbiParameters(
      [{ type: 'address' }, { type: 'uint256' }],
      [owner, mappingBaseSlot],
    ),
  );

  // Set array length to 0
  await client.setStorageAt({
    address: contract,
    index: mappingKeySlot,
    value: encodeAbiParameters([{ type: 'uint256' }], [0n]),
  });
};

export default deletePreviousStakes;
