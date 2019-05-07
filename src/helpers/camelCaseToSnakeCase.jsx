const key = text => {
  const upperChars = text.match(/([A-Z])/g);
  if (!upperChars) {
    return text;
  }

  let str = text.toString();
  for (let i = 0, n = upperChars.length; i < n; i += 1) {
    str = str.replace(new RegExp(upperChars[i]), `_${upperChars[i].toLowerCase()}`);
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1);
  }

  return str;
};

export default key;
