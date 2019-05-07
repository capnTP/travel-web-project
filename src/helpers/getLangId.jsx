const getLangId = locale => {
  let id = 1;

  switch (locale) {
    case 'en':
      id = 1;
      break;

    case 'ko':
      id = 2;
      break;

    case 'zh':
      id = 3;
      break;

    case 'th':
      id = 4;
      break;

    default:
      id = 1;
  }
  return id;
};

export default getLangId;
