#!/usr/bin/env node
const { lintLog, lintCompat } = require('./eslint');

lintLog(lintCompat.executeOnFiles(process.argv.slice(2)));
