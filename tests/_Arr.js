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
});
