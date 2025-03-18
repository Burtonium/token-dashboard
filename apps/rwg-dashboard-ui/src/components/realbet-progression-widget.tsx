import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import { useRealbetProgression } from '@/hooks/useRealbetProgression';
import { Check, Wallet2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import RealbetVipTiersModal from './modals/RealbetWagerTiersModal';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { Button } from './ui/button';
import { useDynamicAuthClickHandler } from '@/hooks/useDynamicAuthClickHandler';

const RealbetProgressionWidget = () => {
  const progression = useRealbetProgression();
  const link = useCasinoLink();
  const { sdkHasLoaded } = useDynamicContext();
  const loggedIn = useIsLoggedIn();
  const handleDynamicAuthClick = useDynamicAuthClickHandler();

  return (
    <Card data-testid="realbet-progression-widget">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>
            <span className="h-8">
              <Link
                target="_blank"
                href="https://realbet.io"
                className="text-primary underline"
              >
                REALBET.IO
              </Link>{' '}
              Rewards Tier
            </span>
            {link.isSuccess && link.data?.realbetUsername && (
              <>
                <span className="inline-block w-12" />
                <span className="inline-block h-8 text-lg">
                  {link.data.realbetUsername}{' '}
                  <span className="text-primary">
                    Linked <Check className="mb-1 inline-block size-6" />
                  </span>
                </span>
              </>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-destructive">{progression.error?.message}</p>
        {!loggedIn && sdkHasLoaded ? (
          <p>You must be logged in to see your progression.</p>
        ) : !link.isLinked && link.isSuccess ? (
          <p>Link your Realbet account to start tracking your progression.</p>
        ) : (
          !progression.error &&
          progression.data.wagerLevel && (
            <div className="flex gap-3">
              <div className="shrink-0">
                {!progression.isSuccess && !progression.error ? (
                  <Skeleton className="size-24" />
                ) : (
                  progression.data.wagerLevel && (
                    <img
                      className="w-24"
                      alt={`Level icon for the ${progression.data.wagerLevel.data?.levelName} tier`}
                      src={progression.data.wagerLevel.data?.levelIcon}
                    />
                  )
                )}
              </div>
              <div className="w-full justify-between">
                <div className="flex justify-between">
                  <h2 className="mb-1.5 leading-none">
                    <RealbetVipTiersModal>
                      <button className="hover:text-primary active:text-primary">
                        VIP Status
                        <QuestionMarkCircledIcon className="ml-1 inline-block" />
                      </button>
                    </RealbetVipTiersModal>
                  </h2>
                  <p className="text-sm">
                    {!progression.isSuccess && !progression.error ? (
                      <Skeleton className="inline-block h-3 w-24" />
                    ) : (
                      <>
                        $
                        {progression.data.wagerLevel.data?.currentWager.toLocaleString()}{' '}
                        / $
                        {progression.data.wagerLevel.data?.nextLevelWager.toLocaleString()}
                      </>
                    )}
                  </p>
                </div>
                <Progress
                  variant="accent"
                  value={
                    (progression.data.wagerLevel.data?.percentage ?? 0) * 100
                  }
                />
                <div className="mt-1 flex justify-between">
                  {!progression.isSuccess && !progression.error ? (
                    <>
                      <Skeleton className="mt-0.5 inline-block h-3 w-24" />
                      <Skeleton className="mt-0.5 inline-block h-3 w-24" />
                    </>
                  ) : (
                    <>
                      <p className="text-sm">
                        {progression.data.wagerLevel.data?.levelName} |{' '}
                        {(
                          (progression.data.wagerLevel.vipTier?.cashback ?? 0) *
                          100
                        ).toFixed(0)}
                        % Cashback
                      </p>
                      {progression.data.wagerLevel.nextVipTier && (
                        <p className="text-sm">
                          {progression.data.wagerLevel.nextVipTier?.name} |{' '}
                          {(
                            (progression.data.wagerLevel.nextVipTier
                              ?.cashback ?? 0) * 100
                          ).toFixed(0)}
                          % Cashback
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        )}
        <div className="mt-6">
          {!loggedIn && sdkHasLoaded ? (
            <Button onClick={handleDynamicAuthClick}>
              <Wallet2 className="mr-2" /> Connect Wallet
            </Button>
          ) : (
            !link.isLinked &&
            link.isSuccess && (
              <Button
                data-testid="link-realbet-button"
                asChild
                className="ml-1"
              >
                <Link href={'/link-realbet'}>Link your account</Link>
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealbetProgressionWidget;
