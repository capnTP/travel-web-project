export default {
  getGroupSize({ adult_pax = 0, child_pax = 0, infant_pax = 0 }) {
    const sum = adult_pax + child_pax + infant_pax;

    switch (true) {
      case sum === 1:
        return 1;
      case sum === 2:
        return 2;
      case sum >= 3 && sum <= 5:
        return 3;
      case sum >= 6:
        return 4;
      default:
        return 1;
    }
  },
};
