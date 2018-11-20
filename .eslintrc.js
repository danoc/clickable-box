module.exports = {
  extends: [
    "airbnb",
    "plugin:jest/recommended",
    // Prettier must go last so that it can turn off other rules
    "prettier"
  ],
  plugins: ["jest"],
  env: {
    "jest/globals": true
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { packageDir: ["./package.json"] }
    ]
  }
};
