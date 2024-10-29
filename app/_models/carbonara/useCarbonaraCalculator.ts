import { unref } from "vue";
import type { Ref } from "vue";
import { calculator } from "../recipe/calculator";
import { ingredients } from "./carbonara";

export function useCarbonaraCalculator() {
  const carbonaraCalculator = (
    userIngredientsRaw: CarbonaraIngredients | Ref<CarbonaraIngredients>
  ) => {
    return calculator(ingredients, unref(userIngredientsRaw));
  };
  return {
    carbonaraCalculator,
    baseIngredients: ingredients,
  };
}
