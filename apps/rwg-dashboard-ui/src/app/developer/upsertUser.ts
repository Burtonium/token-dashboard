import { isDev } from '@/env';
import {
  upsertDynamicUser_clientUnsafe,
  type User,
} from '@/server/clientUnsafe/upsertDynamicUser';
import assert from 'assert';

export const upsertSelf = async (user: User) => {
  assert(isDev, 'Not in dev mode');
  return upsertDynamicUser_clientUnsafe(user);
};
