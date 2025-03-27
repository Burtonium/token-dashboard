const quoterAbi = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'Currency',
                name: 'currency0',
                type: 'address',
              },
              {
                internalType: 'Currency',
                name: 'currency1',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'fee',
                type: 'uint24',
              },
              {
                internalType: 'int24',
                name: 'tickSpacing',
                type: 'int24',
              },
              {
                internalType: 'contract IHooks',
                name: 'hooks',
                type: 'address',
              },
            ],
            internalType: 'struct PoolKey',
            name: 'poolKey',
            type: 'tuple',
          },
          {
            internalType: 'bool',
            name: 'zeroForOne',
            type: 'bool',
          },
          {
            internalType: 'uint128',
            name: 'exactAmount',
            type: 'uint128',
          },
          {
            internalType: 'bytes',
            name: 'hookData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IV4Quoter.QuoteExactSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'Currency',
                name: 'currency0',
                type: 'address',
              },
              {
                internalType: 'Currency',
                name: 'currency1',
                type: 'address',
              },
              {
                internalType: 'uint24',
                name: 'fee',
                type: 'uint24',
              },
              {
                internalType: 'int24',
                name: 'tickSpacing',
                type: 'int24',
              },
              {
                internalType: 'contract IHooks',
                name: 'hooks',
                type: 'address',
              },
            ],
            internalType: 'struct PoolKey',
            name: 'poolKey',
            type: 'tuple',
          },
          {
            internalType: 'bool',
            name: 'zeroForOne',
            type: 'bool',
          },
          {
            internalType: 'uint128',
            name: 'exactAmount',
            type: 'uint128',
          },
          {
            internalType: 'bytes',
            name: 'hookData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IV4Quoter.QuoteExactSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'gasEstimate',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export default quoterAbi;
