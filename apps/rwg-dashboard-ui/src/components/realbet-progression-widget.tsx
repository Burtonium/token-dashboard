import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import { useRealbetProgression } from '@/hooks/useRealbetProgression';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import RealbetVipTiersModal from './modals/RealbetWagerTiersModal';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import ConnectWallet from './connect-wallet';
import { Button } from './ui/button';

const RealbetProgressionWidget = () => {
  const progression = useRealbetProgression();
  const link = useCasinoLink();
  const { sdkHasLoaded } = useDynamicContext();
  const loggedIn = useIsLoggedIn();

  return (
    <Card>
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
              Reward Tiers
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
          {!loggedIn && sdkHasLoaded ? (
            <Button asChild className="ml-1">
              <ConnectWallet />
            </Button>
          ) : (
            !link.isLinked &&
            link.isSuccess && (
              <Button asChild className="ml-1">
                <Link href={'/link-to-win'}>Link your account</Link>
              </Button>
            )
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-destructive">{progression.error?.message}</p>
        {!loggedIn && sdkHasLoaded ? (
          <p>You must be logged in to see your progression.</p>
        ) : !link.isLinked && link.isSuccess ? (
          <p>Link your realbet account to start tracking your progression. </p>
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
      </CardContent>
    </Card>
  );
};

export default RealbetProgressionWidget;
