const fs = require('fs');
const { execSync } = require('child_process');
const globalContents = fs
  .readFileSync(__dirname + '/../src/implicit/global.js')
  .toString();

const globalInjects = globalContents
  .match(/export const ([^ =]+)/g)
  .map(a => a.slice(13));

let injects = {
  fetch: 'implicit/fetch',
  _: ['implicit/_', '*'],
  Promise: 'implicit/Promise',
  _Arr: ['implicit/_Arr', '*'],
  _Str: ['implicit/_Str', '*'],
  _Func: ['implicit/_Func', '*'],
  _Obj: ['implicit/_Obj', '*'],
  _El: ['implicit/_El', '*'],
  _Doc: ['implicit/_Doc', '*']
};

globalInjects.forEach(g => {
  injects[g] = ['implicit/global', g];
});

module.exports = injects;
