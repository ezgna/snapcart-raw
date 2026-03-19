export default [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-var": "error",
      "no-unused-vars": "error",
    },
  },
];
