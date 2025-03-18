import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import backgroundImage from '@/assets/images/vr-guy.png';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';
import { formatBalance, formatBigIntWithSeparators } from '@/utils';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import DepositsIndicator from './deposits-indicator';
import { useToken } from '@/hooks/useToken';
import { useStakingVault } from '@/hooks/useStakingVault';
import useParallaxEffect from '@/hooks/useParallax';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { Wallet } from 'lucide-react';
import { PreviousStakes } from './previous-stakes';
import RealIcon from '@/components/real-icon';

const tierButtonCommonClasses =
  'flex justify-between min-w-0 max-w-28 md:max-w-full w-full rounded-[4px] p-2 h-8 text-xs';

const tierButtonClasses = [
  (active: boolean) =>
    active
      ? 'text-black bg-primary border-none hover:bg-primary hover:text-black focus:ring-primary'
      : 'text-primary bg-transparent border border-primary hover:bg-primary hover:text-black focus:ring-primary',
  (active: boolean) =>
    active
      ? 'text-black bg-primary-intermediate-1 border-none hover:bg-primary-intermediate-1 hover:text-black focus:ring-primary-intermediate-1'
      : 'text-primary-intermediate-1 bg-transparent border border-primary-intermediate-1 hover:bg-primary-intermediate-1 hover:text-black focus:ring-primary-intermediate-1',
  (active: boolean) =>
    active
      ? 'bg-primary-intermediate-3 border-none focus:ring-primary-intermediate-3'
      : 'text-primary-intermediate-3 bg-transparent border border-primary-intermediate-3 hover:bg-primary-intermediate-3 hover:text-black focus:ring-primary-intermediate-3',
  (active: boolean) =>
    active
      ? 'bg-red-600 border-none hover:bg-red-600 focus:ring-red-600'
      : 'text-red-600 bg-transparent border border-red-600 hover:bg-red-600 hover:text-black focus:ring-red-600',

  (active: boolean) =>
    active
      ? 'bg-red-700 border-none hover:bg-red-700 focus:ring-red-700'
      : 'text-red-700 bg-transparent border border-red-700 hover:bg-red-700 hover:text-black focus:ring-red-700',
];

const StakeComponent = () => {
  const [stakingStatus, setStakingStatus] = useState('');
  const isAuthenticated = useIsLoggedIn();
  const token = useToken();
  const {
    stake,
    increaseAllowance,
    tiers,
    allowance,
    shares,
    stakedBalance,
    deposits,
    currentEpoch,
    shareSymbol,
    lastEpochRewards,
    totalStaked,
    errors,
  } = useStakingVault();
  const { sdkHasLoaded, setShowAuthFlow } = useDynamicContext();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallax = useParallaxEffect(parallaxRef);

  const StakeFormSchema = z.object({
    amount: z.string({ message: 'Amount is required' }),
    duration: z
      .string()
      .refine(
        (d) => !!tiers.data?.[parseInt(d)],
        'Something went wrong selecting the tier.',
      ),
  });

  type StakeValues = z.infer<typeof StakeFormSchema>;

  const stakeForm = useForm<StakeValues>({
    defaultValues: {
      amount: '0',
      duration: '0',
    },
    resolver: zodResolver(StakeFormSchema),
  });

  const currentMultiplier = useAnimatedNumber(
    shares.isSuccess && totalStaked.isSuccess
      ? Number(
          shares.data.reduce(
            (amount, item) => item.effectiveAmount + amount,
            0n,
          ),
        ) / Number(stakedBalance ?? 0n)
      : 0,
    { decimals: 2, duration: 750 },
  );

  const duration = stakeForm.watch('duration');
  const durationIndex = useMemo(() => parseInt(duration || '0'), [duration]);

  const selectedTier = useMemo(
    () => tiers.data?.[durationIndex],
    [durationIndex, tiers.data],
  );

  const amount = stakeForm.watch('amount');

  const calculateUnlockTime = useCallback(
    (lockupTimeSeconds: number | bigint | undefined) => {
      if (!lockupTimeSeconds) {
        return undefined;
      }
      return dayjs().add(Number(lockupTimeSeconds), 'seconds').unix();
    },
    [],
  );

  const onStake = useCallback(
    async (values: StakeValues) => {
      if (!isAuthenticated) {
        return setShowAuthFlow(true);
      }

      const amount = parseUnits(values.amount, token.decimals);

      if (amount === 0n) {
        return stakeForm.setError('amount', { message: 'Amount required' });
      }

      if (amount > (token.balance.data ?? 0n)) {
        stakeForm.setError('amount', { message: 'Insufficient balance' });
        return;
      }

      if (!allowance.isSuccess) {
        throw new Error('Something went wrong fetching allowance');
      }

      if (amount > allowance.data) {
        setStakingStatus('Approving allowance...');
        try {
          await increaseAllowance.mutateAsync(amount);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setStakingStatus('');
          stakeForm.setError('amount', {
            message: 'Error when attempting to increase allowance',
          });
          return;
        }
      }

      if (amount > (token.balance.data ?? 0n)) {
        stakeForm.setError('amount', { message: 'Insufficient balance' });
        return;
      }

      setStakingStatus(`Staking ${shareSymbol}...`);
      await stake
        .mutateAsync({
          amount,
          tier: parseInt(values.duration),
        })
        .finally(() => {
          setStakingStatus('');
        });
    },
    [
      isAuthenticated,
      setShowAuthFlow,
      stakeForm,
      token.balance,
      allowance.data,
      allowance.isSuccess,
      increaseAllowance,
      shareSymbol,
      stake,
      token.decimals,
    ],
  );

  const anticipatedMonthlyReward = useMemo(() => {
    if (!selectedTier) {
      return 0;
    }

    const lastEpochRewardsData = lastEpochRewards.data;
    if (!lastEpochRewardsData) {
      return 0;
    }

    const numberAmount = parseUnits(amount, token.decimals);

    if (numberAmount === 0n) {
      return 0;
    }

    const mult = selectedTier?.decimalMult ?? 0.1;

    const multedAmount = (numberAmount * BigInt(mult * 10)) / 10n;

    // If totalEffectiveSupply is 0, no one has staked,
    // so this is the first potential staker
    const totalEffectiveSupply =
      lastEpochRewardsData.totalEffectiveSupply <= 0
        ? multedAmount
        : BigInt(lastEpochRewardsData.totalEffectiveSupply);

    // Multiply by 10^2 for 2 decimal place precision
    const reward =
      (((lastEpochRewardsData.rewards * 10n ** 2n) / totalEffectiveSupply) *
        multedAmount) /
      10n ** 2n;

    // 4.2 weeks (1 month)
    const monthlyReward = (reward * 42n) / 10n;

    return Number(monthlyReward / 10n ** 18n);
  }, [lastEpochRewards.data, selectedTier, amount, token.decimals]);

  const anticipatedMonthlyRewardAnimated = useAnimatedNumber(
    anticipatedMonthlyReward,
    {
      decimals: 2,
      duration: 300,
      locale: 'en-US',
    },
  );

  // Simple APY calculation, as we don't have compounding
  const apy = useMemo(
    () => (((anticipatedMonthlyReward * 12) / Number(amount)) * 100).toFixed(2),
    [anticipatedMonthlyReward, amount],
  );

  const animatedAPY = useAnimatedNumber(apy, {
    decimals: 2,
    duration: 300,
  });

  const stakeFormLoading =
    !sdkHasLoaded ||
    stakeForm.formState.isSubmitting ||
    allowance.isLoading ||
    deposits.isLoading ||
    token.isLoading;

  return (
    <div>
      <div className="mb-3 flex flex-col gap-4 py-3 md:mb-0 md:grid md:grid-cols-3 md:py-5">
        <Card className="col-span-2 space-y-5 p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl">Stake {token.symbol}</h2>

            {!currentEpoch ? (
              <Skeleton className="h-4 w-24 rounded-lg bg-muted" />
            ) : (
              <span className="text-sm text-muted">
                Epoch {currentEpoch.epoch} (ends in{' '}
                {dayjs
                  .duration(Date.now() - currentEpoch.endDate * 1000)
                  .humanize()}
                )
              </span>
            )}
          </div>
          <h3 className="text-primary empty:hidden">{stakingStatus}</h3>
          <Form {...stakeForm}>
            <form onSubmit={stakeForm.handleSubmit(onStake)}>
              <FormField
                control={stakeForm.control}
                name="amount"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn('block font-normal', {
                        'text-muted': stakeFormLoading,
                      })}
                    >
                      <Wallet className="mr-2 inline size-5" strokeWidth={1} />
                      Stakeable balance:{' '}
                      {formatBigIntWithSeparators(
                        token.balance.data ?? 0n,
                        token.decimals,
                      )}{' '}
                      {token.symbol}
                      {allowance.isSuccess && allowance.data > 0n && (
                        <>
                          {', '}
                          Allowance: {formatBalance(allowance.data)}{' '}
                          {token.symbol}
                        </>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-testid="staking-input"
                        loading={stakeFormLoading}
                        startAdornment={
                          <span className="mt-px inline-flex items-center gap-1">
                            <RealIcon border={false} className="mt-0" />
                            {token.symbol}
                          </span>
                        }
                        endAdornment={
                          <Button
                            data-testid="stake-max-button"
                            type="button"
                            onClick={() => {
                              field.onChange(
                                formatUnits(
                                  token.balance.data ?? 0n,
                                  token.decimals,
                                ),
                              );
                            }}
                            variant="neutral"
                            size="sm"
                            className="radius-sm mr-1 h-auto rounded-[4px] border-0 px-2 py-[2px] text-xs"
                          >
                            max
                          </Button>
                        }
                        className={cn('h-11', {
                          'border-destructive': formState.errors.amount,
                        })}
                        placeholder="0"
                        {...field}
                        value={Number(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={stakeForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          'mt-2 flex justify-between py-2 font-normal',
                          {
                            'text-muted': stakeFormLoading,
                          },
                        )}
                      >
                        Choose staking lock duration:
                        <p className="text-muted">
                          Unlocks at{' '}
                          {selectedTier?.lockPeriod
                            ? dayjs
                                .unix(
                                  calculateUnlockTime(
                                    selectedTier.lockPeriod,
                                  ) ?? 0,
                                )
                                .format('MMM DD, YYYY')
                            : ''}
                        </p>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap justify-start gap-2 md:justify-evenly lg:flex-nowrap">
                          <p className="text-destructive empty:hidden">
                            {tiers.error?.message}
                          </p>
                          {tiers.isLoading ? (
                            <>
                              <Skeleton className="h-8 w-full rounded-lg bg-primary" />
                              <Skeleton className="h-8 w-full rounded-lg bg-primary-intermediate-1" />
                              <Skeleton className="h-8 w-full rounded-lg bg-primary-intermediate-2" />
                              <Skeleton className="h-8 w-full rounded-lg bg-primary-intermediate-3" />
                              <Skeleton className="h-8 w-full rounded-lg bg-accent" />
                            </>
                          ) : (
                            tiers.data?.map((tier, index) => (
                              <Button
                                data-testid={`tier-${index}-button`}
                                variant="unset"
                                size="unset"
                                type="button"
                                key={index}
                                loading={stakeFormLoading}
                                onClick={() => {
                                  field.onChange(index.toString());
                                  stakeForm.setValue(
                                    'duration',
                                    index.toString(),
                                  );
                                }}
                                className={cn(
                                  tierButtonCommonClasses,
                                  tierButtonClasses[index]?.(
                                    parseInt(field.value) === index,
                                  ),
                                )}
                              >
                                <span>
                                  {dayjs
                                    .duration(
                                      Number(tier.lockPeriod),
                                      'seconds',
                                    )
                                    .humanize()}
                                </span>
                                <span className="text-base">
                                  {tier.decimalMult}x
                                </span>
                              </Button>
                            ))
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                data-testid="stake-button"
                loading={stakeFormLoading}
                type="submit"
                className="mt-5 w-64"
              >
                Stake
                <RealIcon size="sm" className="ml-0 mt-0" />
              </Button>
            </form>
          </Form>
          {errors.map((e) => (
            <p key={e.message} className="text-destructive empty:hidden">
              {e.message}
            </p>
          ))}
        </Card>
        <div
          ref={parallaxRef}
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-[size:300%] bg-[position:center] bg-no-repeat px-4 py-8 sm:bg-[center_10%] sm:px-12"
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundPositionY: `${parallax}%`,
          }}
        >
          <div className="absolute inset-0 z-10 bg-black opacity-50" />
          <div className="relative z-10 text-center">
            <h2 className="flex flex-col gap-4 text-2xl">
              {selectedTier && (
                <div className="text-xl">
                  <span>You&apos;ll get </span>
                  <span
                    className={cn('rounded-lg bg-black/50 px-2', {
                      'border border-primary text-primary': durationIndex === 0,
                      'border border-primary-intermediate-1 text-primary-intermediate-1':
                        durationIndex === 1,
                      'border border-primary-intermediate-2 text-primary-intermediate-2':
                        durationIndex === 2,
                      'border border-primary-intermediate-3 text-primary-intermediate-3':
                        durationIndex === 3,
                      'border border-accent text-accent': durationIndex === 4,
                    })}
                  >
                    {selectedTier.decimalMult}x
                  </span>{' '}
                  <span>the rewards</span>
                </div>
              )}
              <div className="text-heading">{animatedAPY}% APY</div>
              <div className="text-xl">
                ≈{anticipatedMonthlyRewardAnimated}
                <span className="inline-flex items-center gap-1">
                  <RealIcon size="sm" />
                  {token.symbol}
                </span>
              </div>
              <div className="text-xl">per month</div>
            </h2>
          </div>
        </div>
      </div>
      <Card className="space-y-5 p-5 md:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{shareSymbol} Balances</h2>

          <span className="text-sm">
            Current multiplier:{' '}
            <span
              className={cn({
                'text-primary': parseFloat(currentMultiplier) >= 1,
                'text-primary-intermediate-1':
                  parseFloat(currentMultiplier) >= 1.25,
                'text-primary-intermediate-2':
                  parseFloat(currentMultiplier) >= 1.5,
                'text-primary-intermediate-3':
                  parseFloat(currentMultiplier) >= 1.75,
                'text-accent': parseFloat(currentMultiplier) >= 2,
              })}
            >
              {currentMultiplier}x
            </span>
          </span>
        </div>
        <div>
          <DepositsIndicator />
        </div>
      </Card>

      <PreviousStakes />
    </div>
  );
};

export default StakeComponent;
