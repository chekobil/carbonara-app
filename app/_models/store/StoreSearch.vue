<template>
  <div class="store-search-container">
    <input
      type="text"
      v-model="inputValue"
      placeholder="Search store"
      class="input input-bordered w-full max-w-xs"
      @change="handleChangeInput"
    />
  </div>
</template>

<script setup lang="ts">
const inputValue: Ref<string> = ref("");
const emit = defineEmits<{
  change: [value: string];
}>();
const handleChangeInput = () => {
  emit("change", unref(inputValue));
};
</script>

<style lang="scss">
.store-search-container {
  padding: 0.4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
