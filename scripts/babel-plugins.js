const babel = require('rollup-plugin-babel');

const plugins = [
  ['module:fast-async', { useRuntimeModule: false }],
  '@babel/transform-arrow-functions',
  '@babel/transform-block-scoped-functions',
  '@babel/transform-block-scoping',
  ['@babel/transform-classes', { loose: true }],
  ['@babel/transform-computed-properties', { loose: true }],
  '@babel/transform-destructuring',

  // loose mode: parameters with default values
  // will be counted into the arity of the function
  ['@babel/transform-parameters', { loose: true }],

  '@babel/transform-shorthand-properties',
  ['@babel/transform-template-literals', { loose: true }],

  ['@babel/proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-optional-chaining', { loose: true }],
];

module.exports = babel({
  extensions: ['.js', '.svelte'],
  plugins,
});

const babelTransform = module.exports.transform;

module.exports.transform = (code, id) => {
  try {
    return babelTransform(code, id);
  } catch (e) {
    e.stack = '';
    e.message = '';
    throw e;
  }
};

module.exports.plugins = plugins;
