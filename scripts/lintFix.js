#!/usr/bin/env node
const { lintFix } = require('./eslint');

lintFix(process.argv.slice(2));
