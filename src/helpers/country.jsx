const getCountry = () => {
  const countryApi = 'https://api.theasiadev.com/countries';
  return fetch(countryApi)
    .then(res => res.json())
    .then(val => val.sort((a, b) => a.name.localeCompare(b.name)))
    .catch(() => []);
};

const getNationality = async () => {
  const countryList = await getCountry();
  return countryList.map(item => {
    let data = {};
    data = {
      id: item.id,
      name: item.name,
    };
    return data;
  });
};

const getCountriesCode = async () => {
  const countryList = await getCountry();
  const imgPath = 'http://theasia.imgix.net/countries/';
  return countryList.map(item => {
    let data = {};
    data = {
      id: item.id,
      code: `+${item.country_code}`,
      flag: `${imgPath}${item.flag}`,
    };
    return data;
  });
};

export { getCountry, getNationality, getCountriesCode };
