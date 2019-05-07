/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { preloadReady } from 'react-loadable';

import 'classlist-polyfill';
import Browser from './app/browser';
import registerServiceWorker from './registerServiceWorker';

import './app/i18n.browser';

preloadReady().then(() => {
  ReactDOM.hydrate(<Browser />, document.getElementById('root'));
});
registerServiceWorker();
