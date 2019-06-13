import { assert } from 'chai';
import * as _Arr from '../../../src/fe/implicit/_Arr';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
} = assert;

describe('_Arr', () => {
  describe('isSimilar', () => {
    it('says yes on arrays', () => {
      const result = _Arr.isSimilar([1, 2, 3]);
      isTrue(result);
    });

    it('says yes on strings', () => {
      const result = _Arr.isSimilar('razorpay');
      isTrue(result);
    });

    it('says no on objects', () => {
      const result = _Arr.isSimilar({
        foo: 'bar',
      });
      isFalse(result);
    });

    it('says no on non-arrays', () => {
      const result = _Arr.isSimilar(123);
      isFalse(result);
    });
  });

  describe('loop', () => {
    it('loops properly', () => {
      const array = [1, 2, 3];
      const duplicate = [];

      const returned = _Arr.loop(array, item => duplicate.push(item));

      deep(duplicate, array);
      deep(returned, array);
    });
  });

  describe('callAll', () => {
    it('calls all methods of array', () => {
      const array = [1, 2, 3];
      const duplicate = [];
      const pusher = item => () => duplicate.push(item);

      _Arr.callAll([pusher(1), pusher(2), pusher(3)]);

      deep(duplicate, array);
    });
  });

  describe('any', () => {
    const array = [1, 2, 3];

    it('returns true if fn evaluates to true', () => {
      const any = _Arr.any(array, x => x < 2);

      isTrue(any);
    });

    it('returns false if fn evaluates to false', () => {
      const any = _Arr.any(array, x => x > 3);

      isFalse(any);
    });
  });

  describe('every', () => {
    const array = [1, 2, 3];

    it('returns true if fn evaluates to true', () => {
      const every = _Arr.every(array, x => x < 4);

      isTrue(every);
    });

    it('returns false if fn evaluates to false', () => {
      const every = _Arr.every(array, x => x > 1);

      isFalse(every);
    });
  });

  describe('map', () => {
    const array = [1, 2, 3];
    const arrayCopy = [1, 2, 3];
    const expected = [1, 4, 9];
    const mapped = _Arr.map(array, x => x * x);

    it('maps properly', () => {
      deep(mapped, expected);
    });

    it('does not modify the original array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('filter', () => {
    const array = [1, 2, 3];
    const arrayCopy = [1, 2, 3];

    const expected = [1, 2];
    const filtered = _Arr.filter(array, x => x <= 2);

    it('filters properly', () => {
      deep(filtered, expected);
    });

    it('does not modify the original array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('indexOf', () => {
    const array = [1, 2, 3];

    it('finds index when item exists', () => {
      const index = _Arr.indexOf(array, 2);

      equal(index, 1);
    });

    it('returns -1 when item does not exist', () => {
      const index = _Arr.indexOf(array, 5);

      equal(index, -1);
    });
  });

  describe('join', () => {
    const array = ['Hello', 'World'];
    const arrayCopy = ['Hello', 'World'];

    const expected = 'Hello World';
    const joined = _Arr.join(array, ' ');

    it('joins properly', () => {
      equal(joined, expected);
    });

    it('does not modify the original array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('sort', () => {
    const array = [1, 2, 1, 3];
    const arrayCopy = [1, 2, 1, 3];

    const expected = [3, 2, 1, 1];
    const sorter = (first, second) => {
      if (first > second) {
        return -1;
      } else if (second > first) {
        return 1;
      } else {
        return 0;
      }
    };

    const sorted = _Arr.sort(array, sorter);

    it('sorts properly', () => {
      deep(sorted, expected);
    });

    it('modifies the original array', () => {
      notDeep(array, arrayCopy);
      deep(array, expected);
    });
  });

  describe('contains', () => {
    const array = [1, 2, 3];

    it('returns true if item is present', () => {
      const exists = _Arr.contains(array, 2);

      isTrue(exists);
    });

    it('returns false if item is absent', () => {
      const exists = _Arr.contains(array, 5);

      isFalse(exists);
    });
  });

  describe('findIndex', () => {
    const array = [1, 2, 3];
    const finder = item => value => value === item;

    it('finds proper index if item is present', () => {
      const index = _Arr.findIndex(array, finder(2));
      equal(index, 1);
    });

    it('returns -1 if item is absent', () => {
      const index = _Arr.findIndex(array, finder(6));
      equal(index, -1);
    });
  });

  describe('find', () => {
    const array = [1, 2, 3];
    const finder = item => value => value === item;

    it('finds when item is present', () => {
      const item = _Arr.find(array, finder(1));
      equal(item, 1);
    });

    it('does not find when item is absent', () => {
      const item = _Arr.find(array, finder(5));
      equal(typeof item, 'undefined');
    });
  });

  describe('prepend', () => {
    it('prepends an item', () => {
      const array = [1, 2, 3];
      const prepended = _Arr.prepend(array, 0);
      const expected = [0, 1, 2, 3];

      deep(prepended, expected);
    });
  });

  describe('append', () => {
    it('appends an item', () => {
      const array = [1, 2, 3];
      const appended = _Arr.append(array, 4);
      const expected = [1, 2, 3, 4];

      deep(appended, expected);
    });
  });

  describe('remove', () => {
    it('removes item if it exists', () => {
      const array = [1, 2, 3];
      const arrayCopy = [1, 2, 3];
      const removed = _Arr.remove(array, 2);
      const expected = [1, 3];

      deep(removed, expected);
      deep(array, arrayCopy);
    });

    it('does not remove item if it does not exist', () => {
      const array = [1, 2, 3];
      const arrayCopy = [1, 2, 3];
      const removed = _Arr.remove(array, 6);
      const expected = [1, 2, 3];

      deep(removed, expected);
      deep(array, arrayCopy);
    });
  });

  describe('first', () => {
    it('returns the first item', () => {
      const array = [1, 2, 3];
      const first = _Arr.first(array);

      equal(first, array[0]);
    });
  });

  describe('last', () => {
    it('returns the last item', () => {
      const array = [1, 2, 3];
      const last = _Arr.last(array);

      equal(last, array[array.length - 1]);
    });
  });

  describe('slice', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const arrayCopy = [1, 2, 3, 4, 5, 6];
    const sliced = _Arr.slice(array, 2, 4);
    const expected = [3, 4];

    it('returns the sliced version', () => {
      deep(sliced, expected);
    });

    it('does not modify the array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('sliceFrom', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const arrayCopy = [1, 2, 3, 4, 5, 6];
    const sliced = _Arr.sliceFrom(array, 3);
    const expected = [4, 5, 6];

    it('returns the sliced version', () => {
      deep(sliced, expected);
    });

    it('does not modify the array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('reduce', () => {
    const array = ['foo', 'bar', 'hello', 'world'];
    const arrayCopy = ['foo', 'bar', 'hello', 'world'];
    const expected = {
      foo: 3,
      bar: 3,
      hello: 5,
      world: 5,
    };
    const reducer = (accumulator, currentValue) => {
      accumulator[currentValue] = currentValue.length;

      return accumulator;
    };

    it('reduces properly', () => {
      const reduced = _Arr.reduce(array, reducer, {});

      deep(reduced, expected);
    });

    it('does not modify the original array', () => {
      deep(array, arrayCopy);
    });
  });

  describe('merge', () => {
    const first = [1, 2, 3, 4];
    const second = [3, 4, 5, 6];

    const expected = [3, 4, 5, 6, 1, 2, 3, 4];

    const firstCopy = [1, 2, 3, 4];
    const secondCopy = [3, 4, 5, 6];

    const merged = _Arr.merge(first, second);

    it('merges properly', () => {
      deep(merged, expected);
    });

    it('does not modify original arrays', () => {
      deep(first, firstCopy);
      deep(second, secondCopy);
    });
  });

  describe('mergeWith', () => {
    const first = [1, 2, 3, 4];
    const second = [3, 4, 5, 6];

    const expected = [1, 2, 3, 4, 3, 4, 5, 6];

    const firstCopy = [1, 2, 3, 4];
    const secondCopy = [3, 4, 5, 6];

    const merged = _Arr.mergeWith(first, second);

    it('merges properly', () => {
      deep(merged, expected);
    });

    it('does not modify original arrays', () => {
      deep(first, firstCopy);
      deep(second, secondCopy);
    });
  });
});
