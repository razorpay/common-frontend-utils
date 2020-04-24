import * as _ from './_';

const addTimeInUnits = mode => {
  const unitMap = {
    hour: 1,
    day: 24,
    minute: 1 / 60,
    second: 1 / 3600,
  };
  return _.curry2((date, units) => {
    return new Date(date.getTime() + units * 1000 * unitMap[mode] * 3600);
  });
};

/**
 * @description Add days to a date
 *
 * @param {Date} date Date to which days are to be added
 * @param {Number} units days to be added
 *
 * @returns {Date}
 */
export const addDays = addTimeInUnits('day');

/**
 * @description Add hours to a date
 *
 * @param {Date} date Date to which hours are to be added
 * @param {Number} units hours to be added
 *
 * @returns {Date} updated Date object
 */
export const addHours = addTimeInUnits('hour');

/**
 * @description Add minutes to a date
 *
 * @param {Date} date Date to which minutes are to be added
 * @param {Number} units minutes to be added
 *
 * @returns {Date} updated Date  object
 */
export const addMinutes = addTimeInUnits('minute');

/**
 * @description Add seconds to a date
 *
 * @param {Date} date Date to which seconds are to be added
 * @param {Number} units seconds to be added
 *
 * @returns {Date} updated Date object
 */
export const addSeconds = addTimeInUnits('second');

/**
 * @description Formates date object to target string format
 *
 * @param {Date} date Date which is to be formatted
 * @param {String} format String format in which the data is needed
 *
 * @example format(new Date(), 'DD/MM/YYYY') -> '24/04/2019'
 *
 * @returns {String} formatted date string
 */
export const format = _.curry2((date, format) => {
  const monthsFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December',
  ];
  const months = monthsFull.map(x => x.slice(0, 3));
  const monthsShort = Object.keys(monthsFull).map(x => {
    if (x < 10) return '0' + x;
    return x;
  });

  let dateInMonth = date.getDate();
  if (dateInMonth < 10) {
    dateInMonth = '0' + dateInMonth;
  }
  const month = date.getMonth();
  const year = date.getFullYear();

  format = format
    .replace('MMMM', monthsFull[month])
    .replace('MMM', months[month])
    .replace('MM', monthsShort[month])
    .replace('M', parseInt(monthsShort[month]))
    .replace('DD', dateInMonth)
    .replace('D', parseInt(dateInMonth))
    .replace('YYYY', parseInt(year));

  return format;
});
