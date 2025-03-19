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

export default async () => {
  switch (process.env.NODE_ENV) {
    default:
      return dev;
  }
};
