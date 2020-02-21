let globals = require('./rollup-injects');
const eslintRecommended = require('eslint/conf/eslint-recommended');

delete globals.include;
globals = ['window', 'console'].concat(Object.keys(globals));

const blacklistVars = globals.map(g => `VariableDeclarator[id.name=${g}]`);

// 0 - ignore
// 1 - warn
// 2 - error

module.exports = {
  baseConfig: {
    ...eslintRecommended,
    overrides: [
      {
        files: ['**/*.svelte'],
        processor: 'svelte3/svelte3',
      },
    ],

    settings: {
      'svelte3/ignore-styles': _ => true,
    },
  },
  useEslintrc: false,
  parser: require.resolve('babel-eslint'),
  globals,
  rules: {
    // fixable by prettier
    indent: 0,
    semi: 0,
    quotes: 0,

    'no-debugger': 0, // allow debugger in source
    'no-empty': 0, // allow empty block, usually after catch(e){}
    'no-unused-vars': 0, // allow unused vars
    'no-console': 0, // allow console
    eqeqeq: 2, // enfore ===/!== instead of ==/!=
    'no-caller': 2, // disable arguments.callee or caller usage
    'no-extend-native': 2, // disallow meddling with built-in object prototypes
    'no-proto': 2, // disable __proto__
    'no-prototype-builtins': 0, // Access Object.prototype method 'hasOwnProperty' from target object
    curly: 2, // Require curly braces
    'linebreak-style': [2, 'unix'],

    // disable getters and setters
    'no-restricted-syntax': [
      2,
      // allows treeshake.propertyReadSideEffects = false
      'Property[kind=/^[gs]et$/]',
      'MethodDefinition[kind=/^[gs]et$/]',

      'SpreadElement',
      'Identifier[name=/^(Symbol|Proxy|Map)$/]',

      'FunctionExpression[generator=true]',

      ...blacklistVars,
    ],
  },
  plugins: ['svelte3'],
};
