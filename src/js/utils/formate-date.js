import MONTHS from '../constants/months';

function cardDate(dateObj) {
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  return `${day} ${MONTHS[month]}, ${year}`;
}

function apiDate(dateObj) {
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (1 + dateObj.getMonth()).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
}

function nthDaysAgoFromDate(dateObj, days) {
  const daysMs = 1000 * 60 * 60 * 24 * days;
  const sevenDaysObj = new Date(Date.parse(dateObj) - daysMs);
  return apiDate(sevenDaysObj);
}

export default {
  cardDate, apiDate, nthDaysAgoFromDate,
};
