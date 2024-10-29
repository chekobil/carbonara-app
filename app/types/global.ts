declare global {
  type GenericIngredients = Record<string, number>;

  interface Store {
    id: Number;
    name: string;
    location: string;
  }
  type StoreList = Store[];
}
export {};
