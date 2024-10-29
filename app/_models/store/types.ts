declare global {
  type Store = {
    id: Number;
    name: string;
    location: string;
  };
  type StoreList = Store[];
}
export {};
