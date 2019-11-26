module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    // Prettier must go last so that it can turn off other rules
    "prettier",
    "prettier/react"
  ],
  plugins: ["jest"],
  env: {
    "jest/globals": true
  },
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }]
  }
};
