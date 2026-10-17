import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "coverage"]),

  // Browser code
  {
    files: ["**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },

  // Tests run in Jest with jsdom
  {
    files: ["**/__tests__/**/*.{js,jsx}", "**/*.test.{js,jsx}", "test/**/*.js"],
    languageOptions: { globals: { ...globals.browser, ...globals.jest, ...globals.node } },
    rules: { "react-refresh/only-export-components": "off" },
  },

  // Entry files mount the app and export nothing, so Fast Refresh does not apply
  {
    files: ["src/main.jsx", "src/notFound.jsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },

  // Build scripts and config files run in Node
  {
    files: ["scripts/**/*.mjs", "*.config.{js,cjs}", "test/fileMock.js"],
    languageOptions: { globals: globals.node },
  },
]);
