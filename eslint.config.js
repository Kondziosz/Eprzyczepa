import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";

export default [
  // Ignore build artifacts and dependencies
  { ignores: ["dist/**", "node_modules/**"] },

  // Core JS recommended rules
  js.configs.recommended,

  // React recommended (flat) rules
  react.configs.flat.recommended,

  // Project-specific settings and extra rules
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: { "react-hooks": reactHooks, "unused-imports": unusedImports },
    rules: {
      // React 17+/Vite doesn't need React in scope; ignore the unused default import
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Prefer plugin to catch/auto-fix unused imports
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^React$", args: "none", ignoreRestSiblings: true }
      ],

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Relax rule that complains about quotes/apostrophes in JSX text
      "react/no-unescaped-entities": "off",

      // Example style rule
      "brace-style": ["error", "allman"],
    },
  },

  // Disable rules conflicting with Prettier formatting
  prettier,
];
