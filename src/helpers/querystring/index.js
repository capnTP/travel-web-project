import querystring from 'query-string';

export default {
  parse: querystring.parse,
  stringify: querystring.stringify,

  /**
   * parseWithArray - To parse search string to object
   * plus ability to turn value that has commas to array
   * (bacause `query-string` itself don't do this)
   *
   * @param  {string} searchString
   * @param  {string or [string]} keys keys of the search string that have to convert to array value
   * @return {Object}
   */
  parseWithArray(searchString, keys, separator = '!') {
    const parsed = querystring.parse(searchString);

    if (keys) {
      let newKeys = keys;

      if (!Array.isArray(keys)) {
        newKeys = [keys];
      }

      newKeys.forEach(key => {
        const value = parsed[key];

        if (value) {
          parsed[key] = value.split(separator);
        }
      });
    }

    return parsed;
  },
  /**
   * stringifyWithArray - To stringify an object to search string
   * lus ability to turn array to string with commas
   * (bacause `query-string` itself don't do this)
   *
   * @param  {Object} obj
   * @param  {string or [string]} keys keys of the input object that have to convert to string with commas
   * @return {string}
   */
  stringifyWithArray(obj, keys, separator = '!') {
    const newObj = { ...obj };

    if (keys) {
      let newKeys = keys;

      if (!Array.isArray(keys)) {
        newKeys = [keys];
      }

      newKeys.forEach(key => {
        let value = obj[key];

        // We don't want to leave empty key in query string
        // For example,
        // { keyA: '', keyB: 'b' }
        // It should be ?keyB=b
        if (!value || value.length === 0) {
          newObj[key] = undefined;
          return;
        }

        if (!Array.isArray(value)) {
          value = [value];
        }

        newObj[key] = value.join(separator);
      });
    }

    Object.keys(obj).forEach(k => {
      const value = obj[k];

      // We don't want to leave empty key in query string
      // For example,
      // { keyA: '', keyB: 'b' }
      // It should be ?keyB=b
      if (!value || value.length === 0) {
        newObj[k] = undefined;
      }
    });

    return querystring.stringify(newObj, { strict: false });
  },
};
