module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    "plugin:storybook/recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": 0,
    "comma-dangle": ["error", "never"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "no-trailing-spaces": "error",
    "semi": ["error", "never"],
    "jsx-quotes": [2, "prefer-double"],
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": false
        },
        "groups": [
          "index",
          "sibling",
          "parent",
          "internal",
          "external",
          "builtin",
          "object",
          "type"
        ],
        "newlines-between": "always"
      }
    ]
  },
}
