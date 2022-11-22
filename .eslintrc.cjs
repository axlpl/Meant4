/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-airbnb",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "plugin:vue/vue3-recommended": 0,
  },
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
