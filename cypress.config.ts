import { loadEnvConfig } from "@next/env";
import { defineConfig } from "cypress";

const { combinedEnv } = loadEnvConfig(process.cwd());
export default defineConfig({
  projectId: "obf3zh",
  env: combinedEnv,

  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/unit/**/*.cy.{ts,tsx}",
  },
});
