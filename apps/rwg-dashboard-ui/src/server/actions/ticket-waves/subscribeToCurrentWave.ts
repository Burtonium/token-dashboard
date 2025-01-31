'use server';

import { authGuard } from '@/server/auth';
import { subscribeToWave_clientUnsafe } from '@/server/clientUnsafe/subscribeToWave';

export const subscribeToCurrentWave = authGuard(subscribeToWave_clientUnsafe);
