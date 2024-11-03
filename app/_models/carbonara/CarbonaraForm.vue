<template>
  <div class="form-wrapper">
    <div
      v-for="item in formOptions"
      :key="`option-${item.name}`"
      class="form-control"
    >
      <label>{{ item.name }} </label>
      <div v-if="userInputMode === 'manual'" class="input-group">
        <input
          v-model="userIngredients[item.name]"
          type="text"
          :placeholder="item.units"
          class="input input-bordered flex items-center w-full"
          :class="getInputStateClass(item.name)"
        />
        <div class="icon-group">
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
        v-if="canResetForm"
        class="join-item btn btn-primary btn-outline btn-sm max-w-40"
        @click="handleResetToStoredIngredients"
      >
        <Icon name="tabler:restore" />
        Reset
      </button>
      <button
        data-test-id="button-calculate-recipe"
        class="join-item btn btn-primary btn-outline btn-sm max-w-40"
        :class="{ 'is-disabled': !canCalculateForm }"
        @click="handleEmitChangeIngredients"
      >
        <Icon name="tabler:calculator" />Calculate recipe
      </button>
    </div>
    <div :class="{ 'is-disabled': !canViewRecipe }">
      <slot />
    </div>
    <span data-test-id="change-input-mode" @click="changeUserInputMode">*</span>
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

const status = computed(() => {
  const userVal = userIngredients.value;
  const storedVal = storedUserIngredients.value;
  if (!userVal || !Object.keys(userVal)?.length) {
    return "notvalid";
  }
  if (
    Object.values(userVal)?.length !== Object.keys(ingredients).length ||
    !Object.values(userVal).every((val) => Boolean(val))
  ) {
    return "notvalid";
  }
  if (!storedVal || !Object.keys(storedVal)?.length) {
    return "changed-initial";
  }
  return objectsShallowEqual(userVal, storedVal) ? "calculated" : "changed";
});
const canViewRecipe = computed(() => {
  return status.value === "calculated";
});
const canCalculateForm = computed(() => {
  return status.value.includes("changed");
});
const canResetForm = computed(() => {
  return status.value === "changed";
});
const formIsInvalid = computed(() => {
  return status.value === "notvalid";
});

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

const handleEmitChangeIngredients = () => {
  // VALIDATION. Si hay errores, no mandes el formulario
  showErrors.value = true;
  const newIngredients = { ...unref(userIngredients) };
  emit("change", newIngredients);
  setUserIngredients(newIngredients);
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
  margin-top: 1rem;
  min-width: var(--form-container-width);
  padding: 0.6rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.6rem;
  > .form-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
    @media (min-width: 500px) {
      gap: 1.2rem;
    }
    label {
      flex: 1;
      font-size: 90%;
      font-weight: 300;
      width: max-content;
      text-transform: capitalize;
    }
    > .select {
      flex: 1;
      min-width: 160px;
    }
    > .input-group {
      flex: 3;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      .icon-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.1rem;
        @media (min-width: 500px) {
          flex-direction: row;
          align-items: center;
        }
      }
    }
  }
}
</style>
