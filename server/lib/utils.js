import axios from 'axios';

import locale from '../helpers/locale';

export function matchStateToTerm(state, value) {
  return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}

export function sortStates(a, b, value) {
  const aLower = a.name.toLowerCase();
  const bLower = b.name.toLowerCase();
  const valueLower = value.toLowerCase();
  const queryPosA = aLower.indexOf(valueLower);
  const queryPosB = bLower.indexOf(valueLower);
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB;
  }
  return aLower < bLower ? -1 : 1;
}

let data = [{
  name: 'Thailand',
  slug: 'thailand',
  type: 'country',
  localization: {
    name: 'ประเทศไทย',
  },
}];

export function hotDestinations(lang, cb) {
  const langId = (lang && lang.id) ? lang.id : 1;
  //eslint-disable-next-line
  axios.get(`${API_SERVER}/Countries/destinations?lang_id=${langId}`).then((res) => {
    // console.log(res);
    data = res.data;
    return cb(res.data);
  }).catch(err => err);
}


//eslint-disable-next-line
export function autocomplete(value, cb) {
  if (value.length < 2) {
    return cb(data);
  }
  const GLOBAL_LANG = locale.get();
  const langId = (GLOBAL_LANG && GLOBAL_LANG.id) ? GLOBAL_LANG.id : 1;
  //eslint-disable-next-line
  axios.get(`${API_SERVER}/Tours/autocomplete/${value}?lang_id=${langId}`).then((res) => {
    return cb(res.data);
  }).catch(err => err);
}
