export type Transfer = {
  hash: string;
  token: "sReal" | "Real";
  from: string;
  to: string;
  value: string;
};
