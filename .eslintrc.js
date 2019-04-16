module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["google", "prettier", "plugin:@typescript-eslint/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    quotes: [1, "double"],
    semi: [2, "always"]
  }
};
