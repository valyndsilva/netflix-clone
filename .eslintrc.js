module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier",
    "plugin:@next/next/recommended",
  ],
  overrides: [],
  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-duplicates": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/method-signature-style": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "spaced-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/return-await": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
