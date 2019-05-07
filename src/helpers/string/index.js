// @flow
module.exports = {
  padEnd(value: string, preferredLength: number, chars: string): string {
    if (!value) {
      return '';
    }

    if (!preferredLength) {
      return value;
    }

    return value.substring(0, preferredLength).concat(chars);
  },
};
