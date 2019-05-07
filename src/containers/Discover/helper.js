// @flow
import queryString from '../../helpers/querystring';

const toNumber = (value: ?string): number => {
  const result = Number(value);

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
};

/**
 * For mapping array value from query-string
 * because sometimes when it has single value,
 * it will not return an array
 */
const toArray = (param: any): string[] => {
  if (!param) {
    return [];
  }

  if (Array.isArray(param)) {
    return param;
  }

  return [param];
};

/**
 * Extract categories from categoryTypes base on selected categoryTypeIds
 */
const getCategoriesFromProps = (props: Object): Object[] => {
  const { location = {}, cachesQuery: { categoryTypes } = {} } = props;

  if (!categoryTypes) {
    return [];
  }

  const parsedQuery = queryString.parseWithArray(location.search, 'categoryTypeIds');

  const categoryTypeIds = toArray(parsedQuery.categoryTypeIds);

  /**
   * Return all categories if no categoryTypeIds selected
   */
  if (categoryTypeIds.length === 0) {
    return categoryTypes.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue.categories],
      [],
    );
  }

  /**
   * Return only categories in selected category types
   */
  return categoryTypes.reduce((accumulator, currentValue) => {
    if (categoryTypeIds.indexOf(currentValue.id) === -1) {
      return accumulator;
    }

    return [...accumulator, ...currentValue.categories];
  }, []);
};

const processValue = (parsedQuery, key, value) => {
  const result = { ...parsedQuery };

  // 'all' should reset key's value
  if (value === 'all') {
    // Why undefined? See https://github.com/sindresorhus/query-string#falsy-values
    result[key] = undefined;
    return result;
  }

  let ids = toArray(result[key]);

  // Remove if it already exists
  if (ids.indexOf(value) > -1) {
    ids = ids.filter(x => x !== value);
  } else {
    ids.push(value);
  }

  result[key] = ids;
  return result;
};

const multiSelectMapper = (location, value, key) => {
  const parsedQuery = queryString.parseWithArray(location.search, key);
  const processQuery = processValue(parsedQuery, key, value);
  return queryString.stringifyWithArray(processQuery, key);
};

const singleSelectMapper = (location, value, key) => {
  const parsedQuery = queryString.parse(location.search);
  if (!value || value === parsedQuery[key]) {
    parsedQuery[key] = undefined;
  } else {
    parsedQuery[key] = value;
  }
  return queryString.stringify(parsedQuery);
};

const mapToggleToQueryString = ({
  key,
  value,
  props,
  multi = false,
}: {
  key: string,
  multi?: boolean,
  props: Object,
  value: string,
}) => {
  const { history = {}, location = {} } = props;
  const mapper = multi ? multiSelectMapper : singleSelectMapper;
  const search = mapper(location, value, key);
  history.push({ search });
};

const isLastPage = (total: number, page: number, limit: number) => {
  if (!page) {
    page = 1; // eslint-disable-line no-param-reassign
  }

  const loadedItem = page * limit;

  if (total - loadedItem <= 0) {
    return true;
  }

  return false;
};

const getCityLocalization = (language: ?{ id: string }, city: Object) => {
  if (!language || !city) {
    return {};
  }

  if (!city.localizations || city.localizations.length === 0) {
    return city;
  }

  const localization = city.localizations.find(l => {
    if (!language) {
      return false;
    }

    return l.languageId === language.id;
  });

  if (!localization) {
    return city;
  }

  return {
    ...city,
    name: localization.name,
    description: localization.description,
  };
};

const getLocalization = (
  language: ?Object,
  list: ?Array<Object>,
  callback: ?Function,
): Array<Object> => {
  if (!language || !list) {
    return [];
  }

  const result = list.map(i => {
    if (language && language.code === 'en') {
      return i;
    }

    const localization = i.localizations.find(l => {
      if (!language) {
        return false;
      }

      return l.languageId === language.id;
    });

    if (!localization) {
      return i;
    }

    return { ...i, ...localization, id: i.id };
  });

  if (callback) {
    return callback(result);
  }

  return result;
};

export default {
  getCategoriesFromProps,
  isLastPage,
  mapToggleToQueryString,
  toArray,
  getCityLocalization,
  getLocalization,
  toNumber,
};
