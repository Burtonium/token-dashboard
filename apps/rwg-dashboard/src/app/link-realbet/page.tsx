'use client';

import Banner from '@/components/banner';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  RealIcon,
  Progress,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@bltzr-gg/ui';
import {
  useCurrentTicketWave,
  useDynamicAuthClickHandler,
  useCasinoLink,
  useToken,
  useCurrentWaveMembership,
  useLinkCasinoAccount,
} from '@/hooks';
import {
  getAuthToken,
  useDynamicContext,
  useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core';
import {
  Box,
  Check,
  Diamond,
  Gift,
  Rocket,
  Ticket,
  Trophy,
  Wallet2,
  Frown,
} from 'lucide-react';
import GiftBoxes from '../../components/gift-boxes';
import { cn } from '@bltzr-gg/ui';
import { awardTwitterBonus } from '@/server/actions/rewards/awardTwitterBonus';
import { TWITTER_BONUS_TICKETS } from '@/config/linkToWin';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export default function LinkRealbetPage() {
  const token = useToken();
  const casinoLink = useCasinoLink();
  const { sdkHasLoaded } = useDynamicContext();
  const loggedIn = useIsLoggedIn();
  const authHandler = useDynamicAuthClickHandler();
  const currentWave = useCurrentTicketWave();
  const waveMembership = useCurrentWaveMembership();
  const linkCasinoAccount = useLinkCasinoAccount();

  const hasSeatsRemaining =
    currentWave.data && currentWave.data?.availableSeats > 0;
  const showLinkPrompt =
    (sdkHasLoaded && !loggedIn) ||
    (loggedIn && !casinoLink.isLinked && casinoLink.isSuccess);
  const showMaxSeatsReachedMessage =
    currentWave.data &&
    loggedIn &&
    casinoLink.isLinked &&
    !waveMembership.hasMembership &&
    !hasSeatsRemaining;
  const showNotWhitelistedMessage =
    loggedIn &&
    casinoLink.isLinked &&
    currentWave.data &&
    !waveMembership.hasMembership &&
    !currentWave.data.whitelisted;
  const showSeatData =
    loggedIn && casinoLink.isLinked && waveMembership.hasMembership;
  const showLinkButton =
    loggedIn && casinoLink.isSuccess && !casinoLink.isLinked;
  const showVIPSeatsAvailable = currentWave.isLoading || !!currentWave.data;
  const showConnectButton = !loggedIn && sdkHasLoaded;

  return (
    <div className="space-y-5 p-3 sm:p-5">
      <Banner frog={false}>
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row">
          <div className="space-y-5">
            <div className="inline-block rounded-sm bg-accent-2/80 px-5 py-2 font-monoline text-2xl text-accent-2-foreground">
              Link to Win
            </div>
            {showLinkPrompt && (
              <p className="text-sm md:max-w-full md:text-lg">
                Link your wallet with your RealBet account to check your VIP
                status!
              </p>
            )}
            <p className="text-sm md:max-w-full md:text-lg">
              VIPs get {currentWave.data?.ticketsPerMember} tickets to win.
              Prizes include {token.symbol} public sale bonuses and free RealBet
              credits.
            </p>
            {showLinkButton && (
              <Button
                size="sm"
                onClick={() => linkCasinoAccount.mutate()}
                loading={
                  linkCasinoAccount.isPending ||
                  casinoLink.isLoading ||
                  waveMembership.isLoading
                }
              >
                Link your account
              </Button>
            )}
            {sdkHasLoaded && loggedIn && casinoLink.isLinked && (
              <div className="flex items-center text-xl">
                Linked to {casinoLink.data?.realbetUsername}.{' '}
                <Check className="ml-2 inline size-8 text-primary" />
              </div>
            )}
            <div>
              {showConnectButton && (
                <Button
                  className="py-5"
                  size="sm"
                  onClick={authHandler}
                  variant="default"
                >
                  <Wallet2 className="mr-2" /> Connect Wallet
                </Button>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-5 self-stretch text-center">
            <div>
              <p className="text-xl font-medium">
                {currentWave.isLoading ? (
                  <Skeleton className="mx-auto mb-3 h-8 w-48 rounded-full" />
                ) : (
                  (currentWave.data?.label ?? <>No current wave.</>)
                )}
              </p>
              <p className="font-sans text-sm">
                {currentWave.isLoading ? (
                  <Skeleton className="mx-auto h-4 w-64 rounded-full" />
                ) : (
                  (currentWave.data?.description ?? (
                    <>Please come again later.</>
                  ))
                )}
              </p>
            </div>
            {showVIPSeatsAvailable && (
              <div>
                <div className="flex justify-center gap-2 text-3xl font-medium">
                  {currentWave.isLoading ? (
                    <Skeleton className="inline-block h-10 w-24 rounded-full" />
                  ) : (
                    <span>{currentWave.data?.availableSeats ?? 0}</span>
                  )}
                  /
                  {currentWave.isLoading ? (
                    <Skeleton className="inline-block h-10 w-24 rounded-full" />
                  ) : (
                    <span>{currentWave.data?.totalSeats ?? 0}</span>
                  )}
                </div>
                <p className="text-xs font-medium text-muted">
                  VIP spots remaining
                </p>
              </div>
            )}
            {showNotWhitelistedMessage && (
              <p className="mt-3">
                <span className="p-3 empty:hidden">
                  Cannot yet join{' '}
                  <span className="text-accent">
                    VIP <Frown className="mr-2 inline" />
                  </span>
                </span>
              </p>
            )}

            {showMaxSeatsReachedMessage && (
              <p className="bg-black/50 p-2 text-lg font-semibold text-warning xl:text-xl">
                The maximum number of seats for this wave is reached. Signup
                bonus tickets are not available. Please come back later.
              </p>
            )}
            {waveMembership.canSubscribe && (
              <>
                <p className="text-destructive empty:hidden">
                  {waveMembership.subscribe.error?.message}
                </p>
                <Button
                  loading={waveMembership.subscribe.isPending}
                  onClick={() => waveMembership.subscribe.mutate()}
                  size="lg"
                >
                  Wave Signup
                </Button>
              </>
            )}
            {showSeatData && waveMembership.data && (
              <p className="text-2xl font-medium">
                {waveMembership.data.seatNumber === 420 && <span> 🔥</span>}
                You got seat{' '}
                <span
                  className={cn('text-primary', {
                    'text-[#FFD700]': waveMembership.data.seatNumber === 1,
                    'text-[#C0C0C0]': waveMembership.data.seatNumber === 2,
                    'text-[#CD7F32]': waveMembership.data.seatNumber === 3,
                  })}
                >
                  #{waveMembership.data.seatNumber}
                </span>
                {waveMembership.data.seatNumber === 1 && (
                  <Trophy className="mb-1 inline size-8 p-1 text-[#FFD700]" />
                )}
                {waveMembership.data.seatNumber === 2 && (
                  <Trophy className="mb-1 inline size-8 p-1 text-[#C0C0C0]" />
                )}
                {waveMembership.data.seatNumber === 3 && (
                  <Trophy className="mb-1 inline size-8 p-1 text-[#CD7F32]" />
                )}
                {waveMembership.data.seatNumber === 69 && ', nice'}
                {waveMembership.data.seatNumber === 420 && <span> 🔥</span>}
              </p>
            )}
          </div>
        </div>
      </Banner>
      <div className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="inline size-4" /> Prize Pool
              </div>
            </CardTitle>
            <CardDescription>
              Limited prizes remaining this wave — act fast.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 md:gap-5 lg:gap-8">
              <div className="space-y-2">
                <div className="flex w-full justify-between">
                  <div>
                    <h3 className="text-xl font-medium sm:text-lg">
                      <Rocket className="mb-1 inline size-4 text-primary md:size-6" />{' '}
                      Token Sale Bonus<span className="text-muted">*</span>
                    </h3>
                    <p className="text-sm text-lightest">
                      Flat bonuses in upcoming {token.symbol} public sale.
                    </p>
                  </div>

                  <div className="mt-1 text-right text-sm">
                    {currentWave.data?.prizePools.TokenBonus ?? '0'} /{' '}
                    {currentWave.data?.totals.TokenBonus ?? '0'}{' '}
                    <small>remaining</small>
                  </div>
                </div>
                <Progress
                  value={
                    ((currentWave.data?.prizePools.TokenBonus ?? 0) /
                      (currentWave.data?.totals.TokenBonus ?? 1)) *
                    100
                  }
                />
                <p className="!mt-0.5 text-left text-xs text-muted">
                  * must buy minimum public sale amount = total bonus amount
                  <br />
                  i.e. Win 500, spend 500 to unlock your 500
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex w-full justify-between">
                  <div>
                    <h3 className="font-medium sm:text-lg">
                      <Diamond className="mb-1 inline size-4 text-xl text-primary md:size-6" />{' '}
                      Realbet Credits
                    </h3>
                    <p className="text-sm text-lightest">
                      Get free {token.symbol} credits for use in the Realbet
                      Casino.
                    </p>
                  </div>
                  <div className="mt-1 text-right text-sm">
                    {currentWave.data?.prizePools.RealBetCredit ?? '0'} /{' '}
                    {currentWave.data?.totals.RealBetCredit ?? '0'}{' '}
                    <small>remaining</small>
                  </div>
                </div>
                <Progress
                  value={
                    ((currentWave.data?.prizePools.RealBetCredit ?? 0) /
                      (currentWave.data?.totals.RealBetCredit ?? 1)) *
                    100
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {loggedIn && !!waveMembership.data && (
          <div className="flex w-full flex-col gap-5 xl:flex-row">
            <Card className="max-w-5xl grow">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="flex-inline items-center gap-2">
                      <Box className="inline size-6" /> A REAL Mystery
                    </span>
                    {waveMembership.isLoading || !waveMembership.data ? (
                      <Skeleton className="h-6 w-40 rounded-full" />
                    ) : (
                      <span className="text-right text-sm font-medium md:text-lg">
                        You have{' '}
                        <span className="text-primary">
                          <Ticket className="mb-1 inline size-4" />{' '}
                          {waveMembership.data.reedeemableTickets}
                        </span>{' '}
                        tickets remaining
                        <Popover>
                          <PopoverTrigger>
                            <QuestionMarkCircledIcon className="ml-2 inline size-6 hover:text-primary active:text-primary" />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">
                              You received tickets from the following sources:
                            </div>
                            <ul>
                              <li className="flex flex-wrap items-center gap-2">
                                <span>
                                  Wave Signup Bonuses:{' '}
                                  <span className="text-xl font-medium text-primary">
                                    {
                                      waveMembership.ticketTotals
                                        ?.WaveSignupBonus
                                    }{' '}
                                    <Ticket className="mb-1 inline size-6 text-muted" />
                                  </span>{' '}
                                </span>
                                <span className="text-xl font-medium"></span>
                              </li>

                              <li className="flex flex-wrap items-center gap-2">
                                <span>
                                  Twitter Share Bonus:{' '}
                                  <span className="text-xl font-medium text-primary">
                                    {waveMembership.ticketTotals?.TwitterShare}{' '}
                                    <Ticket className="mb-1 inline size-6 text-muted" />
                                  </span>{' '}
                                </span>
                                <span className="text-xl font-medium"></span>
                              </li>
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </span>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>
                  {waveMembership.data &&
                  waveMembership.data.reedeemableTickets <= 0 ? (
                    <p className="text-sm text-warning">
                      You&apos;re out of tickets. Wait for the next wave and
                      hang loose!
                    </p>
                  ) : (
                    <>Select a REAL box to win! 1 ticket = 1 box open.</>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn({
                    'pointer-events-none cursor-not-allowed grayscale backdrop-blur-sm':
                      !loggedIn ||
                      !waveMembership ||
                      waveMembership.data.reedeemableTickets <= 0,
                  })}
                >
                  <GiftBoxes />
                </div>
              </CardContent>
            </Card>
            <Card className="xl:min-w-96">
              <CardHeader>
                <CardTitle>
                  <Gift className="inline size-6" /> My Rewards
                </CardTitle>
                <CardDescription>Track your personal winnings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-full flex-col justify-between gap-5">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-2">
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-medium md:text-xl">
                        <Rocket className="inline size-6 text-primary" /> Token
                        Sale Bonus
                      </h3>
                      {waveMembership.isLoading ? (
                        <Skeleton className="h-6 w-48 rounded-full" />
                      ) : (
                        <span className="text-2xl font-medium leading-none">
                          <span className="inline-flex size-8 flex-col items-center justify-center rounded-full border-2 border-primary bg-black p-1.5 text-primary">
                            <RealIcon className="inline size-5" />
                          </span>{' '}
                          {waveMembership.rewardTotals?.TokenBonus.toLocaleString() ??
                            0}{' '}
                          <span className="text-xl text-muted">
                            {token.symbol}
                          </span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center gap-2 font-medium md:text-xl">
                        <Diamond className="inline size-6 text-primary" />{' '}
                        Realbet Credits
                      </h3>
                      {waveMembership.isLoading ? (
                        <Skeleton className="h-6 w-48 rounded-full" />
                      ) : (
                        <span className="text-2xl font-medium leading-none">
                          <span className="inline-flex size-8 flex-col items-center justify-center rounded-full border-2 border-primary bg-black p-1.5 text-primary">
                            <RealIcon className="inline size-5" />
                          </span>{' '}
                          {waveMembership.rewardTotals?.RealBetCredit.toLocaleString() ??
                            0}{' '}
                          <span className="text-xl text-muted">
                            {token.symbol}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  {!waveMembership.postedToTwitterAlready && (
                    <Button
                      disabled={waveMembership.postedToTwitterAlready}
                      onClick={async () => {
                        const authToken = getAuthToken();
                        if (!authToken) {
                          throw new Error('No token');
                        }
                        await awardTwitterBonus(authToken);
                        await waveMembership.refetch();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <a
                        className="twitter-share-button"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just got $REAL with @rwg_official for linking my realbet.io account to the dashboard. Come get yours: ${window.location.href}`)}`}
                      >
                        Share to X for {TWITTER_BONUS_TICKETS} Extra Tickets
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
