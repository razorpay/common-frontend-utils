import * as _ from './_';

/**
 * Tells whether argument passed is similar to an array.
 * @param {Any} x
 *
 * @returns {boolean}
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
 * @returns {Array}
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

/**
 * Says whether `fn` evaluates to true
 * for at least one element of `array`.
 * Array.prototype.some
 * @param {Array} array
 * @param {Function} fn
 *  @param {Any} item
 *
 *  @returns {boolean}
 *
 * @returns {boolean}
 */
export const any = arrayCall('some');

/**
 * Says whether `fn` evaluates to true
 * for every element of `array`.
 * Array.prototype.every
 * @param {Array} array
 * @param {Function} fn
 *  @param {Any} item
 *
 *  @returns {boolean}
 *
 * @returns {boolean}
 */
export const every = arrayCall('every');

/**
 * Returns a new function by mapping every
 * element of the array into a new element.
 * @param {Array} array
 * @param {Function} mapper
 *  @param {Any} item
 *
 *  @returns {Any} item
 *
 * @returns {Array}
 */
export const map = arrayCall('map');

/**
 * Returns a new array consisting of elements
 * from the orignal array that pass
 * the filter.
 * @param {Array} array
 * @param {Function} filterer
 *  @param {Any} item
 *
 *  @returns {boolean}
 *
 * @returns {Array}
 */
export const filter = arrayCall('filter');

/**
 * Returns the index of the item in the array.
 * @param {Array} array
 * @param {Any} item
 *
 * @returns {number}
 */
export const indexOf = arrayCall('indexOf');

/**
 * Returns a string by joining the elements of tha array.
 * @param {Array} array
 * @param {string} delimeter
 *
 * @returns {string}
 */
export const join = arrayCall('join');

/**
 * Returns a sorted array while sorting the array in place too.
 * @param {Array} array
 * @param {Function} sorter
 *  @param {Any} first
 *  @param {Any} second
 *
 *  @returns {number} 1 if a > b, -1 if b > a, 0 if a == b
 *
 * @returns {Array}
 */
export const sort = arrayCall('sort');

/**
 * Tells whether or not an array contains the given member.
 * @param {Array} array
 * @param {Any} member
 *
 * @returns {boolean}
 */
export const contains = _.curry2(
  (array, member) => indexOf(array, member) >= 0
);

/**
 * Returns the index of the first item in an array
 * for which iteratee evaluates to true.
 * @param {Array} arr
 * @param {Function} iteratee
 *  @param {Any} item
 *  @returns {boolean}
 *
 * @returns {number}
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
 *  @returns {boolean}
 *
 * @returns {Any}
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
 * @returns {Array}
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
 * @returns {Array}
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
 * @returns {Array}
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

/**
 * Returns the first item of the array.
 * @param {Array} array
 *
 * @returns {Any}
 */
export const first = array => array[0];

/**
 * Returns the last item of the array.
 * @param {Array} array
 *
 * @returns {Any}
 */
export const last = array => array[_.lengthOf(array) - 1];

/**
 * Returns a subarray from the array.
 * @param {Array} array
 * @param {number} from Initial index, included in the result
 * @param {number} to Last index, not included in the result
 *
 * @returns {Array}
 */
export const slice = _.curry3((array, from, to) =>
  protoSlice.call(array, from, to)
);

/**
 * Returns a subarray from the array
 * starting from the provided index,
 * till the end of the array
 * @param {Array} array
 * @param {number} from Initial index, included in the result
 *
 * @returns {Array}
 */
export const sliceFrom = _.curry2((array, from) =>
  protoSlice.call(array, from)
);

/**
 * Array.prototype.reduce
 * @param {Array} array
 * @param {Function} reducer
 *  @param {Any} accumulator Returned value so far
 *  @param {Any} currentValue Element of `array`
 *
 *  @returns {Any}
 * @param {Any} initialValue
 *
 * @returns {Any}
 */
export const reduce = _.curry3((array, reducer, initialValue) =>
  proto.reduce.call(array, reducer, initialValue)
);

/**
 * Merges array1 into array2.
 * Result: [...array2, ...array2]
 * @param {Array} arr1
 * @param {Array} arr2
 *
 * @returns {Array}
 */
export const merge = _.curry2((arr1, arr2) => {
  const arr2Len = _.lengthOf(arr2);
  var combinedArray = Array(arr2Len + _.lengthOf(arr1));
  loop(arr2, (member, index) => (combinedArray[index] = member));
  loop(arr1, (member, index) => (combinedArray[index + arr2Len] = member));
  return combinedArray;
});

/**
 * Merges array1 with array2.
 * Result: [...array1, ...array2]
 * @param {Array} arr1
 * @param {Array} arr2
 *
 * @returns {Array}
 */
export const mergeWith = _.curry2((arr1, arr2) => {
  return merge(arr2, arr1);
});
