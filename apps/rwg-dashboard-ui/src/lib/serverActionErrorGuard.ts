/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ServerActionError } from '@/server/actions/errors';

export function isServerActionError(
  value: unknown,
): value is ServerActionError {
  return (
    (value as any).type === 'ServerActionError' &&
    (value as any).error === true &&
    typeof (value as any).message === 'string'
  );
}

export type ExcludeServerActionError<T> = T extends ServerActionError
  ? never
  : T;

export const serverActionErrorGuard = async <T = unknown>(
  promise: Promise<T>,
) => {
  let result;
  try {
    result = await promise;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error('Internal Server Error');
  }

  if (isServerActionError(result)) {
    throw new Error(result.message);
  }

  return result as ExcludeServerActionError<T>;
};
