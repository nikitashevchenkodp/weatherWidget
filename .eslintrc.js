module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "no-shadow": ["warn", { hoist: "never" }],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      { exceptAfterOverload: false },
    ],
    "eslint class-methods-use-this": [0, { enforceForClassFields: false }],
    allowShortCircuit: 0,
    allowTernary: 0,
  },
};
