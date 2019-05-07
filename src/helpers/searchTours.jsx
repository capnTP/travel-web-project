import constants from '../constants';

const toursApi = `${constants.API_URL}/Tours/powersearch`;

const searchTour = async (input, type, language) => {
  let newType;
  let code;

  switch (type) {
    case 1:
      newType = 'all';
      break;
    case 2:
      newType = 'destinations';
      break;
    case 3:
      newType = 'tours_activity';
      break;
    default:
      newType = 'all';
      break;
  }

  switch (language) {
    case 'en':
      code = 1;
      break;
    case 'ko':
      code = 2;
      break;
    case 'zh':
      code = 3;
      break;
    case 'th':
      code = 4;
      break;
    default:
      code = 1;
      break;
  }

  let api = `${toursApi}?type=${newType}&lang_id=${code}`;
  if (input) {
    api = `${toursApi}?type=${newType}&query=${input}&lang_id=${code}`;
  }
  try {
    const response = await fetch(api);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return [];
  }
};

export default searchTour;
