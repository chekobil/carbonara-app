import { defineVitestConfig } from "@nuxt/test-utils/config";
import path from "path";

export default defineVitestConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
      "@models": path.resolve(__dirname, "app/_models"),
    },
  },
});
