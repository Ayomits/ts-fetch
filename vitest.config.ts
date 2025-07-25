import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: ["**/node_modules", "**/dist", ".idea", ".git", ".cache"],
    passWithNoTests: true,
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
    },
    alias: [
      {
        find: "@ts-fetcher/cache",
        replacement: path.resolve(__dirname, "./packages/cache/dist/index.js"),
      },
      {
        find: "@ts-fetcher/rest",
        replacement: path.resolve(__dirname, "./packages/rest/dist/index.js"),
      },
      {
        find: "@ts-fetcher/types",
        replacement: path.resolve(__dirname, "./packages/types/dist/index.js"),
      },
      {
        find: "ts-fetcher",
        replacement: path.resolve(
          __dirname,
          "./packages/ts-fetcher/dist/index.js"
        ),
      },
    ],
    coverage: {
      enabled: true,
      all: true,
      reporter: ["text", "lcov", "cobertura"],
      provider: "v8",
      include: ["src"],
      exclude: [
        // All ts files that only contain types, due to ALL
        "**/*.{interface,type,d}.ts",
        "**/{interfaces,types}/*.ts",
        // All index files that *should* only contain exports from other files
        "**/index.{js,ts}",
        // All exports files that make subpackages available as submodules
        "**/exports/*.{js,ts}",
      ],
    },
  },
});
