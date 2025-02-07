'use client';

import Countdown from '@/components/countdown';
import ClaimWarningModal from '@/components/modals/ClaimWarningModal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClaims } from '@/hooks/useClaims';
import { useToken } from '@/hooks/useToken';
import { formatBalance } from '@/utils';
import { Calendar, Check, CircleX, HandCoins, Info } from 'lucide-react';
import { parseUnits } from 'viem';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isDev } from '@/env';
import { cn } from '@/lib/cn';
import VestingIndicator from './components/vesting-indicator';
import { VestingSchedules } from './components/vesting-schedules';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import RealIcon from '@/components/real-icon';

const ClaimPage = () => {
  const { sdkHasLoaded } = useDynamicContext();
  const { claims, process, claim, hasError, errors, allClaimed, hasEnded } =
    useClaims();
  const token = useToken();
  const showPeriod = claims.isLoading || claims.data?.period;

  return (
    <div className="space-y-8 p-6 md:p-5">
      <div>
        <h2 className="text-heading mb-3">
          <HandCoins className="mb-1 inline size-7 stroke-1" /> Token Claim
        </h2>
        <p className="mb-4 leading-tight text-white/90">
          Claim your tokens from various sources here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{token.symbol} Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col flex-wrap items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-3 md:gap-5">
              <RealIcon size="lg" />
              <div>
                <div className="md:text-heading text-xl">
                  {token.isLoading ? (
                    <Skeleton className="-mb-1 inline-block h-6 w-24 rounded-full" />
                  ) : (
                    <span>{formatBalance(token.balance.data ?? 0n)}</span>
                  )}{' '}
                  <span className="text-primary">{token.symbol}</span>
                </div>
              </div>
            </div>
            <Button
              loading={!sdkHasLoaded || token.mint.isPending}
              onClick={() =>
                token.mint.mutate(parseUnits('100', token.decimals ?? 18))
              }
              variant="neutral"
            >
              {token.mint.isPending ? 'Buying' : 'Buy'} {token.symbol}
            </Button>
            <p className="text-destructive empty:hidden">
              {token.mint.error?.message}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-normal">
              Public Sale Token Claim
            </CardTitle>
            {allClaimed ? (
              <h3 className="text-2xl font-medium text-primary">
                Claimed <Check className="inline" />
              </h3>
            ) : hasEnded ? (
              <h3 className="flex items-center text-xl text-destructive">
                <CircleX className="mr-1 inline" />
                Claim Period Ended
              </h3>
            ) : (
              <ClaimWarningModal
                amount={claims.data?.amounts.total ?? 0n}
                onConfirm={process.mutate}
              >
                <Button
                  variant={hasError ? 'destructive-outline' : 'default'}
                  loading={
                    claims.isLoading || process.isPending || claim.isPending
                  }
                  className="max-sm:min-w-3"
                >
                  {hasError
                    ? 'Retry'
                    : process.isPending
                      ? 'Waiting for Signatures'
                      : claim.isPending
                        ? 'Claiming'
                        : 'Claim'}
                </Button>
              </ClaimWarningModal>
            )}
          </div>
          <p className="text-right text-sm text-destructive empty:hidden">
            {process.error?.message}
          </p>
          <p className="text-right text-sm text-destructive empty:hidden">
            {claim.error?.message}
          </p>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-col justify-evenly gap-6 md:flex-row">
            {claims.isLoading || token.isLoading ? (
              <>
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </>
            ) : (
              <>
                {claims.data && claims.data.amounts.claimed > 0n && (
                  <>
                    <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                      <div>
                        Claimed Amount
                        <Popover>
                          <PopoverTrigger>
                            <Info className="text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">Claimed amount.</div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <h3 className="text-heading flex items-center gap-1 text-right">
                        {formatBalance(claims.data?.amounts.claimed ?? 0n)}{' '}
                        <RealIcon size="sm" />
                      </h3>
                    </div>
                    <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                      <div>
                        Claimed Bonus Amount
                        <Popover>
                          <PopoverTrigger>
                            <Info className="text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">
                              Claimed bonus amount.
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <h3 className="text-heading flex items-center gap-1 text-right">
                        {formatBalance(claims.data?.amounts.claimedBonus ?? 0n)}{' '}
                        <RealIcon size="sm" />
                      </h3>
                    </div>
                  </>
                )}{' '}
                {!hasEnded &&
                  (!claims.data || claims.data.amounts.claimable > 0n) && (
                    <>
                      <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                        <div className="flex items-center gap-2">
                          Claimable Purchased Amount
                          <Popover>
                            <PopoverTrigger>
                              <Info className="stroke-1 text-muted-foreground" />
                            </PopoverTrigger>
                            <PopoverContent align="start">
                              <div className="leading-tight">
                                Claimable purchased amount.
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <h3 className="text-heading flex items-center gap-1 text-right">
                          {formatBalance(claims.data?.amounts.claimable ?? 0n)}{' '}
                          <RealIcon size="sm" />
                        </h3>
                      </div>
                      <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                        <div className="flex items-center gap-2">
                          Claimable Bonus
                          <Popover>
                            <PopoverTrigger>
                              <Info className="stroke-1 text-muted-foreground" />
                            </PopoverTrigger>
                            <PopoverContent align="start">
                              <div className="leading-tight">
                                Claimable bonus.
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <h3 className="text-heading flex items-center gap-1 text-right">
                          {formatBalance(claims.data?.amounts.bonus ?? 0n)}{' '}
                          <RealIcon size="sm" />
                        </h3>
                      </div>
                    </>
                  )}
              </>
            )}
          </div>
          <p className="max-w-[60rem] overflow-x-auto whitespace-pre break-all text-sm text-destructive empty:hidden">
            {hasError &&
              !isDev &&
              "We've detected that something went wrong with at least one of your claims. Please retry later and contact us if it persists."}
            {hasError && isDev && errors}
          </p>
        </CardContent>
        <CardFooter
          className={cn('text-muted-foreground', {
            'text-destructive': hasEnded,
          })}
        >
          {showPeriod && (
            <>
              <hr className="mb-3 w-full border-lighter" />
              <div className="flex items-center gap-1">
                <Calendar className="inline" /> Claim period
                {claims.isLoading && (
                  <Skeleton className="inline-block h-4 w-24" />
                )}
                {claims.isSuccess && (
                  <>
                    {hasEnded ? (
                      <> has ended.</>
                    ) : (
                      <>
                        {' '}
                        ends in <Countdown endDate={claims.data?.period?.end} />
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="p-6">
          <CardTitle>Vesting</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-1">
          {!sdkHasLoaded ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <VestingIndicator />
          )}
        </CardContent>
      </Card>
      <VestingSchedules />
    </div>
  );
};

export default ClaimPage;
