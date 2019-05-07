import moment from 'moment';

export default {
  getDays() {
    const result = [];
    for (let i = 1; i <= 31; i += 1) {
      result.push(i);
    }
    return result;
  },
  getMonths() {
    const result = [];
    for (let i = 1; i <= 12; i += 1) {
      result.push(i);
    }
    return result;
  },
  getYears() {
    const result = [];
    let year = moment().year();
    for (let i = 0; i < 100; i += 1) {
      result.push(year);
      year -= 1;
    }
    return result;
  },
};
