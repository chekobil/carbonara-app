<template>
  <div class="form-wrapper">
    <span @click="changeUserInputMode">*</span>
    <div
      v-for="item in formOptions"
      :key="`option-${item.name}`"
      class="form-control flex-row gap-4"
    >
      <label class="min-w-32">{{ item.name }} ({{ item.units }})</label>
      <div v-if="userInputMode === 'manual'" class="input-group">
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
        class="select select-md select-bordered w-full"
        :class="getInputStateClass(item.name)"
      >
        <option v-for="value in item.options" :value="value">
          {{ value }}
        </option>
      </select>
    </div>
    <div class="join self-end mt-4">
      <button
        v-if="ingredientsHasChanged"
        class="join-item btn btn-primary btn-outline btn-sm max-w-40"
        @click="handleResetToStoredIngredients"
      >
        Reset
      </button>
      <button
        class="join-item btn btn-primary btn-outline btn-sm max-w-40"
        @click="handleEmitChangeIngredients"
      >
        Calculate recipe
      </button>
    </div>
    <div :class="{ 'is-disabled': ingredientsHasChanged }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Ref } from "vue";
import { objectsShallowEqual } from "~/utils/objects";
import { getSelectOptionsFromIngredients } from "~/_models/recipe/ingredientsOptions";
import { ingredients, units } from "./carbonara";

const { setUserIngredients, getUserIngredients: storedUserIngredients } =
  useRecipeStore();

const userInputMode = ref("manual"); // manual: input | auto:select
const showErrors: Ref<boolean> = ref(false);
const userIngredients: Ref<Record<string, number>> = ref({});
const ingredientsHasChanged: Ref<boolean> = ref(false);

const emit = defineEmits<{
  change: [value: Record<string, number>];
}>();

const formOptions = computed(() => {
  return getSelectOptionsFromIngredients(ingredients, units);
});

onMounted(() => {
  handleResetToStoredIngredients();
});

const handleResetToStoredIngredients = () => {
  userIngredients.value = unref(storedUserIngredients) ?? {};
  if (userIngredients.value && Object.keys(userIngredients.value)?.length) {
    handleEmitChangeIngredients();
  }
};

watch(
  [userIngredients, storedUserIngredients],
  ([val, storedVal]) => {
    if (val && storedVal && !objectsShallowEqual(val, storedVal)) {
      ingredientsHasChanged.value = true;
    }
  },
  { deep: true }
);

const handleEmitChangeIngredients = () => {
  const newIngredients = { ...unref(userIngredients) };
  emit("change", newIngredients);
  setUserIngredients(newIngredients);
  showErrors.value = true;
  ingredientsHasChanged.value = false;
};

const getInputStateClass = (key: string) => {
  if (!showErrors.value) return "";
  let successClass: string = "",
    errorClass: string = "";
  if (userInputMode.value === "manual") {
    successClass = "input-success";
    errorClass = "input-error";
  }
  if (userInputMode.value === "auto") {
    successClass = "select-success";
    errorClass = "select-error";
  }
  if (!successClass || !errorClass) return "";
  const value = userIngredients.value[key];
  return Boolean(value && !isNaN(Number(value))) ? successClass : errorClass;
};

const changeUserInputMode = () => {
  userInputMode.value = userInputMode.value === "manual" ? "auto" : "manual";
};

const getAmountToAdd = (key: string) => {
  return (ingredients[key] as number) / 4;
};

const addAmount = (key: string) => {
  let currentValue = userIngredients.value[key];
  if (!currentValue || isNaN(Number(currentValue))) currentValue = 0;
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
  min-width: var(--ingredients-form-container-width);
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
      flex: 1;
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
