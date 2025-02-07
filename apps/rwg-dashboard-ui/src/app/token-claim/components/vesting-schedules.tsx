import { Card } from '@/components/ui/card';
import { Indicator, Progress } from '@/components/ui/progress';
import dayjs from '@/dayjs';
import { useToken } from '@/hooks/useToken';
import { useVesting } from '@/hooks/useVesting';
import { formatBalance, formatBalanceTruncated } from '@/utils';
import { VestingWithdrawButton } from './vesting-withdraw-button';
import RealIcon from '@/components/real-icon';
import { cn } from '@/lib/cn';

export const VestingSchedules = () => {
  const token = useToken();
  const { vestingSchedulesWithAmounts } = useVesting();

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 text-sm xl:grid xl:grid-cols-7 xl:gap-2">
          <div className="hidden grid-cols-subgrid gap-5 px-5 text-xs xl:col-span-7 xl:grid">
            <h3>Total amount</h3>
            <h3>Cliff</h3>
            <h3>Duration</h3>
            <h3>Time remaining</h3>
            <h3>Vested amount</h3>
            <h3>Progress</h3>
          </div>
          {vestingSchedulesWithAmounts.data?.map((schedule) => (
            <Card
              key={schedule.id}
              className="grid grid-cols-3 items-center gap-4 rounded-2xl px-6 py-4 xl:col-span-7 xl:grid-cols-subgrid xl:gap-5"
            >
              <div className="col-span-2 xl:col-span-1">
                <div className="text-xs text-muted-foreground xl:hidden">
                  Total amount
                </div>
                {formatBalance(schedule.amountTotal)} <RealIcon size="xs" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground xl:hidden">
                  Cliff
                </div>
                {schedule.cliff - schedule.start === 0n
                  ? 'None'
                  : dayjs
                      .duration(
                        Number(schedule.cliff - schedule.start),
                        'seconds',
                      )
                      .humanize()}
              </div>
              <div>
                <div className="text-xs text-muted-foreground xl:hidden">
                  Duration
                </div>
                {dayjs
                  .duration(Number(schedule.duration), 'seconds')
                  .humanize()}
              </div>
              <div>
                <div className="text-xs text-muted-foreground xl:hidden">
                  Time remaining
                </div>
                {schedule.remaining === 0
                  ? 'Vested'
                  : dayjs.duration(schedule.remaining, 'seconds').humanize()}
              </div>
              <div>
                <div className="text-xs text-muted-foreground xl:hidden">
                  Vested amount
                </div>
                {formatBalanceTruncated(
                  schedule.released + schedule.releasableAmount,
                  {
                    precision: 4,
                  },
                )}{' '}
                {token.symbol}
              </div>
              <Progress className="col-span-3 mt-1.5 h-3 w-full xl:col-span-1">
                <Indicator
                  value={schedule.vestedPercentage}
                  variant="lighter"
                  className={cn({
                    'bg-accent':
                      schedule.vestedPercentage === 100 &&
                      schedule.amountTotal !== schedule.released,
                    'bg-primary/75': schedule.vestedPercentage !== 100,
                  })}
                />
              </Progress>
              <div className="align-right col-span-3 w-full xl:col-span-1 xl:w-auto">
                <VestingWithdrawButton
                  schedule={schedule}
                  className="w-full xl:w-auto"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
