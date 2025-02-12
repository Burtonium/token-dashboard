export const formatUnixDate = (unixMillis: number) =>
  new Date(unixMillis * 1000).toLocaleString();
