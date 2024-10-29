import postcssPresetEnv from "postcss-preset-env";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
  ],
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    },
    {
      path: "~/_models",
      extensions: [".vue"],
    },
  ],
  imports: {
    autoImport: true,
    dirs: ["composables", "_models/**/use*", "_models/**/composables/*"],
  },
  pinia: {
    storesDirs: ["./app/stores/**", "./app/_models/**/store.ts"],
  },
  postcss: {
    plugins: {
      "postcss-preset-env": postcssPresetEnv(),
    },
  },
  css: ["~/assets/css/global.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
