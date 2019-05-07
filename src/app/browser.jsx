import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { I18nextProvider } from 'react-i18next';

import IdleDetector from '../helpers/idleDetector';
import localeHelper from '../helpers/locale';

import i18n from './i18n.browser';
import client from './apollo.browser';
import App from './App';
import ScrollToTop from './scrollToTop';

class Browser extends Component {
  static loadClientImages(elm, baseSrc) {
    const newImg = new Image();
    newImg.src = baseSrc;
    newImg.onload = function() {
      // eslint-disable-next-line no-param-reassign
      elm.src = baseSrc;
      elm.removeAttribute('data-base');
      elm.classList.add('loaded');
    };
  }

  componentDidMount() {
    window.addEventListener('load', this.onContentLoaded);
    const idle = new IdleDetector(30);
    idle.detect();
  }

  onContentLoaded = () => {
    document.addEventListener('load', this.postLoadImages, true);
    const imgDiv = document.querySelectorAll('img');
    for (let i = 0; i < imgDiv.length; i += 1) {
      this.postLoadImages(imgDiv[i]);
    }
  };

  postLoadImages = event => {
    const elm = event.target || event;
    if (elm.nodeName.toLowerCase() === 'img') {
      const baseSrc = elm.getAttribute('data-base');
      if (baseSrc) {
        this.constructor.loadClientImages(elm, baseSrc);
      }
    }
  };

  render() {
    const { __i18n: { i18nStore = {}, locale = '' } = {} } = window;

    const userLocale = localeHelper.get();
    const routeBasename = userLocale === 'en' ? '' : `/${userLocale}`;
    return (
      <ApolloProvider client={client} store={{}}>
        <I18nextProvider i18n={i18n} initialI18nStore={i18nStore} initialLanguage={locale}>
          <BrowserRouter basename={routeBasename}>
            <ScrollToTop>
              <App i18n={i18n} />
            </ScrollToTop>
          </BrowserRouter>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}

export default hot(module)(Browser);
