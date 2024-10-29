<template>
  <div class="form-wrapper">
    <div
      v-for="item in formOptions"
      :key="`option-${item.name}`"
      class="form-control flex-row gap-4"
    >
      <label class="min-w-32">{{ item.name }} ({{ item.units }})</label>
      <div v-if="userInput === 'manual'" class="input-group">
        <input
          v-model="userIngredients[item.name]"
          type="text"
          :placeholder="item.units"
          class="input input-bordered w-full max-w-xs"
          :class="getInputStateClass(item.name)"
        />
        <Icon
          name="mdi:add-circle-outline"
          size="1.5rem"
          class="is-link"
          @click="addAmount(item.name)"
        />
        <Icon
          name="mdi:minus-circle-outline"
          size="1.5rem"
          class="is-link"
          @click="subtractAmount(item.name)"
        />
      </div>
      <select
        v-else
        v-model="userIngredients[item.name]"
        class="select select-sm select-bordered w-full max-w-xs"
      >
        <option v-for="value in item.options" :value="value">
          {{ value }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary btn-outline btn-sm max-w-40 self-end mt-4"
      @click="handleEmitChangeIngredients"
    >
      Calculate recipe
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import type { Ref } from "vue";
const userInput = ref("manual"); // manual: input | auto:select
const emit = defineEmits<{
  change: [value: Record<string, number>];
}>();
const showErrors: Ref<boolean> = ref(false);
const handleEmitChangeIngredients = () => {
  emit("change", { ...unref(userIngredients) });
  showErrors.value = true;
};
const getOptionsForAmount = (amount: number): number[] => {
  return [0, (2 / 4) * amount, amount, (6 / 4) * amount, (8 / 4) * amount];
};
interface SelectWithOptions {
  name: string;
  options: number[];
}
import { ingredients, units } from "./carbonara";
const userIngredients: Ref<Record<string, number>> = ref({});

const formOptions = computed(() => {
  const result: SelectWithOptions[] = [];
  const clonedIngredients = structuredClone(ingredients);
  return Object.keys(clonedIngredients).map(
    (key: string | CarbonaraIngredient) => {
      const ingredientValue = clonedIngredients[key] as number;
      const ingredientUnit = units[key] as string;
      const options = getOptionsForAmount(ingredientValue);
      return {
        name: key,
        default: ingredientValue,
        units: ingredientUnit,
        options,
      };
    }
  );
});

const getInputStateClass = (key: string) => {
  if (!showErrors.value) return "";
  const value = userIngredients.value[key];
  return Boolean(value && !isNaN(Number(value)))
    ? "input-success"
    : "input-error";
};

const getAmountToAdd = (key: string) => {
  return (ingredients[key] as number) / 2;
};

const addAmount = (key: string) => {
  let currentValue = userIngredients.value[key];
  if (!currentValue || isNaN(Number(currentValue))) currentValue = 0;
  // la cantidad a añadir depende de la cantidad base de la receta
  const addAmount = getAmountToAdd(key);
  userIngredients.value[key] = currentValue + addAmount;
};

const subtractAmount = (key: string) => {
  let currentValue = userIngredients.value[key];
  if (!currentValue || isNaN(Number(currentValue))) currentValue = 0;
  const subtractAmount = currentValue ? getAmountToAdd(key) : 0;
  userIngredients.value[key] = currentValue - subtractAmount;
};
</script>

<style lang="scss">
.form-wrapper {
  min-width: 400px;
  padding: 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  > .form-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
    > label {
      flex: 1;
      font-size: 80%;
    }
    > .select {
      flex: 0;
      min-width: 160px;
    }
    > .input-group {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  }
}
</style>
