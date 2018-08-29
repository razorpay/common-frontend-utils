const globals = require('./rollup-injects');

// 0 - ignore
// 1 - warn
// 2 - error

module.exports = {
  useEslintrc: false,
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  globals: Object.keys(globals),
  rules: {
    // fixable by prettier
    indent: 0,
    semi: 0,
    quotes: 0,

    'no-empty': 0, // allow empty block, usually after catch(e){}
    'no-unused-vars': 0, // allow unused vars
    'no-console': 0, // allow console
    eqeqeq: 2, // enfore ===/!== instead of ==/!=
    'no-caller': 2, // disable arguments.callee or caller usage
    'no-extend-native': 2, // disallow meddling with built-in object prototypes
    'no-proto': 2, // disable __proto__

    'linebreak-style': [2, 'unix'],

    // disable getters and setters
    'no-restricted-syntax': [
      2,
      // allows treeshake.propertyReadSideEffects = false
      'Property[kind=/[gs]et/]',
      'MethodDefinition[kind=/[gs]et/]',

      'SpreadElement',
      'Identifier[name=/Symbol|Proxy|Map/]',

      'FunctionExpression[generator=true]'
    ]
  }
};
