'use client';

import React, { type PropsWithChildren } from 'react';
import { cn } from '@bltzr-gg/ui';
import completedImg from '@/assets/images/quests/completed.png';

const Quest: React.FC<
  PropsWithChildren & {
    className?: string;
    image: string;
    completed: boolean;
    loading?: boolean;
  }
> = ({ children, image, completed, className, loading }) => {
  return (
    <div
      className={cn(
        'relative flex items-center rounded-3xl bg-cover px-4 py-12 md:px-6',
        { 'animate-pulse': loading },
        className,
      )}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {completed && (
        <>
          <div className="absolute inset-0 z-30 rounded-3xl bg-black opacity-75"></div>
          <img
            src={completedImg.src}
            className="absolute bottom-0 right-0 z-40 w-3/5"
            alt=""
          />
        </>
      )}

      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default Quest;
