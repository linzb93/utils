import { defineConfig } from "vitest/config";
import dts from 'vite-plugin-dts';
import pkg from './package.json';
import monoPkg from '../../package.json';

const externalPkgs = (() => {
  const output:string[] = [];
  if ('dependencies' in pkg) {
    output.push(...Object.keys(pkg.dependencies as object));
  }
  if ('dependencies' in monoPkg) {
    output.push(...Object.keys(monoPkg.dependencies as object));
  }
  return output;
})()

export default defineConfig({
  build: {
    target: 'node18',
    minify: false,
    rollupOptions: {
      input: 'lib/index.ts',
      output: {
        dir: 'dist',
        entryFileNames: 'index.js'
      },
      external: [
        ...externalPkgs,
        /^node:.*/
      ]
    },
    lib: {
      entry: "lib/index.ts",
      fileName: "index",
      formats: ["es"],
    },
  },
  plugins: [
    dts({
      outDir: './',
      entryRoot: './lib',
      rollupTypes: true,
      exclude: ['**/*.test.ts']
    })
  ],
  test: {
    onConsoleLog() {
      return true;
    },
  },
});
