import { type FC, type PropsWithChildren, useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@bltzr-gg/ui';

const EarlyUnstakeWarningModal: FC<
  PropsWithChildren<{
    onConfirm: () => void;
    bypass: boolean;
  }>
> = ({ onConfirm, children, bypass }) => {
  const [open, setOpen] = useState(false);

  const _onConfirm = useCallback(() => {
    onConfirm();
    setOpen(false);
  }, [onConfirm, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="bg-black-800/30" />
      <DialogTrigger
        onClick={(e) => {
          if (bypass) {
            e.preventDefault();
            return onConfirm();
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
            Early Unstake
          </DialogTitle>
        </DialogHeader>
        <p>You are attempting to unstake before the lock period has ended.</p>
        <p>
          This will result in an <strong>80% tax</strong> on your staked amount.
          <br />
          Are you sure you want to proceed?
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={_onConfirm}>Unstake</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EarlyUnstakeWarningModal;
