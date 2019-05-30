import * as _ from './_';

/**
 * Tells whether argument passed is similar to an array.
 * @param {Any} x
 *
 * @return {Boolean}
 */
export const isSimilar = x => _.isNumber(_.lengthOf(x));

const proto = _.prototypeOf(Array);
const protoSlice = proto.slice;

/**
 * Loops through the array and calls
 * iteratee with each item.
 * Equal to Array.prototype.forEach.
 * @param {Array} array
 * @param {Function} iteratee
 *
 * @return {Array}
 */
export const loop = _.curry2((array, iteratee) => {
  array && proto.forEach.call(array, iteratee);
  return array;
});

/**
 * Invokes all functions in the array.
 * @param {Array<Function>} array
 */
export const callAll = array => loop(array, a => a());

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

/**
 * Returns the index of the first item in an array
 * for which iteratee evaluates to true.
 * @param {Array} arr
 * @param {Function} iteratee
 *  @param {Any} item
 *  @return {Boolean}
 *
 * @return {Number}
 */
export const findIndex = _.curry2((arr, iteratee) => {
  let arrayLen = _.lengthOf(arr);
  for (let i = 0; i < arrayLen; i++) {
    if (iteratee(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
});

/**
 * Returns the first item in an array
 * for which iteratee evaluates to true.
 * @param {Array} arr
 * @param {Function} iteratee
 *  @param {Any} item
 *  @return {Boolean}
 *
 * @return {Any}
 */
export const find = _.curry2((arr, iteratee) => {
  let index = findIndex(arr, iteratee);
  if (index >= 0) {
    return arr[index];
  }
});

/**
 * Prepends an item to an array.
 * @param {Array} array
 * @param {Any} member
 *
 * @return {Array}
 */
export const prepend = _.curry2((array, member) => {
  const newArray = Array(_.lengthOf(array) + 1);
  newArray[0] = member;
  loop(array, (member, index) => (newArray[index + 1] = member));
  return newArray;
});

/**
 * Appends an item to an array.
 * @param {Array} array
 * @param {Any} member
 *
 * @return {Array}
 */
export const append = _.curry2((array, member) => {
  const arrayLen = _.lengthOf(array);
  const newArray = Array(arrayLen + 1);
  newArray[arrayLen] = member;
  loop(array, (member, index) => (newArray[index] = member));
  return newArray;
});

/**
 * Returns an array with the member
 * removed from the original array.
 * Does not modify the original array.
 * @param {Array} array
 * @param {Any} member
 *
 * @return {Array}
 */
export const remove = _.curry2((array, member) => {
  let memberIndex = indexOf(array, member);

  if (memberIndex >= 0) {
    return protoSlice
      .call(array, 0, memberIndex)
      .concat(protoSlice.call(array, memberIndex + 1));
  } else {
    return array;
  }
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
