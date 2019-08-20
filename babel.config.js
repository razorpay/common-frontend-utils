const babelOptions = require('./scripts/babel-options');

module.exports = function(api) {
  api.cache(true);
  return babelOptions;
};
