import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import parserBabel from "@babel/eslint-parser";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    languageOptions: {
      parser: parserBabel,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
      globals: globals.browser,
    },

    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },

    settings: {
      react: { version: "detect" },
    },

    rules: {
      // core ESLint rules
      ...js.configs.recommended.rules,
      // React plugin rules
      ...pluginReact.configs.flat.recommended.rules,
      // formatting via Prettier plugin
      ...prettierConfig.rules, // disables conflicting ESLint rules
      "prettier/prettier": "error",
      "brace-style": ["error", "allman"],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
]);
