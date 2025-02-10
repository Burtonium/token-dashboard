import { formatBalanceTruncated } from '@/utils';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useMemo } from 'react';
import { useVesting } from '@/hooks/useVesting';
import { cn } from '@/lib/cn';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import RealIcon from '@/components/real-icon';
import { Skeleton } from '@/components/ui/skeleton';

const colors = {
  vesting: 'bg-primary',
  vested: 'bg-white/55',
  withdrawn: 'bg-white',
} as const;

export default function VestingIndicator() {
  const { sdkHasLoaded } = useDynamicContext();

  const { vestingSchedulesWithAmounts } = useVesting();

  const vestingData = useMemo(() => {
    if (!vestingSchedulesWithAmounts.data) {
      return {
        vesting: {
          amount: 0n,
          percentage: 0,
        },
        vested: {
          amount: 0n,
          percentage: 0,
        },
        withdrawn: {
          amount: 0n,
          percentage: 0,
        },
      };
    }

    const { total, releasable, released } =
      vestingSchedulesWithAmounts.data.reduce(
        (acc, schedule) => ({
          total: acc.total + schedule.amountTotal,
          releasable: acc.releasable + schedule.releasableAmount,
          released: acc.released + schedule.released,
        }),
        {
          total: 0n,
          releasable: 0n,
          released: 0n,
        },
      );

    const vesting = total - releasable - released;

    const percentage = (val: bigint) =>
      Number(total > 0n ? (val * 10000n) / total : 0n) / 100;

    return {
      vested: {
        amount: releasable,
        percentage: percentage(releasable),
      },
      vesting: {
        amount: vesting,
        percentage: percentage(vesting),
      },
      withdrawn: {
        amount: released,
        percentage: percentage(released),
      },
    };
  }, [vestingSchedulesWithAmounts]);

  const vestingAmountAnimated = useAnimatedNumber(
    formatBalanceTruncated(vestingData.vesting.amount),
    {
      decimals: 0,
      duration: 300,
    },
  );

  const withdrawnAmountAnimated = useAnimatedNumber(
    formatBalanceTruncated(vestingData.withdrawn.amount),
    {
      decimals: 0,
      duration: 300,
    },
  );

  const vestedAmountAnimated = useAnimatedNumber(
    formatBalanceTruncated(vestingData.vested.amount),
    {
      decimals: 0,
      duration: 300,
    },
  );

  return (
    <>
      <div className="mb-6 flex justify-between">
        <div className="flex grow gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`inline-block size-2 rounded-full ${colors.vesting}`}
              />
              Vesting
            </div>
            <div className="flex items-center text-xl">
              {vestingSchedulesWithAmounts.isLoading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                vestingAmountAnimated
              )}
              <RealIcon size="xs" />
            </div>
          </div>
          <div
            className="flex flex-col gap-2"
            style={{
              marginLeft: `${vestingData.vesting.percentage}%`,
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`inline-block size-2 rounded-full ${colors.withdrawn}`}
              />
              Withdrawn
            </div>
            <div className="flex items-center text-xl">
              {vestingSchedulesWithAmounts.isLoading ? (
                <Skeleton className="h-6 w-24 rounded-full" />
              ) : (
                withdrawnAmountAnimated
              )}
              <RealIcon size="xs" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`inline-block size-2 rounded-full ${colors.vested}`}
            />
            Vested
          </div>
          <div className="flex items-center text-xl">
            {vestingSchedulesWithAmounts.isLoading ? (
              <Skeleton className="h-6 w-24 rounded-full" />
            ) : (
              vestedAmountAnimated
            )}
            <RealIcon size="xs" />
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex h-[10px] w-full overflow-hidden rounded-full bg-lighter',
          {
            'animate-pulse': !sdkHasLoaded,
          },
        )}
      >
        <div
          style={{
            width: `${vestingData.vesting.percentage}%`,
          }}
          className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden text-nowrap transition-all delay-200 duration-1000',
            colors.vesting,
          )}
        ></div>
        <div
          style={{
            width: `${vestingData.withdrawn.percentage}%`,
          }}
          className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden text-nowrap bg-primary/75 transition-all delay-100 duration-1000',
            colors.withdrawn,
          )}
        ></div>
        <div
          style={{
            width: `${vestingData.vested.percentage}%`,
          }}
          className={cn(
            'flex shrink-0 items-center justify-center overflow-hidden text-nowrap bg-primary transition-all duration-1000',
            colors.vested,
          )}
        ></div>
      </div>
    </>
  );
}
