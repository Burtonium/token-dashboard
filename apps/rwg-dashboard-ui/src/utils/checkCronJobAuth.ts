import { env, isDev } from '@/env';
import type { NextRequest } from 'next/server';

export const checkCronJobAuth = (request: NextRequest) => {
  if (isDev) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${env.CRON_SECRET}`;
};
