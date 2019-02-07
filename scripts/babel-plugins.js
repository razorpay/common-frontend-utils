const babel = require('rollup-plugin-babel');

const pluginsEs6 = [
  '@babel/transform-block-scoped-functions',

  // loose mode: parameters with default values
  // will be counted into the arity of the function
  ['@babel/transform-parameters', { loose: true }],

  ['@babel/proposal-pipeline-operator', { proposal: 'minimal' }],
];

const plugins = [
  ['module:fast-async', { useRuntimeModule: false }],
  '@babel/transform-arrow-functions',
  '@babel/transform-block-scoping',
  ['@babel/transform-classes', { loose: true }],
  ['@babel/transform-computed-properties', { loose: true }],
  '@babel/transform-destructuring',

  '@babel/transform-shorthand-properties',
  ['@babel/transform-template-literals', { loose: true }],

  ...pluginsEs6,
];

module.exports = babel({
  extensions: ['.js', '.svelte'],
  plugins,
});

module.exports.es6 = babel({
  extensions: ['.js', '.svelte'],
  plugins: pluginsEs6,
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
