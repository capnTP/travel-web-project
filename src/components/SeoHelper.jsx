// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter, type Match } from 'react-router-dom';

import constants from '../constants';

const BASE_URL = constants.SERVER_URL;

// type AvailableLanguage = 'en' | 'th' | 'ko' | 'zh';

type Locales = { en: string, ko: string, th: string, zh: string };

type Props = {
  description?: string,
  image?: string,
  isPublished?: boolean,
  keywords?: string,
  locale?: string,
  match: Match,
  noIndexNoFollow?: boolean,
  ogType?: string,
  title?: string,
};

const renderNoIndexNoFollowElement = ({
  serverType,
  isPublished,
  noIndexNoFollow,
}: {
  isPublished: boolean,
  noIndexNoFollow: boolean,
  serverType: string,
}): null | React.Element<'meta'> => {
  let isDevelopment = true;
  if (typeof window === 'undefined') {
    isDevelopment = serverType !== 'production';
  } else {
    const hostname = (window && window.location.hostname) || '';

    if (hostname.indexOf('theasia.com') > -1) {
      isDevelopment = false;
    }
  }

  if (!isPublished || isDevelopment || noIndexNoFollow) {
    return <meta content="noindex, nofollow" name="robots" />;
  }

  return null;
};

// const renderHrefLangTags = (
//   urls: { active: string, locales: Locales },
//   availableLanguages: AvailableLanguage[],
//   activeLocale: string,
// ) => {
//   let hrefLangTags = [
//     { element: <link key="en" href={urls.locales.en} hrefLang="en" rel="alternate" />, id: 'en' },
//     { element: <link key="ko" href={urls.locales.ko} hrefLang="ko" rel="alternate" />, id: 'ko' },
//     { element: <link key="zh" href={urls.locales.zh} hrefLang="zh" rel="alternate" />, id: 'zh' },
//     { element: <link key="th" href={urls.locales.th} hrefLang="th" rel="alternate" />, id: 'th' },
//   ];

//   if (availableLanguages.length > 0) {
//     hrefLangTags = hrefLangTags.reduce((acc, val) => {
//       if (availableLanguages.indexOf(val.id) > -1 && val.id !== activeLocale) {
//         acc.push(val);
//       }
//       return acc;
//     }, []);
//   }

//   return hrefLangTags.map(h => h.element);
// };

class SeoHelper extends React.Component<Props> {
  static defaultProps = {
    title: '',
    keywords: '',
    description: '',
    ogType: '',
    image: '',
    isPublished: false,
    locale: 'en',
    noIndexNoFollow: false,
  };

  locales: Locales = { en: '', ko: '', th: '', zh: '' };

  createUrls = () => {
    const { match: { url: pathname = '' } = {}, locale = '' } = this.props;
    Object.keys(this.locales).forEach(key => {
      this.locales[key] = `${BASE_URL}/${key}${pathname}`;
    });
    this.locales.en = `${BASE_URL}${pathname}`;
    return {
      active: this.locales[locale || 'en'],
      locales: this.locales,
    };
  };

  render() {
    const { title, keywords, description, ogType, image } = this.props;
    // const availableLanguages = this.props.availableLanguages || [];
    const urls = this.createUrls();

    const noIndexNoFollow = this.props.noIndexNoFollow || false;
    const isPublished = this.props.isPublished || false;
    const noIndexNoFollowElement = renderNoIndexNoFollowElement({
      serverType: constants.SERVER_TYPE,
      isPublished,
      noIndexNoFollow,
    });

    if (noIndexNoFollowElement !== null) {
      console.warn(`${this.props.match.path} has no-index no-follow tag`); // eslint-disable-line no-console
    }

    const imageSrc = image || `${BASE_URL}/site/images/icons/icon-256x256.png`;

    // const activeLocale = locale || 'en';
    return (
      <Helmet>
        <title>{title}</title>
        {noIndexNoFollowElement}
        <meta content={keywords} name="keywords" />
        <meta content={description} name="description" />
        <meta content={ogType} property="og:type" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={imageSrc} property="og:image" />
        <meta content={urls.active} property="og:url" />
        {/* <link href={urls.active} rel="canonical" />
        {renderHrefLangTags(urls, availableLanguages, activeLocale)} */}
      </Helmet>
    );
  }
}

export default withRouter(SeoHelper);
