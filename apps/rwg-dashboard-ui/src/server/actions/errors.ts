export type ServerActionError = {
  type: 'ServerActionError';
  message: string;
  error: true;
};

export const constructError = (message: string): ServerActionError => ({
  type: 'ServerActionError',
  message,
  error: true,
});
