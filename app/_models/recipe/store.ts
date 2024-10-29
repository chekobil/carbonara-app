import { defineStore } from "pinia";
export const useRecipeStore = defineStore("recipe", () => {
  const userIngredients: Ref<GenericIngredients | null> = ref(null);
  const recipeAmount: Ref<number> = ref(0);

  const setUserIngredients = (payload: GenericIngredients) => {
    userIngredients.value = payload;
  };
  const setRecipeAmount = (payload: number) => {
    recipeAmount.value = payload;
  };
  const getUserIngredients = computed(() => userIngredients);
  return {
    userIngredients,
    recipeAmount,
    getUserIngredients,
    setUserIngredients,
    setRecipeAmount,
  };
});
