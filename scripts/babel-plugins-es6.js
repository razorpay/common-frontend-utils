const babel = require('rollup-plugin-babel');

const plugins = [
  '@babel/transform-block-scoped-functions',

  // loose mode: parameters with default values
  // will be counted into the arity of the function
  ['@babel/transform-parameters', { loose: true }],

  ['@babel/proposal-pipeline-operator', { proposal: 'minimal' }],
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
