// src/utils/store.ts
type Rakeback = {
  userId: number;
  rate: number;
  updatedAt: Date;
  description: string | null;
};

const rakebacks: Record<number, Rakeback> = {};

export const setItem = (key: number, value: Rakeback) => {
  rakebacks[key] = value;
};

export const getItem = (key: number) => {
  return rakebacks[key];
};

export const deleteItem = (key: number) => {
  delete rakebacks[key];
};
