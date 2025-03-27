import { type FC, type PropsWithChildren, useState } from 'react';
import { useIsLoggedIn } from '@/lib/dynamic';
import { useDynamicAuthClickHandler } from '@/hooks/useDynamicAuthClickHandler';
import { useToken } from '@/hooks/useToken';
import {
  Skeleton,
  RealIcon,
  Label,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  cn,
} from '@bltzr-gg/ui';
import UniswapIcon from '@/assets/icons/uniswap.svg';
import { ArrowDownCircleIcon, CogIcon, FuelIcon } from 'lucide-react';
import useUniswap from '@/hooks/useUniswap';
import Eth from '@/assets/icons/chains/eth.svg';

const assetIcons = {
  ETH: <Eth className="ml-2 mt-0 size-8 p-1" />,
  $REAL: <RealIcon border={false} className="mt-0" />,
} as const;

export const Uniswap: FC<PropsWithChildren> = ({ children }) => {
  const { symbol } = useToken();
  const isLoggedIn = useIsLoggedIn();
  const auth = useDynamicAuthClickHandler();
  const {
    sortedAssets,
    selectedAsset,
    usdAmount,
    setAmount,
    flip,
    swap,
    swapQuoteResult,
    swapGasEstimate,
    slippage,
    setSlippage,
    txDeadlineMins,
    setTxDeadlineMins,
  } = useUniswap();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-black-800/30" />
      <DialogTrigger
        onClick={(e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            return auth();
          }
          setOpen(true);
        }}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent className="border-transparent bg-card px-5 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            Swap {symbol}
          </DialogTitle>
        </DialogHeader>
        <div
          className={cn('flex flex-col gap-4 rounded-xl p-4', {
            'border-primary/15 bg-primary/[4%]':
              selectedAsset === sortedAssets[0]!.idx,
          })}
        >
          <div className="flex items-end justify-between">
            <Label>Sell</Label>
            <Popover>
              <PopoverTrigger>
                <CogIcon className="ml-2 inline size-5 hover:text-primary active:text-primary" />
              </PopoverTrigger>
              <PopoverContent align="end" className="grid grid-cols-2 gap-2">
                <div className="mt-1">Max slippage</div>
                <Input
                  size="sm"
                  placeholder="70"
                  endAdornment={<span className="text-xs">%</span>}
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                />
                <div className="mt-1">Tx. deadline</div>
                <Input
                  size="sm"
                  placeholder="30"
                  endAdornment={<span className="text-xs">min</span>}
                  value={txDeadlineMins}
                  onChange={(e) => {
                    let val = parseInt(e.target.value) ?? 30;
                    // Max 3 days
                    if (val > 4320) {
                      val = 4320;
                    }
                    setTxDeadlineMins(val.toString());
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Input
              startAdornment={
                <>
                  <span className="mt-px inline-flex items-center gap-1">
                    {assetIcons[sortedAssets[0]!.label]}
                    {sortedAssets[0]!.label}
                  </span>
                </>
              }
              className={cn('h-11', {
                'border-destructive': false,
              })}
              placeholder="0"
              onChange={(e) => {
                setAmount(sortedAssets[0]!.idx, e.target.value);
              }}
              value={sortedAssets[0]!.amount}
            />
            {usdAmount > 0 && (
              <div className="ml-2 mt-2 text-sm">
                ${usdAmount.toLocaleString()}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <ArrowDownCircleIcon
            className="size-8 text-primary hover:cursor-pointer hover:fill-primary hover:text-black"
            onClick={flip}
          />
        </div>
        <div
          className={cn('flex flex-col gap-4 rounded-xl p-4', {
            'border-primary/15 bg-primary/[4%]':
              selectedAsset === sortedAssets[1]!.idx,
          })}
        >
          <Label>Buy</Label>
          <Input
            startAdornment={
              <span className="mt-px inline-flex items-center gap-1">
                {assetIcons[sortedAssets[1]!.label]}
                {sortedAssets[1]!.label}
              </span>
            }
            className={cn('h-11', {
              'border-destructive': false,
            })}
            placeholder="0"
            value={sortedAssets[1]!.amount}
            onChange={(e) => {
              setAmount(sortedAssets[1]!.idx, e.target.value);
            }}
          />
          {swapQuoteResult.isLoading && (
            <Skeleton className="h-12 w-full rounded-lg bg-muted" />
          )}
          {!swapQuoteResult.isLoading && (
            <Button
              onClick={() => swap.mutateAsync()}
              loading={swap.isPending}
              disabled={swapQuoteResult.isError}
            >
              {swap.isPending ? 'Swapping...' : 'Swap'}
            </Button>
          )}
          {swapGasEstimate > 0 && (
            <div className="ml-2 flex items-center justify-start gap-2 text-sm">
              <FuelIcon className="size-4" /> ${swapGasEstimate.toFixed(2)}
            </div>
          )}
        </div>
        {swapQuoteResult.isError && (
          <p className="max-h-32 overflow-auto break-all text-destructive">
            We&apos;re unable to get a quote for this swap. Please change the
            amounts and try again.
          </p>
        )}
        {swap.isError && (
          <p className="max-h-32 overflow-auto break-all text-destructive">
            {swap.error.message.replace('Error: ', '')}
          </p>
        )}
        <a href="https://app.uniswap.org" target="_blank">
          <div className="align-center flex justify-end gap-2 text-sm text-muted">
            Powered by <UniswapIcon className="fill-muted text-muted" />
          </div>
        </a>
      </DialogContent>
    </Dialog>
  );
};
