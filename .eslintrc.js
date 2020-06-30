module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
  },
  plugins: [
    '@angular-eslint/eslint-plugin',
  ],
  extends: [
    'airbnb-typescript/base',
  ],
  rules: {
    "no-return-assign": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "eqeqeq": 0,
    "class-methods-use-this": 0,
    "import/no-cycle": 0,
    "no-case-declarations": 0,
    "import/no-named-as-default-member": 0,
  },
};
