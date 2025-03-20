'use server';

import { authGuard } from '@/server/auth';
import { getTrackedBalances as getTra } from '@/server/server-only/getTrackedBalances';

export const getTrackedBalances = authGuard(getTra);
