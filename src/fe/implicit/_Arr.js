// array utils
export const isSimilar = x => _.isNumber(_.lengthOf(x));
const proto = _.prototypeOf(Array);

const protoSlice = proto.slice;

export const loop = _.curry2((array, iteratee) => {
  array && proto.forEach.call(array, iteratee);
  return array;
});

export const callAll = array => loop(a => a());

const arrayCall = func => _.curry2((arr, arg) => proto[func].call(arr, arg));
export const any = arrayCall('some');
export const every = arrayCall('every');
export const map = arrayCall('map');
export const filter = arrayCall('filter');
export const indexOf = arrayCall('indexOf');
export const join = arrayCall('join');
export const sort = arrayCall('sort');
export const contains = _.curry2(
  (array, member) => indexOf(array, member) >= 0
);

export const findIndex = _.curry2((arr, iteratee) => {
  let arrayLen = _.lengthOf(arr);
  for (let i = 0; i < arrayLen; i++) {
    if (iteratee(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
});

export const find = _.curry2((arr, iteratee) => {
  let index = findIndex(arr, iteratee);
  if (index > 0) {
    return arr[index];
  }
});

export const prepend = _.curry2((array, member) => {
  const newArray = Array(_.lengthOf(array) + 1);
  newArray[0] = member;
  loop(array, (member, index) => (newArray[index + 1] = member));
  return newArray;
});

export const append = _.curry2((array, member) => {
  const arrayLen = _.lengthOf(array);
  const newArray = Array(arrayLen + 1);
  newArray[arrayLen] = member;
  loop(array, (member, index) => (newArray[index] = member));
  return newArray;
});

export const remove = _.curry2((array, member) => {
  let memberIndex = indexOf(array, member);
  return protoSlice
    .call(array, 0, memberIndex)
    .concat(protoSlice.call(array, memberIndex + 1));
});

export const first = array => array[0];
export const last = array => array[_.lengthOf(array) - 1];

export const slice = _.curry3((array, from, to) =>
  protoSlice.call(array, from, to)
);
export const sliceFrom = _.curry2((array, from) =>
  protoSlice.call(array, from)
);

export const reduce = _.curry3((array, reducer, initialValue) =>
  proto.reduce.call(array, reducer, initialValue)
);

export const merge = _.curry2((arr1, arr2) => {
  const arr2Len = _.lengthOf(arr2);
  var combinedArray = Array(arr2Len + _.lengthOf(arr1));
  loop(arr2, (member, index) => (combinedArray[index] = member));
  loop(arr1, (member, index) => (combinedArray[index + arr2Len] = member));
  return combinedArray;
});
