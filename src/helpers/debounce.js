// @flow
/* eslint-disable func-names */
function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout;
  return function(...args: any) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export default debounce;
