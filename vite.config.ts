import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    target: "modules",
    lib: {
      entry: ["packages/core/lib/index.ts", "packages/core/node/index.ts"],
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        core: "./packages/core/lib/index.ts",
        node: "./packages/node/lib/index.ts",
      },
      output: {
        dir: "packages/[name]/dist",
      },
    },
  },
  test: {
    onConsoleLog() {
      return true;
    },
  },
});
