const routerAbi = [
  {
    inputs: [{ internalType: 'Currency', name: 'currency', type: 'address' }],
    name: 'DeltaNotNegative',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'commands',
        type: 'bytes',
      },
      {
        internalType: 'bytes[]',
        name: 'inputs',
        type: 'bytes[]',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export default routerAbi;
