import { Button } from '@bltzr-gg/ui';
import { Card, CardContent, CardTitle } from '@bltzr-gg/ui';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@bltzr-gg/ui';
import { Input } from '@bltzr-gg/ui';
import dayjs from '@/dayjs';
import { useVesting } from '@/hooks/useVesting';
import { cn } from '@bltzr-gg/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { parseEther } from 'viem';
import { z } from 'zod';

const CreateScheduleSchema = z.object({
  address: z.string().length(42, { message: 'Address must be 42 characters' }),
  startTime: z.coerce.date().transform((v) => Math.floor(v.getTime() / 1000)),
  cliff: z.coerce.number().min(0),
  duration: z.coerce.number().min(0),
  slicePeriod: z.coerce.number().min(1),
  amount: z.coerce.number().min(0),
});

type CreateScheduleValues = z.infer<typeof CreateScheduleSchema>;

export const CreateVestingSchedule = () => {
  const { createVestingSchedule } = useVesting();

  const createScheduleForm = useForm<CreateScheduleValues>({
    defaultValues: {
      startTime: Math.floor(Date.now() / 1000),
    },
    resolver: zodResolver(CreateScheduleSchema),
  });

  const startTime = createScheduleForm.watch('startTime');
  const cliff = createScheduleForm.watch('cliff');
  const duration = createScheduleForm.watch('duration');
  const slicePeriod = createScheduleForm.watch('slicePeriod');

  const humanizedStartTime = useMemo(
    () => dayjs.unix(startTime).local().format('MMM D, YYYY h:mm A'),
    [startTime],
  );

  const onCreateSchedule = (values: CreateScheduleValues) => {
    const amount = parseEther(values.amount.toString());

    return createVestingSchedule.mutateAsync({
      beneficiary: values.address as `0x${string}`,
      start: BigInt(values.startTime),
      cliff: BigInt(values.cliff),
      duration: BigInt(values.duration),
      slicePeriodSeconds: BigInt(values.slicePeriod),
      revocable: true,
      amount,
    });
  };

  return (
    <Card className="p-4">
      <CardTitle className="mb-4">Create vesting schedule</CardTitle>
      <CardContent className="p-0">
        <Form {...createScheduleForm}>
          <form
            onSubmit={createScheduleForm.handleSubmit(onCreateSchedule)}
            className="flex max-w-md flex-col gap-3"
          >
            <FormField
              control={createScheduleForm.control}
              name="address"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Beneficiary address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn('w-full', {
                        'border-destructive': formState.errors.address,
                      })}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={createScheduleForm.control}
              name="startTime"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Start time</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        {...field}
                        className={cn('w-48', {
                          'border-destructive': formState.errors.startTime,
                        })}
                      />
                    </FormControl>
                    <div>
                      <div>{humanizedStartTime}</div>{' '}
                      <div className="text-xs">(local time)</div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        createScheduleForm.setValue(
                          'startTime',
                          Math.floor(Date.now() / 1000),
                        )
                      }
                    >
                      Now
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={createScheduleForm.control}
              name="cliff"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Cliff</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        {...field}
                        className={cn('w-48', {
                          'border-destructive': formState.errors.cliff,
                        })}
                        endAdornment="seconds"
                      />
                    </FormControl>
                    {cliff && (
                      <div>
                        ({dayjs.duration(cliff, 'seconds').humanize(false)})
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    How long before tokens start to be released
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={createScheduleForm.control}
              name="duration"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        {...field}
                        className={cn('w-48', {
                          'border-destructive': formState.errors.duration,
                        })}
                        endAdornment="seconds"
                      />
                    </FormControl>
                    {duration && (
                      <div>
                        ({dayjs.duration(duration, 'seconds').humanize(false)})
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    How long the vesting schedule lasts
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={createScheduleForm.control}
              name="slicePeriod"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Slice period</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        {...field}
                        className={cn('w-48', {
                          'border-destructive': formState.errors.slicePeriod,
                        })}
                        endAdornment="seconds"
                      />
                    </FormControl>
                    {slicePeriod && (
                      <div>
                        (
                        {dayjs.duration(slicePeriod, 'seconds').humanize(false)}
                        )
                      </div>
                    )}
                  </div>
                  <FormDescription>
                    How often tokens are released for claiming
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={createScheduleForm.control}
              name="amount"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn('w-48', {
                        'border-destructive': formState.errors.amount,
                      })}
                      endAdornment="$REAL ether"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="my-6"
              loading={createVestingSchedule.isPending}
            >
              Issue tokens
            </Button>
            {createVestingSchedule.error && (
              <p className="text-destructive empty:hidden">
                {createVestingSchedule.error.message}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
