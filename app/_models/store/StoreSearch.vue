<template>
  <div class="store-search-container">
    <input
      type="text"
      v-model="inputValue"
      placeholder="Search store"
      class="input input-bordered w-full max-w-xs"
      @change="handleChangeInput"
    />
    <span
      :class="{ 'is-disabled': !canClearInput }"
      @click.prevent="handleClearInputValue"
    >
      <Icon name="material-symbols:delete-outline-rounded" size="1.6rem" />
    </span>
  </div>
</template>

<script setup lang="ts">
const inputValue: Ref<string> = ref("");
const emit = defineEmits<{
  change: [value: string];
}>();

const canClearInput = computed(() => {
  return Boolean(unref(inputValue));
});
const handleChangeInput = () => {
  emit("change", unref(inputValue));
};

const handleClearInputValue = () => {
  inputValue.value = "";
  handleChangeInput();
};
</script>

<style lang="scss">
.store-search-container {
  padding: 0.4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
}
</style>
