<template>
  <main>
    <div class="uno">Hola</div>
    <NuxtWelcome />
  </main>
</template>
<script setup lang="ts">
const baseRecipe: IngredientList = {
  test: 500,
};
const emptyRecipe: IngredientList = {};
</script>
<style lang="postcss">
main {
  border: 2px solid var(--color-secondary);
  > .uno {
    border: 3px solid var(--color-primary);
  }
}
</style>
