module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "array-callback-return": [
      "error",
      { allowImplicit: false, checkForEach: true },
    ],
    "no-await-in-loop": "error",
    "no-constant-binary-expression": "error",
    "no-promise-executor-return": ["error", { allowVoid: true }],
    "no-self-compare": "error",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-new-native-nonconstructor": "error",
    "no-template-curly-in-string": "error",
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
