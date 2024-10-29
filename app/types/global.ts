declare global {
  type GenericIngredients = Record<string, number>;
  type GenericUnits = Record<string, string>;

  interface SelectWithOptions {
    name: string;
    options: number[];
  }
}
export {};
