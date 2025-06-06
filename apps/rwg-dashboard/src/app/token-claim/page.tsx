'use client';

import Countdown from '@/components/countdown';
import ClaimWarningModal from '@/components/modals/ClaimWarningModal';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RealIcon,
} from '@bltzr-gg/ui';
import { useClaims } from '@/hooks/useClaims';
import { useToken } from '@/hooks/useToken';
import { formatBalance } from '@/utils';
import { Calendar, Check, CircleX, HandCoins, Info } from 'lucide-react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { env, isDev } from '@/env';
import { cn } from '@bltzr-gg/ui';
import VestingIndicator from './components/vesting-indicator';
import { VestingSchedules } from './components/vesting-schedules';
import { Uniswap } from './components/uniswap';
import useUniswap from '@/hooks/useUniswap';
import Link from 'next/link';

const ClaimPage = () => {
  const { sdkHasLoaded } = useDynamicContext();
  const {
    claims,
    process,
    claim,
    hasError,
    errors,
    allClaimed,
    hasEnded,
    canClaim,
  } = useClaims();
  const token = useToken();
  const { tokenPrice } = useUniswap();
  const showPeriod = claims.isLoading || claims.data?.period;

  return (
    <div className="space-y-8 p-6 md:p-5">
      <div>
        <h2 className="mb-3 text-heading">
          <HandCoins className="mb-1 inline size-7 stroke-1" /> Token Claim
        </h2>
        <p className="mb-4 leading-tight text-white/90">
          Claim your tokens from various sources here.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{token.symbol} Price</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col flex-wrap items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-xl md:gap-5 md:text-heading">
              <RealIcon size="lg" />
              <div>
                1 <span className="text-primary">{token.symbol}</span> ={' '}
                {tokenPrice > 0 ? (
                  `$${tokenPrice.toFixed(6)}`
                ) : (
                  <Skeleton className="-mb-1 inline-block h-8 w-24 rounded-full" />
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              {env.NEXT_PUBLIC_BUY_REAL_URL &&
                env.NEXT_PUBLIC_BUY_REAL_URL.length > 0 && (
                  <Button asChild>
                    <Link href={env.NEXT_PUBLIC_BUY_REAL_URL} target="_blank">
                      Get {token.symbol}
                    </Link>
                  </Button>
                )}
              {(env.NEXT_PUBLIC_BUY_REAL_URL || '').length === 0 && (
                <Uniswap>
                  <Button>Get {token.symbol}</Button>
                </Uniswap>
              )}
              <Button variant="ghost" size="sm" onClick={token.watchToken}>
                <RealIcon size="xs" className="ml-0" />
                Add token to wallet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{token.symbol} Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col flex-wrap items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-center gap-3 md:gap-5">
              <RealIcon size="lg" />
              <div>
                <div className="text-xl md:text-heading">
                  {token.isLoading ? (
                    <Skeleton className="-mb-1 inline-block h-6 w-24 rounded-full" />
                  ) : (
                    <span>{formatBalance(token.balance.data ?? 0n)}</span>
                  )}{' '}
                  <span className="text-primary">{token.symbol}</span>
                </div>
              </div>
            </div>
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
                <span>Claim Period Ended</span>
              </h3>
            ) : !canClaim ? (
              <h3 className="flex items-center text-xl text-muted">
                <span>Nothing to claim yet.</span>
              </h3>
            ) : (
              <ClaimWarningModal
                amount={
                  claims.data.amounts.claimableTotal +
                  claims.data.amounts.signableAmount
                }
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
                        ? 'Claiming...'
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
                {claims.data && claims.data.amounts.claimedAmount > 0n && (
                  <>
                    <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                      <div className="flex items-center gap-2">
                        Claimed Amount
                        <Popover>
                          <PopoverTrigger>
                            <Info className="text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">
                              Amount of {token.symbol} that you have claimed.
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <h3 className="flex items-center gap-1 text-right text-heading">
                        {formatBalance(
                          claims.data?.amounts.claimedAmount ?? 0n,
                        )}{' '}
                        <RealIcon size="sm" />
                      </h3>
                    </div>
                    <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-primary/15 bg-primary/[4%] p-6">
                      <div className="flex items-center gap-2">
                        Claimed Bonus Amount
                        <Popover>
                          <PopoverTrigger>
                            <Info className="text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">
                              Amount of bonus {token.symbol} that you have
                              claimed.
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <h3 className="flex items-center gap-1 text-right text-heading">
                        {formatBalance(claims.data?.amounts.claimedBonus ?? 0n)}{' '}
                        <RealIcon size="sm" />
                      </h3>
                    </div>
                  </>
                )}{' '}
                {!hasEnded && canClaim && (
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
                      <h3 className="flex items-center gap-1 text-right text-heading">
                        {formatBalance(
                          claims.data.amounts.claimableAmount +
                            claims.data.amounts.signableAmount,
                        )}{' '}
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
                      <h3 className="flex items-center gap-1 text-right text-heading">
                        {formatBalance(
                          claims.data?.amounts.claimableBonus ?? 0n,
                        )}{' '}
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
