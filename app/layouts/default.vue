<template>
  <div id="layout">
    <header>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="/">Home</a></li>
          <li><a href="/stores">Stores</a></li>
          <li>
            <button @click="changeTheme">light/dark</button>
          </li>
        </ul>
      </div>
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
    "data-theme": "coffe",
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
