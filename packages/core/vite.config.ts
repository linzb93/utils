import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    target: "modules",
    lib: {
      entry: "lib/index.ts",
      fileName: "index",
      formats: ["es"],
    },
  },
  test: {
    onConsoleLog() {
      return true;
    },
  },
});
