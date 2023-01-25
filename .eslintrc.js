module.exports = {
  env: {
    browser: true,
  },
  extends: ["airbnb", "prettier"],
  globals: {
    RecipeJS: true,
    Immutable: true,
    QUnit: true,
    R: true,
  },
  rules: {
    "import/extensions": ["error", { js: "always" }],
    "max-len": ["error", { code: 100, ignoreUrls: true }],
  },
};
