const babelPlugins = require('./scripts/babel-plugins');

module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = [...babelPlugins.plugins];

  return {
    presets,
    plugins,
  };
};
