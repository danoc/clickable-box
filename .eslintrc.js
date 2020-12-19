module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    // Prettier must go last so that it can turn off other rules
    "prettier",
    "prettier/@typescript-eslint",
  ],
  plugins: ["jest"],
  env: {
    browser: true,
    node: true,
    "jest/globals": true,
  },
};
