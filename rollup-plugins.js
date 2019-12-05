const argv = require('yargs-parser')(process.argv.slice(2));
const globals = require('./scripts/rollup-injects');
const include = require('rollup-plugin-includepaths');
const babelOptions = require('./scripts/babel-options');
const babelPlugin = require('rollup-plugin-babel');
const babel = require('@babel/core');
const stylus = require('./scripts/rollup-plugin-stylus');
const svelte = require('rollup-plugin-svelte');
const inject = require('rollup-plugin-inject');
const replace = require('rollup-plugin-replace');
const eslint = require('./scripts/eslint');
const isProd = require('./prod');
const { readFile } = require('fs');

const isWatching = argv.w || argv.watch;

const commonFeDir = 'node_modules/fe/src';

const resolveSrc = (importerFile, srcPath) =>
  resolve(dirname(importerFile), srcPath);

const getSrcContent = file =>
  new Promise((resolve, reject) => {
    readFile(file, (error, data) => {
      if (error) reject(error);
      else resolve(data.toString());
    });
  });

const parseFile = async ({ attributes, filename, content }) => {
  const dependencies = [];
  if (attributes.src) {
    /** Ignore remote files */
    if (!attributes.src.match(/^(https?)?:?\/\/.*$/)) {
      const file = resolveSrc(filename, attributes.src);
      content = await getSrcContent(file);
      dependencies.push(file);
    }
  }

  return {
    filename,
    attributes,
    content,
    dependencies,
  };
};

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
    replace({
      __BUILD_NUMBER__: process.env.BUILD_NUMBER || null,
    }),

    include({
      paths,
      extensions: ['.mjs', '.js'],
    }),

    svelte({
      extensions: ['.svelte'],
      preprocess: {
        style: ({ content }) => stylus.stylusToCss(content),
        script: async svelteFile => {
          setTimeout(() => eslint.lint(false)([svelteFile.filename]));

          const { content, dependencies } = await parseFile(svelteFile);

          return {
            code: content,
            dependencies,
          };
        },
      },
      dev: !isProd,
      css: css => {
        if (svelteCssPath) {
          css.write(`${svelteCssPath}/svelte.styl`);
        }
      },
      accessors: true,
    }),

    babelPlugin({
      ...babelOptions,
      extensions: ['.js', '.mjs', '.svelte'],
    }),

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
