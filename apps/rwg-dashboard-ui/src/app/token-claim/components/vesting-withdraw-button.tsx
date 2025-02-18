import RealIcon from '@/components/real-icon';
import { Button } from '@/components/ui/button';
import { useVesting } from '@/hooks/useVesting';
import { cn } from '@/lib/cn';
import { formatBalanceTruncated } from '@/utils';
import assert from 'assert';
import { useMemo } from 'react';

type VestingSchedules = ReturnType<
  typeof useVesting
>['vestingSchedulesWithAmounts']['data'];

type VestingSchedule = NonNullable<VestingSchedules>[number];

export const VestingWithdrawButton = ({
  schedule,
  className,
}: {
  schedule: VestingSchedule;
} & Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'>) => {
  const { release } = useVesting();

  const withdraw = async () => {
    assert(schedule.id, 'Schedule id required');
    await release.mutateAsync({
      amount: schedule.releasableAmount,
      vestingScheduleId: schedule.id,
    });
  };

  const withdrawn = useMemo(
    () => schedule.amountTotal === schedule.released,
    [schedule.amountTotal, schedule.released],
  );

  return (
    <>
      <Button
        variant="neutral"
        loading={release.isPending}
        disabled={withdrawn || schedule.releasableAmount === 0n}
        size="sm"
        onClick={withdraw}
        className={cn(className, 'flex items-center')}
      >
        {withdrawn ? (
          <>Withdrawn {formatBalanceTruncated(schedule.amountTotal)}</>
        ) : (
          <>
            {release.isPending ? 'Withdrawing...' : 'Withdraw'}{' '}
            {formatBalanceTruncated(schedule.releasableAmount, {
              precision: 4,
            })}
          </>
        )}
        <RealIcon size="xs" />
      </Button>

      <p className="text-destructive empty:hidden">{release.error?.message}</p>
    </>
  );
};
