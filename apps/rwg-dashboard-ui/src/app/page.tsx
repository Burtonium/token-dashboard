'use client';

import Banner from '@/components/banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useToken } from '@/hooks/useToken';
import { Button } from '@/components/ui/button';
import { formatBalance } from '@/utils';
import { useStakingVault } from '@/hooks/useStakingVault';
import RealIcon from '@/components/real-icon';
import RealbetProgressionWidget from '@/components/realbet-progression-widget';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import StakingTiers from '@/components/modals/RealTokenTiers';
import { useRealbetProgression } from '@/hooks/useRealbetProgression';
import { Progress } from '@/components/ui/progress';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import QuestTrack from '@/components/quest-track';

export default function HomePage() {
  const token = useToken();
  const vault = useStakingVault();
  const progression = useRealbetProgression();
  const loggedIn = useIsLoggedIn();
  const casinoLink = useCasinoLink();

  return (
    <main className="relative space-y-5 p-5">
      <Banner>
        <div className="flex flex-col">
          <h2 className="font-tusker text-6xl font-semibold uppercase leading-none md:max-w-[66%]">
            Welcome to the Real World
          </h2>
          <div className="max-w-1/3 mt-6 font-sans text-base md:max-w-[66%]">
            Boost your rakeback and cashback rewards by owning and staking{' '}
            {token.symbol}
          </div>
          <div className="mt-6 flex flex-wrap gap-5">
            <Button
              asChild
              variant="default"
              size="lg"
              className="px-3 text-sm md:px-5"
            >
              <Link href={'/link-realbet'}>Get {token.symbol} Rewards</Link>
            </Button>
            <Button asChild variant="neutral" size="lg">
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href={
                  'https://realworldgaming.gitbook.io/the-real-paper/usdreal-token'
                }
                className="px-3 text-sm md:px-5"
              >
                Why {token.symbol}
              </Link>
            </Button>
          </div>
        </div>
      </Banner>
      <Card className="border border-primary/20">
        <CardHeader>
          <CardTitle>{token.symbol} Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex-col flex-wrap items-center gap-12 space-y-3 pb-3 md:flex md:flex-row md:space-y-0">
            <div className="space-y-3 font-medium">
              <h3 className="mb-2 text-sm">Available</h3>
              <div className="text-3xl font-medium text-primary">
                {token.isLoading ? (
                  <Skeleton className="inline-block h-6 w-24 rounded-full" />
                ) : (
                  <>
                    {formatBalance(token.balance.data ?? 0n)}
                    <RealIcon />
                  </>
                )}
              </div>
            </div>
            <div className="space-y-3 font-medium">
              <h3 className="mb-2 text-sm">Staked</h3>
              <div className="text-3xl">
                {vault.totalStaked.isLoading ? (
                  <Skeleton className="inline-block h-6 w-24 rounded-full" />
                ) : (
                  <>
                    {formatBalance(vault.stakedBalance)}
                    <RealIcon />
                  </>
                )}
              </div>
            </div>
          </div>
          {loggedIn && casinoLink.isLinked && progression.isSuccess && (
            <div className="mt-5">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg">
                  <StakingTiers>
                    <button className="flex items-center gap-2 hover:text-primary">
                      Staking Level <InfoCircledIcon className="size-5" />
                    </button>
                  </StakingTiers>
                </h3>
                <div>
                  {progression.isLoading ? (
                    <>
                      <Skeleton className="w-18 inline h-4" /> /{' '}
                      <Skeleton className="w-18 inline h-4" />
                    </>
                  ) : (
                    progression.isSuccess && (
                      <>
                        {progression.data.rakeback.level &&
                        progression.data.rakeback.nextLevel === undefined ? (
                          <span className="text-accent">MAX LEVEL</span>
                        ) : (
                          <>
                            {progression.data.rakeback.dollarValueTracked.toLocaleString()}
                            ${' '}
                            {progression.data.rakeback.nextLevel && (
                              <>
                                /{' '}
                                {progression.data.rakeback.nextLevel.threshold.toLocaleString()}
                                $
                              </>
                            )}
                          </>
                        )}
                      </>
                    )
                  )}
                </div>
              </div>
              <Progress
                variant="primary"
                value={progression.data.rakeback.progress}
              />
              <div className="mt-1 flex justify-between">
                {progression.isLoading ? (
                  <Skeleton className="mt-0.5 inline-block h-3 w-24" />
                ) : (
                  <h3 className="">
                    Level {progression.data.rakeback.level?.rank} |{' '}
                    {(
                      (progression.data?.rakeback.level?.rate ?? 0) * 100
                    ).toFixed()}
                    % Rakeback
                  </h3>
                )}
                {progression.isLoading ? (
                  <Skeleton className="mt-0.5 inline-block h-3 w-24" />
                ) : (
                  <h3 className="">
                    Next: Level {progression.data.rakeback.nextLevel?.rank} |{' '}
                    {(
                      (progression.data?.rakeback.nextLevel?.rate ?? 0) * 100
                    ).toFixed(0)}
                    % Rakeback
                  </h3>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <RealbetProgressionWidget />
      <QuestTrack />
    </main>
  );
}
