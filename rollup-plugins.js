const argv = require('yargs-parser')(process.argv.slice(2));
const globals = require('./scripts/rollup-injects');
const include = require('rollup-plugin-includepaths');
const babel = require('rollup-plugin-babel');
const babelPlugins = require('./scripts/babel-plugins');
const stylus = require('./scripts/rollup-plugin-stylus');
const svelte = require('rollup-plugin-svelte');
const inject = require('rollup-plugin-inject');
const { lint, lintText } = require('./scripts/eslint');

const isWatching = argv.w || argv.watch;

const getPluginsWithShared = sharedDir => baseDir => {
  const paths = [sharedDir, baseDir];

  lint(paths);

  // Order of plugins is important:
  // svelte needs to be before babel so that by the time
  // babel is run, svelte has become JS
  return [
    include({ paths }),

    svelte({
      extensions: '.svelte',
      preprocess: {
        style: ({ content }) => stylus.transform(content),
        script: ({ content }) => {
          setTimeout(() => lintText(content));
          return content;
        }
      }
    }),

    babel({
      include: ['**/*.js', '**/*.svelte'],
      plugins: babelPlugins
    }),

    inject(globals)
  ];
};

const pluginsWithDir = getPluginsWithShared('node_modules/ui-common/src');

const rollupCommon = {
  treeshake: {
    propertyReadSideEffects: false
  }
};

if (isWatching) {
  rollupCommon.watch = {
    // https://github.com/rollup/rollup-watch/issues/22
    exclude: 'node_modules/**',
    chokidar: true,
    clearScreen: false
  };
}

module.exports = {
  stylus,
  isWatching,
  rollupCommon,
  pluginsWithDir
};
