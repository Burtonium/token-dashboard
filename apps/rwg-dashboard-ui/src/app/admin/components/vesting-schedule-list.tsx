import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from '@/dayjs';
import { useVesting } from '@/hooks/useVesting';
import { cn } from '@/lib/cn';
import { formatUnixDate } from '@/utils/formatUnixDate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatEther } from 'viem';

export const VestingScheduleList = () => {
  const {
    totalVestingSchedulesCount,
    getVestingIdsAtIndices,
    getVestingSchedulesByIds,
    revoke,
  } = useVesting();

  const schedules = useInfiniteQuery({
    queryKey: [
      'vestingSchedules',
      { first: 10, totalVestingSchedulesCount },
    ] as const,
    queryFn: async ({
      pageParam,
      queryKey: [, { first, totalVestingSchedulesCount }],
    }) => {
      const totalCount = pageParam * first + first;
      const diff = Number(totalVestingSchedulesCount) - totalCount;
      if (diff <= 0) {
        return [];
      }

      const length = diff < first ? diff : first;

      const indices = Array.from({ length }, (_, i) => i + pageParam * first);
      const ids = await getVestingIdsAtIndices(indices);

      const schedules = await getVestingSchedulesByIds(ids);
      return schedules.map((schedule, idx) => ({
        ...schedule,
        index: indices[idx],
        id: ids[idx],
      }));
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length === 0 ? undefined : lastPageParam + 1,
  });

  const revokeSchedule = async (id: `0x${string}`) => {
    await revoke.mutateAsync(id);

    return schedules.refetch();
  };

  return (
    <div>
      <h3 className="mb-4 text-xl">Vesting schedule list</h3>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Beneficiary</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>Cliff</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.data?.pages
            .flatMap((p) => p)
            .map((schedule) => (
              <>
                <TableRow
                  key={schedule.id}
                  className={cn({
                    'line-through': schedule.revoked,
                  })}
                >
                  <TableCell>{schedule.beneficiary}</TableCell>
                  <TableCell>
                    {formatUnixDate(Number(schedule.start))}
                  </TableCell>
                  <TableCell>
                    {schedule.cliff - schedule.start === 0n
                      ? 'None'
                      : dayjs
                          .duration(
                            Number(schedule.cliff - schedule.start),
                            'seconds',
                          )
                          .humanize()}
                  </TableCell>
                  <TableCell>
                    {dayjs
                      .duration(Number(schedule.duration), 'seconds')
                      .humanize()}
                  </TableCell>
                  <TableCell>
                    {formatEther(schedule.amountTotal)} $REAL
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revokeSchedule(schedule.id!)}
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
      <Button
        size="sm"
        onClick={() => schedules.fetchNextPage()}
        disabled={!schedules.hasNextPage}
        loading={schedules.isFetchingNextPage}
        className="mt-4"
      >
        Load more
      </Button>
    </div>
  );
};
