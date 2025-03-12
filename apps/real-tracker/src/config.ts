const dev = {
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
  finality: 75,
} as const;

export const fetchLocallyDeployedAddresses = async () => {
  const locallyDeployedJson = await import(
    "@bltzr-gg/realbet-evm-contracts/ignition/deployments/chain-31337/deployed_addresses.json"
  );
  return {
    token: locallyDeployedJson.default["TestRealToken#REAL"] as `0x${string}`,
    tokenVesting: locallyDeployedJson.default[
      "TestTokenVesting#MockTokenVesting"
    ] as `0x${string}`,
    tokenStaking: locallyDeployedJson.default[
      "TestTokenStaking#TokenStaking"
    ] as `0x${string}`,
    tokenMaster: locallyDeployedJson.default[
      "TestTokenMaster#TestTokenMaster"
    ] as `0x${string}`,
  };
};

export default async () => {
  switch (process.env.NODE_ENV) {
    case "test":
      const local = await fetchLocallyDeployedAddresses();
      return {
        finality: 5,
        rpcEndpoint: `http://127.0.0.1:8545`,
        gateway: "http://127.0.0.1:4350/graphql",
        realToken: {
          fromBlock: 0,
          address: local.token,
        },
        sRealToken: {
          fromBlock: 0,
          address: local.tokenStaking,
        },
      };
    default:
      return dev;
  }
};
