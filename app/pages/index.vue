<template>
  INDEX
  <div class="uno">UNO</div>
  <div class="dos">DOS</div>
  <a class="btn btn-sm" href="/recipe">RECIPE</a>
</template>
<script setup lang="ts">
const baseRecipe: IngredientList = {
  test: 500,
};
const emptyRecipe: IngredientList = {};
</script>

<style lang="postcss">
main {
  > .uno {
    border: 3px solid var(--color-primary);
  }
}
</style>
<style lang="scss">
main {
  & .dos {
    border: 3px solid var(--color-accent);
  }
}
</style>
