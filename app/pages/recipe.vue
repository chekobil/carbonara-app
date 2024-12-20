<template>
  <section class="recipe-wrapper">
    <CarbonaraHeader />
    <div class="recipe-container">
      <div class="recipe-item recipe-ingredients bg-base-200">
        <h3>
          <Icon name="tabler:clipboard-list" />
          Ingredients
        </h3>
        <h5><Icon name="tabler:user" /> {{ recipeAmount }} servings</h5>
        <ul class="ingredients-list">
          <li v-for="name in ingredientsNames" :key="name">
            <span>{{ name }}</span>
            <span
              >{{ recipeIngredients[name] }}
              <small>{{ units[name] }}</small></span
            >
          </li>
        </ul>
        <button
          class="mt-2 btn btn-primary btn-xs btn-outline"
          @click="handleGoToHome"
        >
          Change ingredients
        </button>
      </div>
      <div class="recipe-item recipe-instructions">
        <h3>
          <Icon name="tabler:cooker" />
          Instructions
        </h3>
        <CarbonaraInstructions />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { units, ingredients } from "~/_models/carbonara/carbonara";
const router = useRouter();
const { recipeAmount } = useRecipeStore();

const recipeIngredients = computed(() => {
  const result: CarbonaraIngredients = {};
  Object.keys(ingredients).forEach((key) => {
    const recipeValue =
      (Number(ingredients[key]) ?? 0) * Number(unref(recipeAmount));
    result[key] = recipeValue;
  });
  return result;
});
const ingredientsNames = computed(() => {
  return Object.keys(ingredients);
});
const handleGoToHome = () => {
  router.push({ path: "/" });
};
</script>

<style lang="scss">
.recipe-container {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: flex-start;
  .recipe-item {
    width: 100%;
    padding: 1rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &.recipe-ingredients {
      padding: 2rem 1.4rem;
      flex: 1;
      align-items: center;
    }
    &.recipe-instructions {
      flex: 3;
      align-items: flex-start;
    }
    h3 {
      font-size: 1.4rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .ingredients-list {
      > li {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
  @media (min-width: 700px) {
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: flex-start;
    .recipe-item {
      &.recipe-ingredients {
        position: sticky;
        top: 0;
      }
    }
  }
}
</style>
