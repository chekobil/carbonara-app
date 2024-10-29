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
        Today, Carbonara for {{ recipeAmount }}
        <button
          class="btn btn-primary btn-outline btn-sm max-w-40 self-end"
          :disabled="!recipeAmount"
          @click="handleViewRecipe"
        >
          View recipe
        </button>
      </div>
    </CarbonaraForm>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "nuxt/app";
const router = useRouter();
const { carbonaraCalculator } = useCarbonaraCalculator();

const userIngredients: Ref<CarbonaraIngredients> = ref({});
const recipeAmount: Ref<number> = ref(-1);

const handleChangeIngredients = (details: any) => {
  userIngredients.value = unref(details);
  recipeAmount.value = carbonaraCalculator(unref(details));
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
