const fs = require('fs');
const chokidar = require('chokidar');
const lintRules = require('./eslintrc');
const CLIEngine = require('eslint').CLIEngine;

const eslint = new CLIEngine(lintRules);
const eslintFormatter = eslint.getFormatter('stylish');
const lintCompat = new CLIEngine(require('./eslintrc-compat'));

/**
 * Fixes ESLint issues
 * @param {Array<string>} paths
 */
const lintFix = paths => {
  const fixer = new CLIEngine({
    ...lintRules,
    fix: true,
  });

  const report = fixer.executeOnFiles(paths);

  CLIEngine.outputFixes(report);
};

const lintPaths = paths => {
  if (!Array.isArray(paths)) {
    if (!paths.endsWith('.js')) {
      return;
    }
    paths = [paths];
  }
  lintLog(eslint.executeOnFiles(paths));
};

const lintLog = report => {
  const results = eslintFormatter(report.results);
  if (results) {
    console.log(results);
  }
};
const lint = isWatching => paths => {
  // exclude node_modules from being linted
  paths = paths.filter(p => !p.startsWith('node_modules'));

  lintPaths(paths);

  if (isWatching) {
    chokidar
      .watch(paths, {
        ignoreInitial: true,
      })
      .on('add', lintPaths)
      .on('change', lintPaths);
  }
};

const lintText = (text, id) => lintLog(eslint.executeOnText(text, id));

module.exports = {
  lint,
  lintCompat,
  lintFix,
  lintLog,
  lintText,
};
