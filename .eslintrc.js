module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
  rules: {}
};
