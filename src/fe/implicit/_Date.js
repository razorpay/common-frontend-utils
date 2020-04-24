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
 * @returns {Date}
 */
export const addHours = addTimeInUnits('hour');
export const addMinutes = addTimeInUnits('minute');
export const addSeconds = addTimeInUnits('second');

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
    dateInMonth += '0';
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
