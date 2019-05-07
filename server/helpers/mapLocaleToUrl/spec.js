process.env.BASE_API_URL = 'BASE_API_URL'; // being used in logger > axios

const mapLocaleToUrl = require('.');

describe('mapLocaleToUrl', () => {
  it('should return expected result', () => {
    expect(mapLocaleToUrl('', '')).toEqual('/');
    expect(mapLocaleToUrl('', 'en')).toEqual('/');
    expect(mapLocaleToUrl('', 'ko')).toEqual('/ko/');
    expect(mapLocaleToUrl('/', 'en')).toEqual('/');
    expect(mapLocaleToUrl('/', 'ko')).toEqual('/ko/');
    expect(mapLocaleToUrl('/discover', 'en')).toEqual('/discover/');
    expect(mapLocaleToUrl('/discover', 'ko')).toEqual('/ko/discover/');
    expect(mapLocaleToUrl('/ko/discover', 'en')).toEqual('/discover/');
    expect(mapLocaleToUrl('/ko/discover', 'th')).toEqual('/th/discover/');
    expect(mapLocaleToUrl('/discover/foo/bar', 'en')).toEqual('/discover/foo/bar/');
    expect(mapLocaleToUrl('/discover/foo/bar', 'ko')).toEqual('/ko/discover/foo/bar/');
    expect(mapLocaleToUrl('/ko/discover/foo/bar', 'en')).toEqual('/discover/foo/bar/');
    expect(mapLocaleToUrl('/discover?foo=bar', 'th')).toEqual('/th/discover?foo=bar');
    expect(mapLocaleToUrl('/ko/discover?foo=bar', 'en')).toEqual('/discover?foo=bar');
    expect(mapLocaleToUrl('/ko/discover?foo=bar', 'th')).toEqual('/th/discover?foo=bar');

    // NOTE: use case from a bug when disabled javascript
    // if no locale provided, we should return original url
    expect(mapLocaleToUrl('/ko/discover', '')).toEqual('/ko/discover/');
  });
});
