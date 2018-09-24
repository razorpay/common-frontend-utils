const eslintRecommended = require('eslint/conf/eslint-recommended');

module.exports = {
  baseConfig: eslintRecommended,
  useEslintrc: false,
  rules: {
    'no-mixed-spaces-and-tabs': 0,
    'no-unused-vars': 0,
    'no-empty': 0,
    'no-console': 0,
    'no-iterator': 2,
  },
  globals: ['window', 'console'],
};
