<template>
  <div id="layout">
    <header>
      <a href="/">Home</a>
      <a href="/stores">Stores</a>
      <button @click="changeTheme">light/dark</button>
    </header>
    <main>
      <slot />
    </main>
    <footer>FOOT</footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const theme = ref("light");
useHead({
  htmlAttrs: {
    class: theme,
  },
});
const changeTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>
<style lang="scss">
body {
  font-family: "Courier New", Courier, monospace;
  #layout {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    header {
      border: 2px solid var(--color-secondary);
    }
    main {
      padding: 1rem 1.2rem;
      border: 2px solid var(--color-secondary);
    }
    footer {
      border: 2px solid var(--color-secondary);
    }
  }
}
</style>
