module.exports = {
  toJson(input) {
    try {
      return JSON.parse(input);
    } catch (e) {
      return input;
    }
  },
};
