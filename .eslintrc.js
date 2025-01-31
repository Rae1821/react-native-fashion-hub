// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'plugin:tailwindcss/recommended', "plugin:react/recommended"],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    "max-len": [2, 250],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
      }
    ],
    "object-curly-newline": 0
  },
  ignorePatterns: ['/dist/*'],
};
