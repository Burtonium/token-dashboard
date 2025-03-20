'use client';

import { Button } from '@bltzr-gg/ui';
import { Card, CardContent, CardTitle } from '@bltzr-gg/ui';
import { Input } from '@bltzr-gg/ui';
import { useRef, useState } from 'react';
import Papa, { type ParseStepResult } from 'papaparse';
import { Popover, PopoverContent, PopoverTrigger } from '@bltzr-gg/ui';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@bltzr-gg/ui';
import { truncateAddress } from '@/utils/truncateAddress';
import { useVesting } from '@/hooks/useVesting';
import { parseEther } from 'viem';

const columns = [
  'beneficiaryAddress',
  'startTime',
  'cliff',
  'duration',
  'slicePeriod',
  'amount',
] as const;
type ColumnType = (typeof columns)[number];

type CsvRow = {
  [K in ColumnType]: K extends 'beneficiaryAddress' ? `0x${string}` : string;
};

const sampleCsv = `${columns.join(',')}\n
0x19778E11bcfF24Fb20a4F05a00624EAa3a98ceFa,2025-03-01T10:00Z,120,300,1,100`;
const sampleCsvHref = `data:text/csv;base64,${btoa(unescape(encodeURIComponent(sampleCsv)))}`;

const parsePromise = function <T>(file: File) {
  return new Promise<ParseStepResult<T[]>>(function (complete, error) {
    Papa.parse<T>(file, { complete, error, header: true });
  });
};

export const ImportVestingSchedules = () => {
  const { createVestingSchedule } = useVesting();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [schedulesToImport, setSchedulesToImport] = useState<
    (CsvRow & { id: number })[]
  >([]);
  const [issuedSchedules, setIssuedSchedules] = useState<
    Record<number, `0x${string}`>
  >({});

  const onUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      return;
    }

    const parsedFile = await parsePromise<CsvRow>(file);

    const schedules = parsedFile.data
      .filter((x) => x.beneficiaryAddress.length > 0)
      .map((schedule, idx) => ({
        ...schedule,
        id: idx,
      }));

    setSchedulesToImport(schedules);
  };

  const issueVesting = async (id: number) => {
    const schedule = schedulesToImport.find((s) => s.id === id);
    if (!schedule) {
      return;
    }

    const tx = await createVestingSchedule.mutateAsync({
      beneficiary: schedule.beneficiaryAddress,
      start: BigInt(new Date(schedule.startTime).getTime() / 1000),
      cliff: BigInt(schedule.cliff),
      duration: BigInt(schedule.duration),
      slicePeriodSeconds: BigInt(schedule.slicePeriod),
      revocable: true,
      amount: parseEther(schedule.amount),
    });

    setIssuedSchedules((prev) => ({ ...prev, [id]: tx }));
  };

  return (
    <Card className="mb-4 p-4">
      <CardTitle className="mb-4">Import vesting schedules</CardTitle>
      <CardContent className="p-0">
        <Input type="file" className="mb-2" ref={fileRef} />
        <div className="flex items-center justify-between">
          <div>
            <a
              href={sampleCsvHref}
              download="vesting-sample.csv"
              className="text-sm text-primary"
            >
              Download sample CSV
            </a>
            <Popover>
              <PopoverTrigger>
                <QuestionMarkCircledIcon className="ml-2 mt-0 inline size-4 hover:text-primary active:text-primary" />
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[600px]">
                The CSV columns are:
                <Table className="w-[600px]">
                  <TableBody>
                    <TableRow>
                      <TableCell>Beneficiary address</TableCell>
                      <TableCell>
                        Wallet address of the recipient of tokens
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Start time</TableCell>
                      <TableCell>
                        ISO8601 timestamp when the vesting schedule starts
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cliff</TableCell>
                      <TableCell>
                        Cliff, in seconds. If there is no cliff, set to 0.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Duration</TableCell>
                      <TableCell>
                        Duration of the vesting schedule, in seconds.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Slice period</TableCell>
                      <TableCell>
                        The interval for releasing tokens, in seconds. For
                        example, a value of 1 means tokens can be withdrawn
                        every second.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>
                        Amount of tokens, in ether denomination.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            type="submit"
            size="sm"
            className="float-right"
            onClick={onUpload}
          >
            Import
          </Button>
        </div>
        {schedulesToImport.length > 0 && (
          <>
            <div className="my-4 font-bold">Schedules to import:</div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableCell>Beneficiary address</TableCell>
                  <TableCell>Start time</TableCell>
                  <TableCell>Cliff</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Slice period</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell />
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedulesToImport.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      {truncateAddress(schedule.beneficiaryAddress)}{' '}
                    </TableCell>
                    <TableCell>{schedule.startTime}</TableCell>
                    <TableCell>{schedule.cliff}</TableCell>
                    <TableCell>{schedule.duration}</TableCell>
                    <TableCell>{schedule.slicePeriod}</TableCell>
                    <TableCell>{schedule.amount}</TableCell>
                    <TableCell>
                      {!issuedSchedules[schedule.id] && (
                        <Button
                          size="sm"
                          onClick={() => issueVesting(schedule.id)}
                          loading={createVestingSchedule.isPending}
                        >
                          Issue
                        </Button>
                      )}
                      {issuedSchedules[schedule.id] && (
                        <>{issuedSchedules[schedule.id]}</>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
};
