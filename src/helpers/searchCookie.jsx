const getLastSearchCookie = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const saveSearchCookie = (cname, cvalue, exdays) => {
  if (typeof document !== 'undefined') {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const lastSearch = [getLastSearchCookie(cname)] || [];
    lastSearch.push(cvalue);

    document.cookie = `${cname}=${lastSearch};${expires};path=/`;
  }
};

const deleteSearchCookie = () => {
  if (typeof document !== 'undefined') {
    const d = new Date();
    d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);
    document.cookie = 'lastSearch=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ;path=/;';
  }
};

export { saveSearchCookie, getLastSearchCookie, deleteSearchCookie };
