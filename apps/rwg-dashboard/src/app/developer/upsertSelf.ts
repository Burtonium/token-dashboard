'use server';

import { isDev } from '@/env';
import {
  upsertDynamicUser,
  type User,
} from '@/server/server-only/upsertDynamicUser';
import assert from 'assert';

export const upsertSelf = async (user: User) => {
  assert(isDev, 'Not in dev mode');
  return upsertDynamicUser(user);
};
