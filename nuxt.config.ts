import postcssPresetEnv from "postcss-preset-env";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxt/test-utils/module"],
  postcss: {
    plugins: {
      "postcss-preset-env": postcssPresetEnv(),
    },
  },
  css: ["~/assets/css/global.css"],
});
