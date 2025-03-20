import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["dist"], // Ignore built files
  },
  {
    files: ["**/*.{js,jsx}"], // Apply to JS and JSX files
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      //change this so browser and node environments are recognized in neovim
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'], 
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node, // Ensure Node.js globals are recognized
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
