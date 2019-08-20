const babel = require('rollup-plugin-babel');

const plugins = [
  [require('fast-async'), { useRuntimeModule: false }],
  [
    require('@babel/plugin-proposal-pipeline-operator'),
    { proposal: 'minimal' },
  ],
];

module.exports = babel({
  extensions: ['.js', '.svelte', '.mjs'],
  plugins,
  presets: [
    [
      require('@babel/preset-env'),
      {
        loose: true,
        targets: {
          ie: 11,
        },
      },
    ],
  ],
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
