const glob = require('glob');
const documentation = require('documentation');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const DIRS = {
  src: 'src',
  docs: 'docs',
};

const EXTS = {
  src: 'js',
  docs: 'md',
};

const sourceFiles = glob.sync(`${DIRS.src}/**/*.js`);

/**
 * Makes subdirectories given on the path.
 * @param {String} filePath
 */
function mkdirForFilePath(filePath) {
  const dirPath = path.dirname(filePath);
  mkdirp.sync(dirPath);
}

/**
 * Replaces the extension in a file path.
 * @param {String} filePath
 * @param {String} sourceExt
 * @param {String} withExt
 *
 * @returns {String}
 */
function replaceExtension(filePath, sourceExt, withExt) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath, sourceExt);

  return `${dir}/${fileName}${withExt}`;
}

// Generate src and dest file paths.
const files = sourceFiles.map(file => {
  let docsPath = file.replace(DIRS.src, DIRS.docs);
  docsPath = replaceExtension(docsPath, EXTS.src, EXTS.docs);

  return {
    src: file,
    dest: docsPath,
  };
});

// Generate documentation
files.forEach(file => {
  documentation
    .build(file.src, {
      shallow: true,
    })
    .then(documentation.formats.md)
    .then(output => {
      mkdirForFilePath(file.dest);

      fs.writeFileSync(file.dest, output);
      console.log(`Generated ${file.dest}`);
    });
});
