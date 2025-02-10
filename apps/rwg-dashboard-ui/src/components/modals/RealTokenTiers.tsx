import { type FC, type PropsWithChildren, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Scrollable } from '../ui/scrollable';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';
import { formatWithSeparators } from '@/utils';
import { cn } from '@/lib/cn';
import {
  useRealbetProgression,
  rakebackTiers,
} from '@/hooks/useRealbetProgression';

const StakingTiers: FC<PropsWithChildren> = ({ children }) => {
  const currentRank = useRealbetProgression()?.data.rakeback.level?.rank;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-black-800/30" />
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-transparent bg-zinc-950 px-2 sm:max-w-xl">
        <DialogHeader className="px-4">
          <DialogTitle className="font-normal">REAL TOKEN TIERS</DialogTitle>
        </DialogHeader>
        <Scrollable className="max-h-[80vh] w-full overflow-hidden px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Staked + Balance</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Rakeback</TableHead>
              </TableRow>
            </TableHeader>
            {rakebackTiers.map((tier, index) => (
              <TableBody key={index}>
                <TableRow
                  className={cn({
                    'bg-primary/20 hover:bg-primary/30': index === currentRank,
                  })}
                >
                  <TableCell
                    className={cn({
                      'border border-r-0 border-primary': index === currentRank,
                    })}
                  >
                    ${formatWithSeparators(tier.threshold)}
                  </TableCell>
                  <TableCell
                    className={cn({
                      'border border-x-0 border-primary': index === currentRank,
                    })}
                  >
                    {tier.rank}
                  </TableCell>
                  <TableCell
                    className={cn({
                      'border border-l-0 border-primary text-primary':
                        index === currentRank,
                    })}
                  >
                    +{(tier.rate * 100).toFixed(0)}% Rakeback
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Scrollable>
      </DialogContent>
    </Dialog>
  );
};

export default StakingTiers;
