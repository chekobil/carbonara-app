import { defineConfig } from "cypress";
import * as path from "path";

export default defineConfig({
  e2e: {
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // const pagesFolder = path.resolve(__dirname, "./cypress/pages");
      // console.log("pagesFolder", pagesFolder);
    },
  },
});
