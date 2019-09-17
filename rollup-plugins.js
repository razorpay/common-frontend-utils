const argv = require('yargs-parser')(process.argv.slice(2));
const globals = require('./scripts/rollup-injects');
const include = require('rollup-plugin-includepaths');
const babelOptions = require('./scripts/babel-options');
const babelPlugin = require('rollup-plugin-babel');
const babel = require('@babel/core');
const stylus = require('./scripts/rollup-plugin-stylus');
const svelte = require('rollup-plugin-svelte');
const inject = require('rollup-plugin-inject');
const eslint = require('./scripts/eslint');
const isProd = require('./prod');

const isWatching = argv.w || argv.watch;

const commonFeDir = 'node_modules/fe/src';

const getPlugins = ({
  watch = isWatching,
  lint = true,
  src,
  svelteCssPath,
}) => {
  if (!Array.isArray(src)) {
    src = [src];
  }
  const paths = src.concat(
    commonFeDir,
    'node_modules',
    'node_modules/fe/node_modules'
  );

  if (lint) {
    eslint.lint(isWatching)(paths);
  }

  // Order of plugins is important:
  // svelte needs to be before babel so that by the time
  // babel is run, svelte has become JS
  return [
    include({
      paths,
      extensions: ['.mjs', '.js'],
    }),

    svelte({
      extensions: '.svelte',
      preprocess: {
        style: ({ content }) => stylus.stylusToCss(content),
        // script: ({ content }) => {
        //   setTimeout(() => eslint.lintText(content));
        //   // return babel.transformAsync(content, babelOptions);
        //   return content;
        // },
      },
      dev: !isProd,
      css: css => {
        if (svelteCssPath) {
          css.write(`${svelteCssPath}/svelte.styl`);
        }
      },
    }),

    babelPlugin(babelOptions),

    inject(globals),
  ];
};

const rollupCommon = {
  treeshake: {
    propertyReadSideEffects: false,
  },
};

if (isWatching) {
  rollupCommon.watch = {
    // https://github.com/rollup/rollup-watch/issues/22
    exclude: 'node_modules/**',
    chokidar: true,
    clearScreen: false,
  };
}

module.exports = {
  stylus,
  isWatching,
  rollupCommon,
  getPlugins,
};
