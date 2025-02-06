'use server';

import { authGuard } from '@/server/auth';
import { getTrackedBalances as getTra } from '@/server/clientUnsafe/getTrackedBalances';

export const getTrackedBalances = authGuard(getTra);
