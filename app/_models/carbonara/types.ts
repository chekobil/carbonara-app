declare global {
  type CarbonaraIngredient =
    | "pasta"
    | "bacon"
    | "eggs"
    | "milk"
    | "butter"
    | "oil";
  type CarbonaraIngredients = Record<CarbonaraIngredient | string, number>;
  type CarbonaraUnits = GenericUnits;
}
export {};
