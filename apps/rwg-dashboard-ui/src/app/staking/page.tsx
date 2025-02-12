'use client';

import { Card } from '@/components/ui/card';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useToken } from '@/hooks/useToken';
import { useStakingVault } from '@/hooks/useStakingVault';
import { formatBalance } from '@/utils';
import React, { useEffect, useState } from 'react';
import AnimatedNumber from '@/components/ui/animated-number';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StakeComponent from './components/stake-component';
import RewardComponent from './components/reward-component';
import { Info, PackagePlus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import RealIcon from '@/components/real-icon';

export default function Stake() {
  const token = useToken();
  const {
    deposits,
    stakedBalance,
    shareSymbol,
    currentEpoch,
    calculateRewards,
    claimAll,
    merkleProofs,
  } = useStakingVault();
  const { sdkHasLoaded, primaryWallet } = useDynamicContext();
  const [rewards, setRewards] = useState(0n);

  useEffect(() => {
    const calculate = async () => {
      if (!currentEpoch || !merkleProofs.data) {
        return 0n;
      }

      let rewards = 0n;
      const promises: Promise<bigint>[] = [];
      deposits.data?.forEach((deposit) => {
        const votedEpochs = merkleProofs.data
          .filter((proof) => proof.epoch > deposit.lastClaimEpoch)
          .map((proof) => BigInt(proof.epoch));

        promises.push(
          calculateRewards(BigInt(deposit.depositIndex), votedEpochs),
        );
      });

      const rewardsPerEpoch = await Promise.all(promises);

      rewardsPerEpoch.forEach((r) => {
        rewards += r;
      });

      setRewards(rewards);
    };
    void calculate();
  }, [
    primaryWallet,
    deposits.data,
    currentEpoch,
    calculateRewards,
    merkleProofs.data,
  ]);

  return (
    <div className="w-full p-6 md:p-5">
      <div className="w-full">
        <h2 className="text-heading mb-3">
          <PackagePlus className="mb-1 inline size-7 stroke-1" /> REAL Staking
          Dashboard
        </h2>
        <p className="leading-tight text-white/90">
          Stake REAL tokens, earn rewards, and participate in platform
          governance
        </p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 py-3 sm:gap-5 md:grid-cols-3 md:py-5">
        <Card className="flex flex-col justify-center gap-2 rounded-2xl border border-primary/15 px-3 py-4 md:gap-4 md:p-6">
          <h2 className="text-sm">{token.symbol} balance</h2>
          <p
            className={cn('flex items-center gap-3 text-xl', {
              'animate-pulse': !sdkHasLoaded || deposits.isLoading,
            })}
          >
            <RealIcon size="sm" className="ml-0 mt-0" />
            <span className="mb-1 text-3xl leading-none">
              <AnimatedNumber
                value={formatBalance(token.balance.data ?? 0n)}
                decimals={2}
              />
            </span>
          </p>
        </Card>
        <Card className="flex flex-col justify-center gap-2 rounded-2xl border border-primary/15 px-3 py-4 md:gap-4 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm">{shareSymbol} balance</h2>

            <Popover>
              <PopoverTrigger>
                <Info className="text-muted-foreground" strokeWidth={1} />
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="leading-tight">
                  The amount of {token.symbol} you have staked.
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p
            className={cn('flex items-center gap-3 text-xl', {
              'animate-pulse': !sdkHasLoaded || deposits.isLoading,
            })}
          >
            <RealIcon size="sm" className="ml-0 mt-0" />
            <span className="mb-1 text-3xl leading-none">
              <AnimatedNumber
                value={formatBalance(stakedBalance)}
                decimals={2}
              />
            </span>
          </p>
        </Card>
        <Card className="flex flex-col justify-center gap-2 rounded-2xl border border-primary/15 px-3 py-4 md:gap-4 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm">{token.symbol} rewards</h2>
            <Popover>
              <PopoverTrigger>
                <Info className="text-muted-foreground" strokeWidth={1} />
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="leading-tight">
                  The amount of {token.symbol} rewards that you can claim.
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p
            className={cn('flex items-center gap-3 text-xl', {
              'animate-pulse':
                !sdkHasLoaded || deposits.isLoading || merkleProofs.isLoading,
            })}
          >
            <RealIcon size="sm" className="ml-0 mt-0" />
            <span className="mb-1 text-3xl leading-none">
              <AnimatedNumber
                value={formatBalance(rewards ?? 0n)}
                decimals={2}
              />
            </span>
            <Button
              size="sm"
              onClick={() =>
                claimAll.mutateAsync(undefined, {
                  onSuccess: () => [token.balance.refetch()],
                })
              }
              disabled={rewards === 0n}
              loading={claimAll.isPending}
            >
              Claim
            </Button>
          </p>
        </Card>
      </div>

      <div className="mt-2 md:mt-0">
        <Tabs defaultValue="stake">
          <TabsList className="h-auto w-60 p-[5px]">
            <TabsTrigger
              value="stake"
              className="w-full py-[6px] text-sm font-normal"
            >
              Stake
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="w-full py-[6px] text-sm font-normal"
            >
              Rewards
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stake">
            <StakeComponent />
          </TabsContent>
          <TabsContent value="rewards">
            <RewardComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
