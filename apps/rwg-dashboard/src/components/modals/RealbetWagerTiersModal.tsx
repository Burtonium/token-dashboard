import { type FC, type PropsWithChildren, useState } from 'react';
import {
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Scrollable,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@bltzr-gg/ui';
import { vipTiers } from '@bltzr-gg/realbet-api';
import { formatWithSeparators } from '@/utils';
import { useRealbetProgression } from '@/hooks/useRealbetProgression';

const RealbetWagerTiersModal: FC<PropsWithChildren> = ({ children }) => {
  const currentRank = useRealbetProgression()?.data?.wagerLevel?.data?.vipLevel;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-black-800/30" />
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-transparent bg-zinc-950 px-2 sm:max-w-xl">
        <DialogHeader className="px-4">
          <DialogTitle className="font-normal">
            REALBET.IO VIP TIERS
          </DialogTitle>
        </DialogHeader>
        <Scrollable className="max-h-[80vh] w-full overflow-hidden px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/5">Wagered</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Cashback</TableHead>
              </TableRow>
            </TableHeader>
            {vipTiers.map((item, index) => (
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
                    ${formatWithSeparators(item.totalWager)}
                  </TableCell>
                  <TableCell
                    className={cn({
                      'border border-x-0 border-primary': index === currentRank,
                    })}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    className={cn({
                      'border border-l-0 border-primary text-primary':
                        index === currentRank,
                    })}
                  >
                    +{(item.cashback * 100).toFixed(0)}% Cashback
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

export default RealbetWagerTiersModal;
