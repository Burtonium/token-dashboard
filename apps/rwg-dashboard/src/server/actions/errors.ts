import { captureMessage } from '@sentry/nextjs';

export type ServerActionError = {
  type: 'ServerActionError';
  message: string;
  error: true;
};

export const constructError = (message: string): ServerActionError => {
  captureMessage(`ServerActionError: ${message}`);

  return {
    type: 'ServerActionError',
    error: true,
    message,
  };
};
