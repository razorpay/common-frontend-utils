const babel = require('rollup-plugin-babel');

const plugins = [
  [require('fast-async'), { useRuntimeModule: false }],
  require('@babel/plugin-transform-arrow-functions'),
  require('@babel/plugin-transform-block-scoped-functions'),
  require('@babel/plugin-transform-block-scoping'),
  [require('@babel/plugin-transform-classes'), { loose: true }],
  [require('@babel/plugin-transform-computed-properties'), { loose: true }],
  require('@babel/plugin-transform-destructuring'),

  // loose mode: parameters with default values
  // will be counted into the arity of the function
  [require('@babel/plugin-transform-parameters'), { loose: true }],

  require('@babel/plugin-transform-shorthand-properties'),
  [require('@babel/plugin-transform-template-literals'), { loose: true }],

  [
    require('@babel/plugin-proposal-pipeline-operator'),
    { proposal: 'minimal' },
  ],
];

module.exports = babel({
  extensions: ['.js', '.svelte', '.mjs'],
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
