import { expect } from 'chai';

import * as _Arr from '../src/fe/implicit/_Arr';

describe('_Arr', () => {
  describe('isSimilar', () => {
    it('says yes on arrays', () => {
      const result = _Arr.isSimilar([1, 2, 3]);
      expect(result).to.equal(true);
    });

    it('says yes on strings', () => {
      const result = _Arr.isSimilar('razorpay');
      expect(result).to.equal(true);
    });

    it('says no on objects', () => {
      const result = _Arr.isSimilar({
        foo: 'bar',
      });
      expect(result).to.equal(false);
    });

    it('says no on non-arrays', () => {
      const result = _Arr.isSimilar(123);
      expect(result).to.equal(false);
    });
  });

  describe('loop', () => {
    it('loops properly', () => {
      const array = [1, 2, 3];
      const duplicate = [];

      const returned = _Arr.loop(array, item => duplicate.push(item));

      expect(duplicate).to.deep.equal(array);
      expect(returned).to.deep.equal(array);
    });
  });

  describe('callAll', () => {
    it('calls all methods of array', () => {
      const array = [1, 2, 3];
      const duplicate = [];
      const pusher = item => () => duplicate.push(item);

      _Arr.callAll([pusher(1), pusher(2), pusher(3)]);

      expect(duplicate).to.deep.equal(array);
    });
  });

  describe('any', () => {
    const array = [1, 2, 3];

    it('returns true if fn evaluates to true', () => {
      const any = _Arr.any(array, x => x < 2);

      expect(any).to.equal(true);
    });

    it('returns false if fn evaluates to false', () => {
      const any = _Arr.any(array, x => x > 3);

      expect(any).to.equal(false);
    });
  });

  describe('every', () => {
    const array = [1, 2, 3];

    it('returns true if fn evaluates to true', () => {
      const every = _Arr.every(array, x => x < 4);

      expect(every).to.equal(true);
    });

    it('returns false if fn evaluates to false', () => {
      const every = _Arr.every(array, x => x > 1);

      expect(every).to.equal(false);
    });
  });

  describe('map', () => {
    const array = [1, 2, 3];
    const arrayCopy = [1, 2, 3];
    const expected = [1, 4, 9];
    const mapped = _Arr.map(array, x => x * x);

    it('maps properly', () => {
      expect(mapped).to.deep.equal(expected);
    });

    it('does not modify the original array', () => {
      expect(array).to.deep.equal(arrayCopy);
    });
  });

  describe('filter', () => {
    const array = [1, 2, 3];
    const arrayCopy = [1, 2, 3];

    const expected = [1, 2];
    const filtered = _Arr.filter(array, x => x <= 2);

    it('filters properly', () => {
      expect(filtered).to.deep.equal(expected);
    });

    it('does not modify the original array', () => {
      expect(array).to.deep.equal(arrayCopy);
    });
  });

  describe('indexOf', () => {
    const array = [1, 2, 3];

    it('finds index when item exists', () => {
      const index = _Arr.indexOf(array, 2);

      expect(index).to.equal(1);
    });

    it('returns -1 when item does not exist', () => {
      const index = _Arr.indexOf(array, 5);

      expect(index).to.equal(-1);
    });
  });

  describe('join', () => {
    const array = ['Hello', 'World'];
    const arrayCopy = ['Hello', 'World'];

    const expected = 'Hello World';
    const joined = _Arr.join(array, ' ');

    it('joins properly', () => {
      expect(joined).to.equal(expected);
    });

    it('does not modify the original array', () => {
      expect(array).to.deep.equal(arrayCopy);
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
      expect(sorted).to.deep.equal(expected);
    });

    it('modifies the original array', () => {
      expect(array).to.not.deep.equal(arrayCopy);
      expect(array).to.deep.equal(expected);
    });
  });

  describe('contains', () => {
    const array = [1, 2, 3];

    it('returns true if item is present', () => {
      const exists = _Arr.contains(array, 2);

      expect(exists).to.equal(true);
    });

    it('returns false if item is absent', () => {
      const exists = _Arr.contains(array, 5);

      expect(exists).to.equal(false);
    });
  });

  describe('findIndex', () => {
    const array = [1, 2, 3];
    const finder = item => value => value === item;

    it('finds proper index if item is present', () => {
      const index = _Arr.findIndex(array, finder(2));
      expect(index).to.equal(1);
    });

    it('returns -1 if item is absent', () => {
      const index = _Arr.findIndex(array, finder(6));
      expect(index).to.equal(-1);
    });
  });

  describe('find', () => {
    const array = [1, 2, 3];
    const finder = item => value => value === item;

    it('finds when item is present', () => {
      const item = _Arr.find(array, finder(1));
      expect(item).to.equal(1);
    });

    it('does not find when item is absent', () => {
      const item = _Arr.find(array, finder(5));
      expect(item).to.be.an('undefined');
    });
  });

  describe('prepend', () => {
    it('prepends an item', () => {
      const array = [1, 2, 3];
      const prepended = _Arr.prepend(array, 0);
      const expected = [0, 1, 2, 3];

      expect(prepended).to.deep.equal(expected);
    });
  });

  describe('append', () => {
    it('appends an item', () => {
      const array = [1, 2, 3];
      const appended = _Arr.append(array, 4);
      const expected = [1, 2, 3, 4];

      expect(appended).to.deep.equal(expected);
    });
  });

  describe('remove', () => {
    it('removes item if it exists', () => {
      const array = [1, 2, 3];
      const arrayCopy = [1, 2, 3];
      const removed = _Arr.remove(array, 2);
      const expected = [1, 3];

      expect(removed).to.deep.equal(expected);
      expect(array).to.deep.equal(arrayCopy);
    });

    it('does not remove item if it does not exist', () => {
      const array = [1, 2, 3];
      const arrayCopy = [1, 2, 3];
      const removed = _Arr.remove(array, 6);
      const expected = [1, 2, 3];

      expect(removed).to.deep.equal(expected);
      expect(array).to.deep.equal(arrayCopy);
    });
  });

  describe('first', () => {
    it('returns the first item', () => {
      const array = [1, 2, 3];
      const first = _Arr.first(array);

      expect(first).to.equal(array[0]);
    });
  });

  describe('last', () => {
    it('returns the last item', () => {
      const array = [1, 2, 3];
      const last = _Arr.last(array);

      expect(last).to.equal(array[array.length - 1]);
    });
  });

  describe('slice', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const arrayCopy = [1, 2, 3, 4, 5, 6];
    const sliced = _Arr.slice(array, 2, 4);
    const expected = [3, 4];

    it('returns the sliced version', () => {
      expect(sliced).to.deep.equal(expected);
    });

    it('does not modify the array', () => {
      expect(array).to.deep.equal(arrayCopy);
    });
  });

  describe('sliceFrom', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const arrayCopy = [1, 2, 3, 4, 5, 6];
    const sliced = _Arr.sliceFrom(array, 3);
    const expected = [4, 5, 6];

    it('returns the sliced version', () => {
      expect(sliced).to.deep.equal(expected);
    });

    it('does not modify the array', () => {
      expect(array).to.deep.equal(arrayCopy);
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

      expect(reduced).to.deep.equal(expected);
    });

    it('does not modify the original array', () => {
      expect(array).to.deep.equal(arrayCopy);
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
      expect(merged).to.deep.equal(expected);
    });

    it('does not modify original arrays', () => {
      expect(first).to.deep.equal(firstCopy);
      expect(second).to.deep.equal(secondCopy);
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
      expect(merged).to.deep.equal(expected);
    });

    it('does not modify original arrays', () => {
      expect(first).to.deep.equal(firstCopy);
      expect(second).to.deep.equal(secondCopy);
    });
  });
});
