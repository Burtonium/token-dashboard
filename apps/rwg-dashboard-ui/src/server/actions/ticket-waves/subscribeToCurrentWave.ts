'use server';

import { authGuard } from '@/server/auth';
import { subscribeToWave } from '@/server/server-only/subscribeToWave';

export const subscribeToCurrentWave = authGuard(subscribeToWave);
