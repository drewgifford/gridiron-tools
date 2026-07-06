export const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomInt = (min: number, max: number) =>
  Math.floor(randomFloat(min, max + 1));

export const pick = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));
