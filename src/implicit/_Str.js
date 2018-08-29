// https://vocajs.com/
const proto = _.prototypeOf(String);
const protoSlice = proto.slice;

export const pad = str => ' ' + str + ' ';
export const contains = _.curry2((str, substr) => str.indexOf(substr) !== -1);
export const slice = _.curry3((str, from, to) =>
  protoSlice.call(str, from, to)
);
export const sliceFrom = _.curry2((str, from) => protoSlice.call(str, from));
export const startsWith = _.curry2((str, substr) => str.indexOf(substr) === 0);
