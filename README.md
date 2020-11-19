# Common Frontend Utils

> Utils, rules, and configs that are shared by Frontend projects @ [Razorpay](https://razorpay.com)

[![Build Status](https://api.travis-ci.com/razorpay/common-frontend-utils.svg?branch=master)](https://travis-ci.com/razorpay/common-frontend-utils)

## Documentation

Documentation can be found in the [docs](docs) directory.

## Things used in/from this repo

- [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) for tests
- [Istanbul](https://istanbul.js.org/) for coverage
- [JSDoc](https://jsdoc.app/), [Documentation](https://documentation.js.org/) for documentation
- [Babel](https://babeljs.io/) for transpiling
- [Rollup](https://rollupjs.org/) for bundling
- [Stylus](http://stylus-lang.com/) for CSS
- [ESLint](https://eslint.org/) for linting

## Commands

- Used with Node v10.18.0
- `npm i` to install all dependencies

### Development/Playground

- `npm run play:implicit` - Starts a playground of `fe/implicit` modules. Navigate to `play/implicit/index.html` from the browser.

### Documentation

- `npm run lint-documentation` - Lints documentation
- `npm run document` - Generates documentation

### Tests

- `npm run test:singular <path_to_file>` - Run tests for specified file/path
- `npm run test` - Runs all tests
- `npm run coverage` - Runs all tests and prints coverage
- `npm run build-coverage` - Runs all tests and generates HTML coverage in `coverage` directory

# Contents

### Binaries ([`bin`](bin))

- `$` - Injects the scope of this repository into the consuming repository
- `serve` - Reverse proxy, simplified. Usage: `serve folder --port 8000 --proxy /api=https://api.razorpay.com`

### Implicit Modules ([`src/fe/implicit`](src/fe/implicit))

- `_` - General utils
- `_Str` - String utils
- `_Arr` - Array utils
- `_Obj` - Object utils
- `_Func` - Function utils
- `_Doc` - `window.document` utils
- `_El` - Utils for DOM elements
- `global` - `window.*` or `global.*` utils
- `fetch` - AJAX util
- `Promise` - Promise polyfill

### Scripts ([`scripts`](scripts))

- `babel-plugins` - List and config of babel plugins
- `eslint` - ESLint helpers and config
- `eslint-compat`
- `estlinrc` - ESLint rules
- `lintOutput` - Helpers to lint generated builds
- `rollup-injects` - Implicit injects for rollup
- `rollup-plugins` - Utils for rollup
- `rollup-plugin-stylus` - Rollup utils for bundling Stylus
