import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { readContract, waitForTransactionReceipt } from '@wagmi/core';
import config from '@/config/wagmi';
import { usePublicClient, useWriteContract } from 'wagmi';
import { useMemo } from 'react';
import { useToken } from './useToken';
import useNetworkId from './useNetworkId';
import usePrimaryAddress from './usePrimaryAddress';
import { tokenAbi, tokenStakingConfig } from '@/contracts/generated';
import { Address, erc20Abi, formatEther } from 'viem';
import assert from 'assert';
import { useAuthenticatedQuery } from './useAuthenticatedQuery';
import { getStakingMerkleProofs } from '@/server/actions/staking/getStakingMerkleProofs';
import { uniqBy } from 'lodash';
import { serverActionErrorGuard } from '@/lib/serverActionErrorGuard';
import { useNetworkGuard } from '@/providers/network-guard';
import useContractAddresses from './useContractAddresses';

export type Tier = {
  lockPeriod: bigint;
  multiplier: bigint;
};

export type TierWithDecimalMult = Tier & { decimalMult: number };

export const useStakingVault = () => {
  const addresses = useContractAddresses();
  const { isSuccess } = useNetworkId();
  const {
    queries: { balance },
  } = useToken();
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const primaryAddress = usePrimaryAddress();
  const networkGuard = useNetworkGuard();

  const tiers = useQuery({
    enabled: isSuccess,
    queryKey: ['tiers', addresses.data.tokenStaking],
    queryFn: async () => {
      const tiers = await readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'getTiers',
      });

      return tiers.map(
        (tier) =>
          ({
            ...tier,
            decimalMult: parseFloat(formatEther(tier.multiplier)),
          }) satisfies TierWithDecimalMult,
      );
    },
  });

  const deposits = useQuery({
    enabled: !!primaryWallet && isSuccess && !!tiers.data,
    queryKey: ['getDeposits', addresses.data.tokenStaking, primaryAddress],
    queryFn: async () => {
      assert(tiers.data, 'Tiers not loaded');

      const amounts = await readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'getUserStakes',
        args: [primaryAddress as `0x${string}`],
      });

      return amounts
        .slice()
        .map((deposit, idx) => ({
          ...deposit,
          depositIndex: idx,
          tier: tiers.data[deposit.tierIndex],
          unlockTime:
            deposit.startTime +
            Number(tiers.data[deposit.tierIndex]?.lockPeriod ?? 0n),
        }))
        .sort((a, b) => a.unlockTime - b.unlockTime);
    },
  });

  const totalStaked = useQuery({
    enabled: !!primaryWallet && isSuccess,
    queryKey: ['stakedBalance', addresses.data.tokenStaking, primaryAddress],
    queryFn: () => {
      return readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'balanceOf',
        args: [primaryWallet!.address as `0x${string}`],
      });
    },
  });

  const stakedBalance = useMemo(
    () => totalStaked.data ?? 0n,
    [totalStaked.data],
  );

  const isAdmin = useQuery({
    enabled: isSuccess && !!primaryAddress?.startsWith('0x'),
    queryKey: ['admin', addresses.data.tokenStaking, primaryAddress],
    queryFn: () => {
      return readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'hasRole',
        args: [
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          primaryWallet!.address as `0x${string}`,
        ],
      });
    },
  });

  const setTier = useMutation({
    mutationFn: async ({ tier, index }: { tier: Tier; index: number }) => {
      if (!primaryWallet) {
        throw new Error('Wallet required');
      }
      if (isAdmin.isLoading || isAdmin.data === false) {
        throw new Error('Not admin');
      }

      const tx = await writeContractAsync({
        address: addresses.data.tokenStaking,
        abi: tokenStakingConfig.abi,
        functionName: 'setTier',
        args: [BigInt(index), tier.lockPeriod, tier.multiplier],
      });

      await waitForTransactionReceipt(config, { hash: tx });
    },
    onSuccess: () => tiers.refetch(),
  });

  const unlockable = useMemo(
    () =>
      deposits.data
        ? deposits.data.reduce(
            (a, b) =>
              b.unlockTime - new Date().getTime() / 1000 <= 0
                ? a + b.amount
                : a,
            0n,
          )
        : undefined,
    [deposits.data],
  );

  const shares = useQuery({
    enabled: !!primaryWallet && isSuccess,
    queryKey: ['shares', addresses.data.tokenStaking, primaryAddress],
    queryFn: () => {
      return readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'getUserStakes',
        args: [primaryWallet!.address as `0x${string}`],
      });
    },
  });

  const epochDuration = useQuery({
    enabled: isSuccess,
    queryKey: ['epochDuration'],
    queryFn: () => {
      return readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'epochDuration',
      });
    },
  });

  const epochStartTime = useQuery({
    enabled: isSuccess,
    queryKey: ['epochStartTime'],
    queryFn: () => {
      return readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'epochStartTime',
      });
    },
  });

  const currentEpoch = useMemo(() => {
    if (!epochDuration.data || !epochStartTime.data) {
      return null;
    }

    const startTime = Number(epochStartTime.data);

    const epoch =
      Math.floor((Date.now() / 1000 - startTime) / Number(epochDuration.data)) +
      1;
    const endDate = epoch * Number(epochDuration.data) + startTime;

    return {
      epoch,
      endDate,
    };
  }, [epochDuration.data, epochStartTime.data]);

  const allowance = useQuery({
    enabled: !!primaryAddress && isSuccess,
    queryKey: ['allowance', addresses.data.tokenStaking, primaryAddress],
    queryFn: () => {
      return readContract(config, {
        abi: erc20Abi,
        address: addresses.data.token,
        functionName: 'allowance',
        args: [primaryAddress as `0x${string}`, addresses.data.tokenStaking],
      });
    },
  });

  const getRewardsForEpoch = (epoch: number) => {
    return readContract(config, {
      abi: tokenStakingConfig.abi,
      address: addresses.data.tokenStaking,
      functionName: 'getRewardsForEpoch',
      args: [BigInt(epoch)],
    });
  };

  const setRewardForEpoch = useMutation({
    mutationFn: ({ epoch, reward }: { epoch: number; reward: bigint }) => {
      return writeContractAsync({
        address: addresses.data.tokenStaking,
        abi: tokenStakingConfig.abi,
        functionName: 'setRewardForEpoch',
        args: [BigInt(epoch), reward],
      });
    },
  });

  const calculateRewards = (stakeIndex: bigint, epochs: bigint[]) => {
    return readContract(config, {
      abi: tokenStakingConfig.abi,
      address: addresses.data.tokenStaking,
      functionName: 'calculateRewardsWithVoting',
      args: [stakeIndex, epochs],
      account: primaryWallet!.address as `0x${string}`,
    });
  };

  const stake = useMutation({
    mutationFn: async ({
      beneficiary,
      amount,
      tier,
    }: {
      beneficiary: Address;
      amount: bigint;
      tier: number;
    }) => {
      await networkGuard();
      const tx = await writeContractAsync({
        address: addresses.data.tokenStaking,
        abi: tokenStakingConfig.abi,
        functionName: 'stake',
        args: [beneficiary, amount, tier],
      });

      await waitForTransactionReceipt(config, { hash: tx });
    },
    onSuccess: () =>
      Promise.all([
        deposits.refetch(),
        shares.refetch(),
        balance.refetch(),
        allowance.refetch(),
        totalStaked.refetch(),
      ]),
  });

  const increaseAllowance = useMutation({
    mutationFn: async (amount: bigint) => {
      await networkGuard();

      if (!primaryWallet) {
        setShowAuthFlow(true);
        return;
      }

      const tx = await writeContractAsync({
        address: addresses.data.token,
        abi: tokenAbi,
        functionName: 'approve',
        args: [addresses.data.tokenStaking, amount],
      });

      await waitForTransactionReceipt(config, { hash: tx, confirmations: 2 });
    },
    onSuccess: async () => allowance.refetch(),
  });

  const unstake = useMutation({
    mutationFn: async ({ stakeIndex }: { stakeIndex: bigint }) => {
      await networkGuard();

      if (!publicClient) {
        throw new Error('Public client not found');
      }

      if (!primaryWallet) {
        throw new Error('Wallet required');
      }

      const { request } = await publicClient.simulateContract({
        address: addresses.data.tokenStaking,
        abi: tokenStakingConfig.abi,
        functionName: 'unstake',
        args: [stakeIndex],
        account: primaryWallet.address as `0x${string}`,
      });

      const tx = await writeContractAsync(request);

      await waitForTransactionReceipt(config, { hash: tx });
    },
    onSuccess: () =>
      Promise.all([
        deposits.refetch(),
        shares.refetch(),
        balance.refetch(),
        totalStaked.refetch(),
      ]),
  });

  const claimRewards = useMutation({
    mutationFn: async ({
      stakeIndex,
      epochs,
      merkleProofs,
      unstake,
    }: {
      stakeIndex: bigint;
      epochs: number[];
      merkleProofs: `0x${string}`[][];
      unstake: boolean;
    }) => {
      await networkGuard();

      if (!publicClient) {
        throw new Error('Public client not found');
      }

      if (!primaryWallet) {
        throw new Error('Wallet required');
      }

      const { request } = await publicClient.simulateContract({
        address: addresses.data.tokenStaking,
        abi: tokenStakingConfig.abi,
        functionName: 'claimRewards',
        args: [stakeIndex, epochs, merkleProofs, unstake],
        account: primaryWallet.address as `0x${string}`,
      });

      const tx = await writeContractAsync(request);

      await waitForTransactionReceipt(config, { hash: tx });
    },
  });

  const lastEpochRewards = useQuery({
    queryKey: ['getLastEpochRewards', currentEpoch?.epoch],
    queryFn: async () => {
      const epoch = currentEpoch?.epoch ?? 0;
      const rewardEpoch = epoch > 0 ? epoch - 1 : 0;

      // Get total effective supply for the epoch
      const totalEffectiveSupply = await readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'getTotalEffectiveSupplyAtEpoch',
        args: [BigInt(rewardEpoch)],
      });

      const rewards = await readContract(config, {
        abi: tokenStakingConfig.abi,
        address: addresses.data.tokenStaking,
        functionName: 'getRewardsForEpoch',
        args: [BigInt(epoch)],
      });

      return {
        totalEffectiveSupply,
        rewards,
      };
    },
  });

  const minLastClaimEpoch = useMemo(() => {
    if (!deposits?.data || deposits.data.length === 0 || !deposits.data[0]) {
      return 0;
    }

    return deposits.data.reduce(
      (min, deposit) => Math.min(min, deposit.lastClaimEpoch),
      deposits.data[0].lastClaimEpoch,
    );
  }, [deposits.data]);

  const merkleProofs = useAuthenticatedQuery({
    queryKey: ['merkleProofs', minLastClaimEpoch],
    queryFn: async (token) => {
      const proofs = await serverActionErrorGuard(
        getStakingMerkleProofs(token, minLastClaimEpoch),
      );
      // Make sure we only have 1 proof per epoch.
      // Proofs are duplicated in case of a single voter in an epoch.
      return uniqBy(proofs, 'epoch');
    },
  });

  const claim = useMutation({
    mutationFn: async ({
      stakeIndex,
      unstake,
    }: {
      stakeIndex: bigint;
      unstake: boolean;
    }) => {
      await networkGuard();

      if (!merkleProofs.data) {
        return;
      }
      if (!currentEpoch) {
        return;
      }

      const deposit = deposits.data?.find(
        (d) => d.depositIndex === Number(stakeIndex),
      );

      if (!deposit) {
        throw new Error('Deposit not found');
      }

      if (deposit.lastClaimEpoch === currentEpoch.epoch - 1) {
        return;
      }

      const votedProofs = merkleProofs.data.filter(
        (proof) => proof.epoch > deposit.lastClaimEpoch,
      );
      const epochs = new Array(currentEpoch.epoch - 1 - deposit.lastClaimEpoch)
        .fill(0)
        .map((_, i) => i + deposit.lastClaimEpoch + 1);

      const proofs = epochs.map((epoch) => {
        const proof = votedProofs.find((p) => p.epoch === epoch);
        if (!proof) {
          return [];
        }

        return proof.proof.split(',') as `0x${string}`[];
      });

      return claimRewards.mutateAsync({
        stakeIndex: BigInt(deposit.depositIndex),
        epochs,
        merkleProofs: proofs,
        unstake,
      });
    },
    onSuccess: () =>
      Promise.all([
        deposits.refetch(),
        shares.refetch(),
        balance.refetch(),
        totalStaked.refetch(),
      ]),
  });

  /**
   * Claim all rewards, for all stakes
   */
  const claimAll = useMutation({
    mutationFn: async () => {
      await networkGuard();

      if (!merkleProofs.data) {
        return;
      }
      if (!currentEpoch) {
        return;
      }

      const promises: Promise<void>[] = [];

      deposits.data?.forEach((deposit) => {
        if (deposit.lastClaimEpoch === currentEpoch.epoch - 1) {
          return;
        }

        // Get proofs that we care about
        const votedProofs = merkleProofs.data.filter(
          (proof) => proof.epoch > deposit.lastClaimEpoch,
        );
        // We must claim rewards for all epochs since the last claim
        const epochs = new Array(
          currentEpoch.epoch - 1 - deposit.lastClaimEpoch,
        )
          .fill(0)
          .map((_, i) => i + deposit.lastClaimEpoch + 1);

        // Each epoch must have a proof, even if it's empty (not voted)
        const proofs = epochs.map((epoch) => {
          const proof = votedProofs.find((p) => p.epoch === epoch);
          if (!proof) {
            return [];
          }

          return proof.proof.split(',') as `0x${string}`[];
        });

        promises.push(
          claimRewards.mutateAsync({
            stakeIndex: BigInt(deposit.depositIndex),
            epochs,
            merkleProofs: proofs,
            unstake: false,
          }),
        );
      });

      await Promise.all(promises);
    },
    onSuccess: () =>
      Promise.all([
        deposits.refetch(),
        shares.refetch(),
        balance.refetch(),
        totalStaked.refetch(),
      ]),
  });

  return {
    errors: [
      shares.error,
      allowance.error,
      deposits.error,
      increaseAllowance.error,
    ].filter((e) => !!e),
    shares,
    allowance,
    isAdmin,
    deposits,
    stakedBalance,
    unlockable: unlockable ?? 0n,
    setTier,
    tiers,
    stake,
    unstake,
    increaseAllowance,
    currentEpoch,
    epochDuration,
    getRewardsForEpoch,
    setRewardForEpoch,
    calculateRewards,
    claimRewards,
    lastEpochRewards,
    merkleProofs,
    totalStaked,
    claim,
    claimAll,
    shareSymbol: 'sREAL',
  };
};
