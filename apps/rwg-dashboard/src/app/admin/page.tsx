'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@bltzr-gg/ui';
import { type Tier, useStakingVault } from '@/hooks/useStakingVault';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Loading from '@/components/loading';
import youGotMe from '@/assets/images/you-got-me.webp';
import Link from 'next/link';
import { parseEther } from 'viem';
import { useVesting } from '@/hooks/useVesting';
import { CheckCircle2, Loader2, XCircleIcon } from 'lucide-react';
import type { UseQueryResult } from '@tanstack/react-query';
import { CreateVestingSchedule } from './components/create-vesting-schedule';
import { VestingScheduleList } from './components/vesting-schedule-list';
import { ImportVestingSchedules } from './components/import-vesting-schedules';

const PermissionIcon = ({
  queryResult,
}: {
  queryResult: UseQueryResult<boolean, Error>;
}) => {
  if (queryResult.isLoading) {
    return <Loader2 className="inline animate-spin" />;
  }

  if (queryResult.data) {
    return (
      <CheckCircle2 className="ml-2 inline size-4 fill-green-500 stroke-black" />
    );
  }

  return (
    <XCircleIcon className="ml-2 inline size-4 fill-red-500 stroke-black" />
  );
};

const TierRow = ({ tier, index }: { tier: Tier; index: number }) => {
  const vault = useStakingVault();
  const [lockup, setLockup] = useState(Number(tier.lockPeriod));
  const handleLockupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLockup(parseFloat(e.target.value));
  };
  const [mult, setMult] = useState(Number(tier.multiplier));
  const handleMultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMult(parseInt(e.target.value));
  };

  return (
    <React.Fragment key={index}>
      <Input
        type="number"
        value={lockup.toString()}
        onChange={handleLockupChange}
        className="w-full"
      />
      <Input
        type="number"
        value={mult}
        onChange={handleMultChange}
        className="w-full"
      />
      <Button
        type="submit"
        onClick={() =>
          vault.setTier.mutateAsync({
            tier: {
              lockPeriod: BigInt(lockup),
              multiplier: BigInt(mult),
            },
            index,
          })
        }
        loading={vault.setTier.isPending}
      >
        Set
      </Button>
    </React.Fragment>
  );
};

const AdminPage: React.FC = () => {
  const [epoch, setEpoch] = useState(0);
  const [reward, setReward] = useState('');

  const { sdkHasLoaded } = useDynamicContext();
  const vault = useStakingVault();
  const vesting = useVesting();

  if (!sdkHasLoaded || !vault.isAdmin.isSuccess || !vesting.isAdmin.isSuccess) {
    return <Loading />;
  }

  if (!vault.isAdmin.data && !vesting.isAdmin.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 p-5">
        <img className="w-[480px]" src={youGotMe.src} alt="You got me" />
        <div className="flex gap-x-3">
          <Button asChild className="mt-5">
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1"
            >
              Ask to put the bitcoin in a bag
            </Link>
          </Button>
          <Button variant="outline" asChild className="mt-5">
            <Link href="/">Back away slowly, confused at how you got here</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5">
      <h1 className="text-3xl font-semibold">Admin</h1>
      <Tabs defaultValue="staking" className="mt-5">
        <div className="max-w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="staking">
              Staking <PermissionIcon queryResult={vault.isAdmin} />
            </TabsTrigger>
            <TabsTrigger value="vesting">
              Vesting <PermissionIcon queryResult={vesting.isAdmin} />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="staking">
          <h3 className="text-xl">Tiers</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>Lockup time</div>
            <div>Multiplier</div>
            <div></div>
            {vault.tiers.data?.map((tier, index) => (
              <TierRow key={index} tier={tier} index={index} />
            ))}
          </div>
          <h2 className="text-2xl">
            Set reward for epoch
            <PermissionIcon queryResult={vault.isAdmin} />
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <div>Epoch</div>
            <div>Reward (in ether REAL)</div>
            <div></div>
            <div>
              <Input
                type="number"
                value={epoch}
                onChange={(e) => {
                  setEpoch(parseInt(e.target.value));
                }}
                className="w-full"
              />
            </div>
            <div>
              <Input
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Button
                onClick={() =>
                  vault.setRewardForEpoch.mutateAsync(
                    {
                      epoch,
                      reward: parseEther(reward),
                    },
                    {
                      onSuccess: () => {
                        setReward('');
                        setEpoch(0);
                      },
                    },
                  )
                }
                loading={vault.setRewardForEpoch.isPending}
              >
                Set
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="vesting">
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            <div>
              <ImportVestingSchedules />
              <CreateVestingSchedule />
            </div>
            <div className="col-span-2">
              <VestingScheduleList />
            </div>
            <div></div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
