declare global {
  type GenericIngredients = Record<string, number>;
  type GenericUnits = Record<string, string>;

  interface SelectWithOptions {
    name: string;
    options: number[];
  }

  interface Store {
    id: Number;
    name: string;
    location: string;
  }
  type StoreList = Store[];
}
export {};
