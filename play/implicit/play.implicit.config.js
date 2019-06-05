const { rollupCommon, getPlugins } = require('../../rollup-plugins');

const PATH = 'play/implicit';

const plugins = getPlugins({
  src: ['src', 'play/implicit/src'],
});

const config = {
  ...rollupCommon,
  input: `${PATH}/src/index.js`,
  output: {
    file: `${PATH}/dist/implicit.js`,
    format: 'iife',
    strict: false,
    name: 'implicit',
  },
  plugins,
};

module.exports = [config];
