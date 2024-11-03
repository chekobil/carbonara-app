import postcssPresetEnv from "postcss-preset-env";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  runtimeConfig: {
    public: {
      quoteApiBaseUrl: "https://api.api-ninjas.com/v1",
      quoteApiToken: process.env.API_NINJA_API_TOKEN,
      imagesApiBaseUrl: "https://picsum.photos/id",
    },
  },
  modules: [
    "@vueuse/nuxt",
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
