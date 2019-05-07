module.exports = fn => {
  try {
    return fn();
  } catch (error) {
    return null;
  }
};
