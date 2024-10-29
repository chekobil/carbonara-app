<template>
  <div id="layout">
    <Header @change-theme="changeTheme" />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const theme = ref("light");
const dataTheme = ref("light");
useHead({
  htmlAttrs: {
    "data-theme": dataTheme,
  },
});
const changeTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  dataTheme.value = dataTheme.value === "light" ? "coffee" : "light";
};
</script>
<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
  #layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    header {
      border-bottom: 1px solid gray;
    }
    main {
      flex: 1;
      padding: 1rem 1.2rem;
    }
    footer {
      padding: 1rem 1.2rem;
      border-top: 1px solid gray;
    }
  }
}
</style>
