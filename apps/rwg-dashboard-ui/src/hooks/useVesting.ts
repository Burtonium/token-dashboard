import { useMutation, useQuery } from '@tanstack/react-query';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { multicall, readContract } from '@wagmi/core';
import config from '@/config/wagmi';
import { useMemo } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { tokenVestingAbi, tokenVestingConfig } from '@/contracts/generated';
import assert from 'assert';
import useNetworkId from './useNetworkId';
import { encodePacked, keccak256 } from 'viem';
import { hashFn } from '@wagmi/core/query';
import { useToken } from './useToken';

export const useVesting = () => {
  const token = useToken();
  const { primaryWallet } = useDynamicContext();
  const { writeContractAsync } = useWriteContract();
  const { data: networkId } = useNetworkId();

  const vestingContractAddress = useMemo(() => {
    if (!networkId) {
      return undefined;
    }
    return tokenVestingConfig.address[
      networkId as keyof typeof tokenVestingConfig.address
    ];
  }, [networkId]);

  const vestingSchedulesCount = useQuery({
    queryKey: [
      'vestingSchedulesCount',
      vestingContractAddress,
      primaryWallet?.address,
    ],
    enabled: !!primaryWallet && !!vestingContractAddress,
    queryFn: async () => {
      assert(primaryWallet, 'Wallet required');
      assert(vestingContractAddress, 'Vesting contract address required');

      const count = await readContract(config, {
        abi: tokenVestingAbi,
        address: vestingContractAddress,
        functionName: 'getVestingSchedulesCountByBeneficiary',
        args: [primaryWallet.address as `0x${string}`],
      });

      return Number(count);
    },
  });

  const vestingSchedules = useQuery({
    queryKey: [
      'vestingSchedules',
      vestingContractAddress,
      primaryWallet?.address,
      vestingSchedulesCount.data,
    ],
    enabled:
      !!primaryWallet &&
      !!vestingContractAddress &&
      !!vestingSchedulesCount.data,
    queryFn: async () => {
      assert(vestingContractAddress, 'Vesting contract required');
      assert(primaryWallet?.address, 'Wallet required');

      const count = vestingSchedulesCount.data!;
      const contracts = Array.from({ length: count }).map(
        (_, index: number) =>
          ({
            address: vestingContractAddress,
            abi: tokenVestingConfig.abi,
            functionName: 'getVestingScheduleByAddressAndIndex',
            args: [primaryWallet.address, index],
          }) as const,
      );

      const schedules = await multicall(config, {
        contracts,
        allowFailure: false,
      });

      return schedules;
    },
  });

  const releasableAmounts = useQuery({
    queryKey: [
      'vestingReleasableAmounts',
      vestingContractAddress,
      vestingSchedulesCount.data,
    ],
    enabled: !!vestingContractAddress && !!vestingSchedulesCount.data,
    refetchInterval: 60_000,
    queryFn: async () => {
      assert(primaryWallet?.address, 'Wallet required');
      assert(vestingContractAddress, 'Vesting contract required');
      assert(tokenVestingConfig.abi, 'Vesting contract ABI required');

      const vestingScheduleIds = Array.from(
        { length: vestingSchedulesCount.data! },
        (_, index) =>
          keccak256(
            encodePacked(
              ['address', 'uint256'],
              [primaryWallet.address as `0x${string}`, BigInt(index)],
            ),
          ),
      );

      const contracts = vestingScheduleIds.map(
        (scheduleId) =>
          ({
            address: vestingContractAddress,
            abi: tokenVestingConfig.abi,
            functionName: 'computeReleasableAmount',
            args: [scheduleId],
          }) as const,
      );

      const amounts = await multicall(config, {
        contracts,
        allowFailure: true,
      });

      const amountsWithIds = vestingScheduleIds.map((id, index) => ({
        id,
        amount: amounts?.[index]?.result ?? 0n,
      }));

      return amountsWithIds;
    },
  });

  const vestingSchedulesWithAmounts = useQuery({
    queryKey: [
      'vestingSchedulesWithAmounts',
      vestingSchedules.data,
      releasableAmounts.data,
    ],
    queryKeyHashFn: hashFn,
    enabled: !!vestingSchedules.data && !!releasableAmounts.data,
    refetchInterval: 60_000,
    queryFn: async () => {
      assert(vestingSchedules.data, 'Vesting schedule data required');
      assert(releasableAmounts.data, 'Releasable amounts required');
      return vestingSchedules.data.map((schedule, index) => {
        return {
          ...schedule,
          id: releasableAmounts.data?.[index]?.id,
          releasableAmount: releasableAmounts.data?.[index]?.amount ?? 0n,
          remaining: Math.max(
            Number(schedule.start + schedule.duration) - Date.now() / 1000,
            0,
          ),
          vestedPercentage:
            Math.min(
              (Date.now() / 1000 - Number(schedule.start)) /
                Number(schedule.duration),
              1,
            ) * 100,
        };
      });
    },
  });

  const withdrawableAmount = useMemo(
    () => releasableAmounts.data?.reduce((a, b) => a + b.amount, 0n) ?? 0n,
    [releasableAmounts.data],
  );

  const vestingAmount = useQuery({
    queryKey: ['vestingAmount'],
    enabled: !!vestingSchedules.data && !!releasableAmounts.data,
    queryFn: async () => {
      assert(vestingSchedules.data, 'Vesting schedule data required');

      const [totalAmount, releasedAmount] = vestingSchedules.data.reduce(
        ([accTotal, accReleased], { amountTotal, released }) => [
          accTotal + amountTotal,
          accReleased + released,
        ],
        [0n, 0n],
      );

      return totalAmount - withdrawableAmount - releasedAmount;
    },
  });

  const release = useMutation({
    mutationFn: async ({
      amount,
      vestingScheduleId,
    }: {
      amount: bigint;
      vestingScheduleId: `0x${string}`;
    }) => {
      if (!vestingContractAddress) {
        throw new Error('Vesting contract required');
      }

      const tx = await writeContractAsync({
        address: vestingContractAddress,
        abi: tokenVestingConfig.abi,
        functionName: 'release',
        args: [vestingScheduleId, amount],
      });

      await waitForTransactionReceipt(config, { hash: tx });
    },
    onSuccess: () => [
      token.balance.refetch(),
      vestingSchedules.refetch(),
      releasableAmounts.refetch(),
      vestingSchedulesWithAmounts.refetch(),
    ],
  });

  return {
    vestingSchedulesCount: vestingSchedulesCount.data ?? 0n,
    releasableAmounts,
    vestingAmount,
    withdrawableAmount,
    vestingSchedules: vestingSchedules.data ?? [],
    vestingSchedulesWithAmounts,
    release,
  };
};
