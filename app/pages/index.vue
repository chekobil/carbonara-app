<template>
  <div class="carbonara-form-container">
    <CarbonaraForm @change="handleChangeIngredients">
      <div v-if="recipeAmount < 0" class="carbonara-response-container">
        Add some ingredients
      </div>
      <div v-else-if="!recipeAmount" class="carbonara-response-container">
        Its not possible to make a Carbonara with your ingredients
      </div>
      <div v-else class="carbonara-response-container">
        You can make a Carbonara for {{ recipeAmount }}
        <button
          class="btn btn-primary btn-outline btn-sm max-w-40 self-end"
          :disabled="recipeIsNotInSync"
          @click="handleViewRecipe"
        >
          View recipe
        </button>
      </div>
    </CarbonaraForm>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { setRecipeAmount } = useRecipeStore();
const { carbonaraCalculator } = useCarbonaraCalculator();

const userIngredients: Ref<CarbonaraIngredients> = ref({});
const recipeAmount: Ref<number> = ref(-1);

const recipeIsNotInSync = computed(() => {
  return !unref(recipeAmount);
});

const handleChangeIngredients = (details: any) => {
  userIngredients.value = unref(details);
  const newRecipeAmount = carbonaraCalculator(unref(details));
  recipeAmount.value = newRecipeAmount;
  setRecipeAmount(newRecipeAmount);
};

const handleViewRecipe = () => {
  router.push({ path: "/recipe" });
};
</script>
<style lang="scss">
.carbonara-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .carbonara-response-container {
    margin-top: 1.2rem;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
}
</style>
