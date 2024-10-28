declare global {
  type IngredientList = {
    test?: Number;
  };
  interface Store {
    id: Number;
    name: string;
    location: string;
  }
  type StoreList = Store[];
}
export {};
