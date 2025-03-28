import {
  permit2Abi,
  permit2Config,
  uniswapV4QuoterAbi,
  uniswapV4QuoterConfig,
  uniswapV4RouterAbi,
  uniswapV4RouterConfig,
} from '@/contracts/generated';
import { isDev } from '@/env';
import { Actions, Commands, DYNAMIC_FEE } from '@/utils/uniswap';
import { getPermitData } from '@/utils/uniswap/permit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import {
  encodeAbiParameters,
  encodePacked,
  erc20Abi,
  formatEther,
  maxUint256,
  parseAbiParameters,
  parseEther,
  zeroAddress,
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import {
  useGasPrice,
  usePublicClient,
  useReadContract,
  useSignTypedData,
  useSimulateContract,
  useWriteContract,
} from 'wagmi';
import { z } from 'zod';
import usePrimaryAddress from './usePrimaryAddress';
import { formatBalanceTruncated } from '@/utils';
import useContractAddresses from './useContractAddresses';

const EthQuoteSchema = z.object({
  price: z.number(),
});

const chainId = isDev ? sepolia.id : mainnet.id;
const quoterAddress = uniswapV4QuoterConfig.address[chainId];
const routerAddress = uniswapV4RouterConfig.address[chainId];
const permit2Address = permit2Config.address[chainId];

const tickSpacing = 60;

const assets = [
  {
    idx: 0,
    label: 'ETH',
  },
  {
    idx: 1,
    label: '$REAL',
  },
] as const;

type AssetAmounts = [amount0: string, amount1: string];

export type SwapResult = {
  amountOut: bigint;
  label: string;
};

const useUniswap = () => {
  const publicClient = usePublicClient();
  const contractAddresses = useContractAddresses();
  const { writeContractAsync } = useWriteContract();
  const { signTypedDataAsync } = useSignTypedData();
  const primaryAddress = usePrimaryAddress();
  const gasPrice = useGasPrice();

  const [flipAssets, setFlipAssets] = useState(false);
  const [flipTimestamp, setFlipTimestamp] = useState(0);
  const [amounts, setAmounts] = useState<AssetAmounts>(['0', '0']);
  const [selectedAsset, setSelectedAsset] = useState(0);
  const [slippage, setSlippage] = useState('0.5');
  const [txDeadlineMins, setTxDeadlineMins] = useState('30');

  const [result, setResult] = useState<SwapResult | null>(null);

  const sortedAssets = useMemo(() => {
    const a = flipAssets ? [...assets].reverse() : assets;
    return a.map((asset) => ({
      ...asset,
      amount: amounts[asset.idx],
    }));
  }, [flipAssets, amounts]);

  const setAmount = (index: number, amount: string) => {
    setResult(null);
    setFlipTimestamp(Date.now());
    setAmounts((amounts) => {
      const vals = [...amounts] as AssetAmounts;
      vals[index] = amount;
      return vals;
    });

    setSelectedAsset(index);
  };

  const ethQuote = useQuery({
    queryKey: ['eth-quote'],
    queryFn: async (): Promise<number> => {
      const response = await fetch('/api/eth-price');
      const data = EthQuoteSchema.parse(await response.json());
      return data.price;
    },
  });

  const tokenEthPrice = useQuery({
    queryKey: ['token-eth-price', publicClient],
    queryFn: async (): Promise<{
      amountIn: bigint;
      gasEstimate: bigint;
    } | null> => {
      if (!publicClient) {
        return null;
      }

      const response = await publicClient.simulateContract({
        abi: uniswapV4QuoterAbi,
        address: quoterAddress,
        functionName: 'quoteExactOutputSingle',
        args: [
          {
            poolKey: {
              currency0: zeroAddress,
              currency1: contractAddresses.data.token,
              fee: 0x800000,
              tickSpacing,
              hooks: contractAddresses.data.uniswapPoolHook,
            },
            zeroForOne: true,
            exactAmount: parseEther('1'),
            hookData: '0x',
          },
        ],
      });

      const [amountIn, gasEstimate] = response.result;

      return { amountIn, gasEstimate };
    },
  });

  const tokenPrice = useMemo(() => {
    if (!ethQuote.data || !tokenEthPrice.data) {
      return 0;
    }

    return ethQuote.data * Number(formatEther(tokenEthPrice.data.amountIn));
  }, [ethQuote.data, tokenEthPrice.data]);

  const tokenAllowance = useReadContract({
    abi: erc20Abi,
    address: contractAddresses.data.token,
    functionName: 'allowance',
    args: [primaryAddress as `0x${string}`, permit2Address],
  });

  const permit2Allowance = useReadContract({
    abi: permit2Abi,
    address: permit2Address,
    functionName: 'allowance',
    args: [
      primaryAddress as `0x${string}`,
      contractAddresses.data.token,
      routerAddress,
    ],
  });

  const etherAmount = useMemo(() => {
    const amount = sortedAssets.find((x) => x.idx === selectedAsset)!.amount;
    if (!amount) {
      return 0n;
    }

    try {
      const etherAmount = parseEther(amount);
      return etherAmount;
    } catch {
      return 0n;
    }
  }, [sortedAssets, selectedAsset]);

  const usdAmount = useMemo(() => {
    if (!ethQuote.data || etherAmount === 0n) {
      return 0;
    }

    const assetZeroAmount = parseFloat(
      sortedAssets.find((x) => x.idx === 0)!.amount ?? '0',
    );

    return ethQuote.data * assetZeroAmount;
  }, [ethQuote.data, etherAmount, sortedAssets]);

  const swapQuoteResult = useSimulateContract({
    query: {
      enabled: etherAmount > 0n,
    },
    abi: uniswapV4QuoterAbi,
    address: quoterAddress,
    functionName:
      selectedAsset === sortedAssets[0]!.idx
        ? 'quoteExactInputSingle'
        : 'quoteExactOutputSingle',
    args: [
      {
        poolKey: {
          currency0: zeroAddress,
          currency1: contractAddresses.data.token,
          fee: DYNAMIC_FEE,
          tickSpacing,
          hooks: contractAddresses.data.uniswapPoolHook,
        },
        zeroForOne: !flipAssets,
        exactAmount: etherAmount,
        hookData: '0x',
      },
    ],
  });

  const flip = async () => {
    setFlipTimestamp(Date.now());
    setFlipAssets((flipAssets) => !flipAssets);
  };

  const reset = () => {
    setAmounts(['0', '0']);
  };

  const swap = useMutation({
    mutationFn: async () => {
      if (
        !publicClient ||
        !swapQuoteResult.data ||
        tokenAllowance.data === undefined
      ) {
        return;
      }

      // Check Permit2 allowance
      if (tokenAllowance.data < etherAmount) {
        const approval = await writeContractAsync({
          address: contractAddresses.data.token,
          abi: erc20Abi,
          functionName: 'approve',
          args: [permit2Address, maxUint256],
        });

        await publicClient.waitForTransactionReceipt({ hash: approval });
      }

      const deadline = BigInt(
        Math.floor(Date.now() / 1000) + parseInt(txDeadlineMins) * 60,
      );

      const [, , allowanceNonce] = permit2Allowance.data ?? [0n, 0, 0];

      const permitSingle = {
        details: {
          token: contractAddresses.data.token,
          amount: etherAmount,
          expiration: Number(deadline),
          nonce: allowanceNonce,
        },
        spender: routerAddress,
        sigDeadline: deadline,
      } as const;

      const { domain, types, values } = getPermitData(
        permitSingle,
        permit2Address,
        chainId,
      );

      const signedPermit = await signTypedDataAsync({
        domain,
        types,
        message: values,
        primaryType: 'PermitSingle',
      });

      const selectedSellAsset = selectedAsset === sortedAssets[0]!.idx;

      const swapAction = selectedSellAsset
        ? Actions.SWAP_EXACT_IN_SINGLE
        : Actions.SWAP_EXACT_OUT_SINGLE;

      const commands = encodePacked(
        ['uint8', 'uint8'],
        [Commands.PERMIT2_PERMIT, Commands.V4_SWAP],
      );

      const actions = encodePacked(
        ['uint8', 'uint8', 'uint8'],
        [swapAction, Actions.SETTLE_ALL, Actions.TAKE_ALL],
      );

      const poolKey = {
        currency0: zeroAddress,
        currency1: contractAddresses.data.token,
        fee: DYNAMIC_FEE,
        tickSpacing,
        hooks: contractAddresses.data.uniswapPoolHook,
      } as const;

      const amountOut = swapQuote.amountOut;

      // Min amount is based on slippage pct of quoted swapAmount.
      const bnSlippage = BigInt(parseFloat(slippage) * 100);
      const minAmountOut = BigInt((amountOut * bnSlippage) / 10000n);
      const maxAmountIn = BigInt((amountOut * (10000n + bnSlippage)) / 10000n);
      const minOrMax = selectedSellAsset ? minAmountOut : maxAmountIn;

      // If we're dealing with ETH, we don't want to send too much...
      const minOrMaxEth =
        swapAction === Actions.SWAP_EXACT_IN_SINGLE ? minAmountOut : amountOut;

      const params = [
        // params[0]: ExactInputSingleParams
        encodeAbiParameters(
          [
            {
              name: 'params',
              type: 'tuple',
              components: [
                {
                  name: 'poolKey',
                  type: 'tuple',
                  components: [
                    { name: 'currency0', type: 'address' },
                    { name: 'currency1', type: 'address' },
                    { name: 'fee', type: 'uint24' },
                    { name: 'tickSpacing', type: 'int24' },
                    { name: 'hooks', type: 'address' },
                  ],
                },
                { name: 'zeroForOne', type: 'bool' },
                { name: 'amountIn', type: 'uint128' },
                { name: 'amountOutMinimum', type: 'uint128' },
                { name: 'hookData', type: 'bytes' },
              ],
            },
          ],
          [
            {
              poolKey: {
                currency0: zeroAddress,
                currency1: contractAddresses.data.token,
                fee: DYNAMIC_FEE,
                tickSpacing,
                hooks: contractAddresses.data.uniswapPoolHook,
              },
              zeroForOne: !flipAssets,
              amountIn: etherAmount,
              amountOutMinimum: minOrMax,
              hookData: '0x', // empty bytes for hookData
            },
          ],
        ),

        // params[1]
        encodeAbiParameters(
          [
            { name: 'currency', type: 'address' },
            { name: 'amount', type: 'uint128' },
          ],
          [
            !flipAssets ? poolKey.currency0 : poolKey.currency1,
            selectedSellAsset ? etherAmount : minOrMax,
          ],
        ),

        // params[2]
        encodeAbiParameters(
          [
            { name: 'currency', type: 'address' },
            { name: 'amount', type: 'uint128' },
          ],
          [
            !flipAssets ? poolKey.currency1 : poolKey.currency0,
            selectedSellAsset ? minOrMax : etherAmount,
          ],
        ),
      ];

      const permit2Inputs = encodeAbiParameters(
        [
          {
            name: 'data',
            type: 'tuple',
            components: [
              {
                name: 'details',
                type: 'tuple',
                components: [
                  { name: 'token', type: 'address' },
                  { name: 'amount', type: 'uint160' },
                  { name: 'expiration', type: 'uint48' },
                  { name: 'nonce', type: 'uint48' },
                ],
              },
              { name: 'spender', type: 'address' },
              { name: 'sigDeadline', type: 'uint256' },
            ],
          },
          {
            name: 'sig',
            type: 'bytes',
          },
        ],
        [permitSingle, signedPermit],
      );

      // Combine actions and params into inputs using encodeAbiParameters
      const swapInputs = encodeAbiParameters(
        parseAbiParameters('bytes, bytes[]'),
        [actions, params],
      );

      const value = selectedAsset === 0 ? etherAmount : minOrMaxEth;

      const swapParams = {
        address: routerAddress,
        abi: uniswapV4RouterAbi,
        functionName: 'execute',
        args: [commands, [permit2Inputs, swapInputs], deadline],
        value: !flipAssets ? value : 0n,
        account: primaryAddress,
      } as const;

      const { request } = await publicClient.simulateContract(swapParams);

      const tx = await writeContractAsync(request);

      await publicClient.waitForTransactionReceipt({ hash: tx });

      setResult({
        amountOut: swapQuote.amountOut,
        label: outCurrency,
      });

      reset();
    },
    onSuccess: () =>
      Promise.all([
        reset,
        tokenAllowance.refetch(),
        permit2Allowance.refetch(),
      ]),
  });

  useEffect(() => {
    if (swapQuoteResult.isError || !swapQuoteResult.data) {
      return;
    }

    if (swapQuoteResult.dataUpdatedAt < flipTimestamp) {
      return;
    }

    const [amountOut] = swapQuoteResult.data.result;

    setAmounts((amounts) => {
      const vals = [...amounts] as AssetAmounts;
      vals[selectedAsset ^ 1] = formatBalanceTruncated(amountOut);
      return vals;
    });
  }, [
    swapQuoteResult.data,
    swapQuoteResult.isError,
    swapQuoteResult.dataUpdatedAt,
    selectedAsset,
    flipTimestamp,
  ]);

  const outCurrency = useMemo(() => {
    const asset = assets.find((asset) => asset.idx !== selectedAsset);
    return asset?.label ?? assets[0].label;
  }, [selectedAsset]);

  const swapQuote = useMemo(() => {
    if (!swapQuoteResult.data) {
      return {
        amountOut: 0n,
        gasEstimate: 0n,
      };
    }

    const [amountOut, gasEstimate] = swapQuoteResult.data.result;
    return {
      amountOut,
      gasEstimate,
    };
  }, [swapQuoteResult.data]);

  const swapGasEstimate = useMemo(() => {
    if (!gasPrice.data || !ethQuote.data || swapQuote.gasEstimate === 0n) {
      return 0;
    }

    const weiCost = swapQuote.gasEstimate * gasPrice.data;
    const ethAmount = Number(weiCost / BigInt(10e6)) / 1e12;

    return ethAmount * ethQuote.data;
  }, [swapQuote.gasEstimate, gasPrice.data, ethQuote.data]);

  return {
    setAmount,
    tokenPrice,
    usdAmount,
    sortedAssets,
    selectedAsset,
    flip,
    swap,
    swapQuoteResult,
    swapGasEstimate,
    slippage,
    setSlippage,
    txDeadlineMins,
    setTxDeadlineMins,
    result,
  };
};

export default useUniswap;
