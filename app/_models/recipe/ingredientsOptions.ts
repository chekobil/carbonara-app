export const getSelectOptionsFromIngredients = (
  ingredients: GenericIngredients,
  units: GenericUnits
) => {
  const result: SelectWithOptions[] = [];
  return Object.keys(ingredients).map((key: string | CarbonaraIngredient) => {
    const ingredientValue = ingredients[key] as number;
    const ingredientUnit = units[key] as string;
    const options = getOptionsForAmount(ingredientValue);
    return {
      name: key,
      default: ingredientValue,
      units: ingredientUnit,
      options,
    };
  });
};

const getOptionsForAmount = (amount: number): number[] => {
  return [
    0,
    (2 / 4) * amount,
    amount,
    (6 / 4) * amount,
    (8 / 4) * amount,
    (10 / 4) * amount,
  ];
};
