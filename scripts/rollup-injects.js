const fs = require('fs');
const { execSync } = require('child_process');
const globalContents = fs
  .readFileSync(__dirname + '/../src/fe/implicit/global.js')
  .toString();

const globalInjects = globalContents
  .match(/export const ([^ =]+)/g)
  .map(a => a.slice(13));

let injects = {
  // this is rollup option, not an inject
  include: ['**/*.js', '**/*.svelte'],

  // injects
  fetch: 'fe/implicit/fetch',
  _: ['fe/implicit/_', '*'],
  Promise: 'fe/implicit/Promise',
  _Arr: ['fe/implicit/_Arr', '*'],
  _Str: ['fe/implicit/_Str', '*'],
  _Func: ['fe/implicit/_Func', '*'],
  _Obj: ['fe/implicit/_Obj', '*'],
  _El: ['fe/implicit/_El', '*'],
  _Doc: ['fe/implicit/_Doc', '*'],
};

globalInjects.forEach(g => {
  injects[g] = ['fe/implicit/global', g];
});

module.exports = injects;
