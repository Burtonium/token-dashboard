'use client';

import { Card } from '@bltzr-gg/ui';
import { RealIcon } from '@bltzr-gg/ui';
import { Button } from '@bltzr-gg/ui';
import backgroundImage from '@/assets/images/vr-guy.png';
import { useMemo, useRef, useState } from 'react';
import useParallaxEffect from '@/hooks/useParallax';
import { Input } from '@bltzr-gg/ui';
import { useToken } from '@/hooks/useToken';
import React from 'react';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { CalculatorIcon } from 'lucide-react';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@bltzr-gg/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@bltzr-gg/ui';
import { convertToReadableTime } from '@/utils';

const gradientTierButtonClasses = [
  (active: boolean) =>
    active
      ? {
          className:
            'bg-primary border-none hover:bg-primary hover:text-black focus:ring-primary',
        }
      : {
          className:
            'text-primary bg-transparent border border-primary hover:bg-primary hover:text-black focus:ring-primary',
        },
  (active: boolean) =>
    active
      ? {
          className:
            'bg-primary-intermediate-1 border-none hover:bg-primary-intermediate-1 hover:text-black focus:ring-primary-intermediate-1',
        }
      : {
          className:
            'text-primary-intermediate-1 bg-transparent border border-primary-intermediate-1 hover:bg-primary-intermediate-1 hover:text-black focus:ring-primary-intermediate-1',
        },
  (active: boolean) =>
    active
      ? {
          className:
            'bg-primary-intermediate-2 border-none hover:bg-primary-intermediate-2 hover:text-black focus:ring-primary-intermediate-2',
        }
      : {
          className:
            'text-primary-intermediate-2 bg-transparent border border-primary-intermediate-2 hover:bg-primary-intermediate-2 hover:text-black focus:ring-primary-intermediate-2',
        },
  (active: boolean) =>
    active
      ? {
          className:
            'bg-primary-intermediate-3 border-none hover:bg-primary-intermediate-3 hover:text-black focus:ring-primary-intermediate-3',
        }
      : {
          className:
            'text-primary-intermediate-3 bg-transparent border border-primary-intermediate-3 hover:bg-primary-intermediate-3 hover:text-black focus:ring-primary-intermediate-3',
        },
  (active: boolean) =>
    active
      ? {
          className:
            'bg-accent border-none hover:bg-accent hover:text-black focus:ring-accent',
        }
      : {
          className:
            'text-accent bg-transparent border border-accent hover:bg-accent hover:text-black focus:ring-accent',
        },
];

const DEFAULT_GLOBAL_STAKE = '10,000,000';
const DEFAULT_MONTHLY_REWARDS = '14,000,000';

const calculateAPR = (rate: number, periods: number) => {
  return ((1 + rate / periods) ** periods - 1) * 100;
};

const tiers = [
  {
    lockupTime: 90 * 24 * 60 * 60,
    multiplier: 100,
    multiplierDecimals: 3,
    decimalMult: 0.1,
  },
  {
    lockupTime: 180 * 24 * 60 * 60,
    multiplier: 500,
    multiplierDecimals: 3,
    decimalMult: 0.5,
  },
  {
    lockupTime: 365 * 24 * 60 * 60,
    multiplier: 1100,
    multiplierDecimals: 3,
    decimalMult: 1.1,
  },
  {
    lockupTime: 730 * 24 * 60 * 60,
    multiplier: 1500,
    multiplierDecimals: 3,
    decimalMult: 1.5,
  },
  {
    lockupTime: 1460 * 24 * 60 * 60,
    multiplier: 2100,
    multiplierDecimals: 3,
    decimalMult: 2.1,
  },
];

export default function StakePreview() {
  const token = useToken();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallax = useParallaxEffect(parallaxRef);
  const [durationIndex, setDurationIndex] = useState(2);
  const [stakeAmount, setStakeAmount] = useState('10,000');
  const [totalStaked, setTotalStaked] = useState(DEFAULT_GLOBAL_STAKE);
  const [rewards, setRewards] = useState(DEFAULT_MONTHLY_REWARDS);

  const selectedTier = useMemo(() => tiers[durationIndex], [durationIndex]);

  const anticipatedMonthlyReward = useMemo(() => {
    if (!selectedTier) {
      return 0;
    }

    const amount = parseFloat(stakeAmount.replace(/,/g, ''));
    const mult = selectedTier?.decimalMult ?? 0;
    const multedAmount = amount * mult;
    const monthlyReward = parseFloat(rewards.replace(/,/g, ''));
    const rewardShare =
      multedAmount / parseFloat(totalStaked.replace(/,/g, ''));

    return rewardShare * monthlyReward;
  }, [rewards, selectedTier, stakeAmount, totalStaked]);

  const anticipatedMonthlyRewardAnimated = useAnimatedNumber(
    anticipatedMonthlyReward,
    {
      decimals: 2,
      duration: 300,
      locale: 'en-US',
    },
  );

  const apr = useMemo(
    () =>
      calculateAPR(
        anticipatedMonthlyReward / parseFloat(stakeAmount.replace(/,/g, '')),
        12,
      ).toFixed(2),
    [anticipatedMonthlyReward, stakeAmount],
  );

  const animatedAPR = useAnimatedNumber(apr, {
    decimals: 2,
    duration: 300,
  });

  const animatedDecimalMult = useAnimatedNumber(
    selectedTier?.decimalMult ?? 0,
    {
      decimals: 1,
      duration: 300,
    },
  );

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:gap-5 sm:p-5 md:grid-cols-2">
      <div className="w-full md:col-span-2">
        <h2 className="mb-3 text-heading">
          <CalculatorIcon className="mb-1 inline" /> Staking Simulator
        </h2>
        <p className="mb-4 text-xl font-medium leading-tight text-white/80">
          Curious about your potential rewards? Before the token launch, use
          this calculator to estimate how much you could earn based on your
          staking amount and the total staking pool.
        </p>
      </div>
      <Card className="grid gap-5 p-5 md:col-span-2 md:grid-cols-2 lg:gap-8">
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-xl font-medium">
              Step 1: Your Staked Amount
            </h2>
            <p className="mb-2 text-sm">
              How much {token.symbol} do you want to stake? Enter your amount
              below.
            </p>
            <Input
              align="right"
              onBlur={() =>
                setStakeAmount((v) => {
                  const parsed = parseFloat(v.replace(/,/g, ''));
                  return isNaN(parsed) ? v : parsed.toLocaleString();
                })
              }
              error={isNaN(parseFloat(stakeAmount.replace(/,/g, '')))}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              startAdornment={
                <span className="inline-flex items-center gap-1">
                  <span className="m-1.5 inline-flex size-8 flex-col items-center justify-center rounded-full bg-black p-1.5 text-primary">
                    <RealIcon className="size-full" />
                  </span>
                  {token.symbol}
                </span>
              }
              placeholder="0"
            />
          </div>
          <div>
            <h2 className="mb-2 text-xl font-medium">
              Step 2: Confirm Parameters
            </h2>
            <p className="mb-3 text-sm">
              We&apos;ve set up the calculator with what we feel are sensible
              defaults. You can change them to see how they&apos;ll affect your
              potential rewards.{' '}
              {(rewards !== DEFAULT_MONTHLY_REWARDS ||
                totalStaked !== DEFAULT_GLOBAL_STAKE) && (
                <button
                  className="text-primary"
                  onClick={() => {
                    setRewards(DEFAULT_MONTHLY_REWARDS);
                    setTotalStaked(DEFAULT_GLOBAL_STAKE);
                  }}
                >
                  Reset?
                </button>
              )}
            </p>
            <Input
              align="right"
              error={isNaN(parseFloat(totalStaked))}
              className="mb-3"
              value={totalStaked}
              onBlur={() =>
                setTotalStaked((v) => {
                  const parsed = parseFloat(v.replace(/,/g, ''));
                  return isNaN(parsed) ? v : parsed.toLocaleString();
                })
              }
              onChange={(e) => setTotalStaked(e.target.value)}
              startAdornment={
                <Popover>
                  <PopoverTrigger className="hover:text-primary">
                    <span className="inline-flex items-center gap-1 hover:text-primary">
                      <span className="m-1.5 inline-flex size-8 flex-col items-center justify-center rounded-full bg-black p-1.5 text-primary">
                        <RealIcon className="size-full" />
                      </span>
                      Total Stake
                      <QuestionMarkCircledIcon />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    This is the total amount of {token.symbol} staked globally
                    at an average 1.0x reward rate.
                  </PopoverContent>
                </Popover>
              }
              placeholder="0"
            />
            <Input
              align="right"
              className="mb-3"
              error={isNaN(parseFloat(rewards))}
              value={rewards}
              onBlur={() =>
                setRewards((v) => {
                  const parsed = parseFloat(v.replace(/,/g, ''));
                  return isNaN(parsed) ? v : parsed.toLocaleString();
                })
              }
              onChange={(e) => setRewards(e.target.value)}
              startAdornment={
                <Popover>
                  <PopoverTrigger className="hover:text-primary">
                    <span className="inline-flex items-center gap-1 hover:text-primary">
                      <span className="m-1.5 inline-flex size-8 flex-col items-center justify-center rounded-full bg-black p-1.5 text-primary">
                        <RealIcon className="size-full" />
                      </span>
                      Total Monthly Reward
                      <QuestionMarkCircledIcon />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    {DEFAULT_MONTHLY_REWARDS} {token.symbol} is guaranteed for
                    12 months after which we will transition to platform revenue
                    sharing. Change this number to estimate future earnings.
                  </PopoverContent>
                </Popover>
              }
              placeholder="0"
            />
          </div>
          <div>
            <h2 className="mb-3 text-xl">Step 3: Choose Your Lock Duration</h2>
            <div className="mb-3 flex flex-wrap gap-2">
              {tiers.map((tier, index) => (
                <Button
                  type="button"
                  key={index}
                  size="sm"
                  onClick={() => setDurationIndex(index)}
                  {...gradientTierButtonClasses[index]?.(
                    durationIndex === index,
                  )}
                >
                  {convertToReadableTime(Number(tier.lockupTime))}
                </Button>
              ))}
            </div>
            <p className="text-sm">
              Locking your tokens for a longer period of time will give you
              higher rewards.
            </p>
          </div>
        </div>

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
            <h2 className="flex flex-col gap-3 text-2xl font-medium">
              {selectedTier && (
                <div className="text-xl font-medium">
                  <span>You&apos;ll get </span>{' '}
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
                    {animatedDecimalMult}x
                  </span>{' '}
                  <span>the rewards</span>
                </div>
              )}
              <div className="text-heading font-medium">{animatedAPR}% APR</div>
              <div className="text-xl">
                ~{anticipatedMonthlyRewardAnimated}
                <span className="inline-flex items-center gap-1">
                  <span className="m-1.5 inline-flex size-8 flex-col items-center justify-center rounded-full bg-black p-1.5 text-primary">
                    <RealIcon className="size-full" />
                  </span>
                  {token.symbol}
                </span>
                <br />
                per month
              </div>
            </h2>
          </div>
        </div>
      </Card>
    </div>
  );
}
