import { assert } from 'chai';
import * as _Date from '../../../src/fe/implicit/_Date';

const {
  isTrue,
  isFalse,
  deepEqual: deep,
  notDeepEqual: notDeep,
  equal,
  isUndefined,
} = assert;

describe('_Date', () => {
  describe('format', () => {
    it('formats correctly', () => {
      equal(_Date.format(new Date(2099, 1, 10), 'DD-MM-YYYY'), '10-01-2099');
      equal(_Date.format(new Date(2099, 1, 10), 'M/D/YYYY'), '1/10/2099');
      equal(_Date.format(new Date(2099, 1, 10), 'MM/D/YYYY'), '01/10/2099');
      equal(_Date.format(new Date(2099, 1, 1), 'MM/DD/YYYY'), '01/01/2099');
    });
  });
  describe('addDays', () => {
    it('adds days correctly', () => {
      equal(
        _Date.format(_Date.addDays(new Date(2099, 1, 1), 10), 'M/D/YYYY'),
        '1/11/2099'
      );
    });
  });
  describe('addHours', () => {
    it('adds hours correctly', () => {
      equal(
        _Date.format(_Date.addHours(new Date(2099, 1, 10), 240), 'M/D/YYYY'),
        '1/20/2099'
      );
    });
  });
  describe('addMinutes', () => {
    it('adds minutes correctly', () => {
      equal(
        _Date.format(
          _Date.addMinutes(new Date(2099, 1, 10), 240 * 60),
          'M/D/YYYY'
        ),
        '1/20/2099'
      );
    });
  });
  describe('addSeconds', () => {
    it('adds seconds correctly', () => {
      equal(
        _Date.format(
          _Date.addSeconds(new Date(2099, 1, 10), 240 * 60 * 60),
          'M/D/YYYY'
        ),
        '1/20/2099'
      );
    });
  });
});
