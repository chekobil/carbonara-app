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
  overflow: hidden;
  #layout {
    --header-heigth: 60px;
    --footer-heigth: 40px;
    --main-height: calc(100dvh - var(--header-heigth) - var(--footer-heigth));
    --main-child-margin: 1rem;
    --main-max-width: calc(
      100vw - var(--main-child-margin) - var(--main-child-margin)
    );
    --form-container-width: min(500px, var(--main-max-width));
    min-height: 100dvh;
    max-height: 100dvh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
    header {
      flex: 0;
      border-bottom: 1px solid gray;
      max-height: var(--header-heigth);
    }
    main {
      flex: 1;
      // min-height: var(--main-height);
      padding: 0 var(--main-child-margin);
      > section:first-child {
        // max-height: calc(
        //   var(--main-height) - var(--main-child-margin) -
        //     var(--main-child-margin)
        // );
        margin-top: var(--main-child-margin);
        // overflow: auto;
      }
    }
    footer {
      flex: 1;
      display: flex;
      align-items: flex-start;
      min-height: var(--footer-heigth);
      border-top: 1px solid oklch(var(--b3));
      padding: 0.6rem 1.2rem;
      background-color: oklch(var(--b2));
    }
  }
}
</style>
