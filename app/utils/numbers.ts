export const randomNumber = (min: number = 1, max: number = 999) =>
  Math.floor(Math.random() * (max - min)) + min;
