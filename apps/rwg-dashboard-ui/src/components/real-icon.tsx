import { cva } from 'class-variance-authority';
import Icon from '@/assets/images/R.svg';
import { cn } from '@/lib/cn';

type Props = {
  border?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
};

const iconClass = cva(
  'ml-2 inline-flex flex-col items-center justify-center rounded-full bg-black text-primary',
  {
    variants: {
      border: {
        true: 'border-primary',
        false: 'border-black',
      },
      size: {
        lg: 'border-2 size-12 p-1.5 mt-1',
        md: 'border-2 size-8 p-1 mt-1',
        sm: 'border size-6 p-1 mt-1',
        xs: 'border size-5 p-[3px]',
      },
    },
    defaultVariants: {
      border: true,
      size: 'md',
    },
  },
);

export default function RealIcon({ border, size, className }: Props) {
  return (
    <span className={cn(iconClass({ border, size }), className)}>
      <Icon className="size-full" />
    </span>
  );
}
