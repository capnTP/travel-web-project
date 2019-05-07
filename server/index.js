/* eslint-disable no-process-env, max-len */
import path from 'path';
import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import i18next from 'i18next';
import forceDomain from 'forcedomain';
import device from 'express-device';
import uaRedirect from 'express-ua-redirect';
import { preloadAll } from 'react-loadable';

// React 16v new app routed for /discover
import serverRender from '../build/handleRoutes';
import stats from '../build/react-loadable.json';
import webpackAssets from '../build/asset-manifest.json';
import config from '../config';

import axios from './helpers/axios';
import i18nInit from './i18n.server';
import env from './environmentVariables';
import redirectRoutes from './redirects';
import logger from './logger';

require('./onUncaughtException');

const SERVER_TYPE = process.env.SERVER_TYPE;

const i18nMiddleware = require('i18next-express-middleware');
const sm = require('sitemap');
const Backend = require('i18next-node-fs-backend');
const helmet = require('helmet');
const cookiesMiddleware = require('universal-cookie-express');

const mapLocaleToUrl = require('./helpers/mapLocaleToUrl');

const i18n = i18nInit(Backend);

i18next.use(i18nMiddleware.LanguageDetector).init({
  preload: ['en', 'ko', 'th', 'zh'],
});

const hostUrl = 'https://www.theasia.com';

const sitemap = sm.createSitemap({
  hostname: hostUrl,
  urls: [
    { changefreq: 'daily', url: '/' },
    { changefreq: 'daily', url: '/ko/' },
    { changefreq: 'daily', url: '/zh/' },
    { changefreq: 'daily', url: '/th/' },
    { changefreq: 'daily', url: '/cities/' },
    { changefreq: 'daily', url: '/ko/cities/' },
    { changefreq: 'daily', url: '/zh/cities/' },
    { changefreq: 'daily', url: '/th/cities/' },
    { changefreq: 'daily', url: '/discover/' },
    { changefreq: 'daily', url: '/ko/discover/' },
    { changefreq: 'daily', url: '/zh/discover/' },
    { changefreq: 'daily', url: '/terms/' },
    { changefreq: 'daily', url: '/ko/terms/' },
    { changefreq: 'daily', url: '/zh/terms/' },
    { changefreq: 'daily', url: '/th/terms/' },
    { changefreq: 'daily', url: '/contact-us/' },
    { changefreq: 'daily', url: '/ko/contact-us/' },
    { changefreq: 'daily', url: '/zh/contact-us/' },
    { changefreq: 'daily', url: '/th/contact-us/' },
    { changefreq: 'daily', url: '/about-us/' },
    { changefreq: 'daily', url: '/th/about-us/' },
    { changefreq: 'daily', url: '/th/about-us/' },
    { changefreq: 'daily', url: '/th/about-us/' },
  ],
});

let flag = false;
axios
  .get('https://api.theasia.com/Cities/sitemap')
  .then(res => {
    if (!flag) {
      res.data.forEach(item => {
        const urlLine = {
          url: `/${item.slug}/`,
          changefreq: 'daily',
        };
        sitemap.add(urlLine);
      });
      fs.writeFileSync(`${__dirname}/sitemap.xml`, sitemap.toString());
      flag = true;
    }
  })
  .catch(err => {
    console.log('API response failed to get urls');
    return err;
  });

const app = express();
app.use(helmet.xssFilter());
app.use(cookiesMiddleware());

app.use(
  i18nMiddleware.handle(i18n, {
    removeLngFromUrl: false,
  }),
);

const port = config.port;

app.use((req, res, next) => {
  let err = null;
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    err = e;
  }
  if (err) {
    console.log(err, req.url);
    return res.redirect('/page-not-found');
  }
  next();
});

// Keep url lowercase in case of any uppercase found in url;
app.use((req, res, next) => {
  const mainUrl = req.url.split('?')[0];
  if (
    mainUrl !== '/' &&
    (mainUrl.startsWith('/discover') ||
      mainUrl.startsWith('/ko/discover') ||
      mainUrl.startsWith('/th/discover') ||
      mainUrl.startsWith('/zh/discover')) &&
    (mainUrl === mainUrl.toUpperCase() || mainUrl !== mainUrl.toLowerCase())
  ) {
    return res.redirect(mainUrl.toLowerCase());
  }
  next();
});

const hostname = SERVER_TYPE === 'production' ? 'www.theasia.com' : 'www.theasiadev.com';

if (SERVER_TYPE === 'production' || SERVER_TYPE === 'development') {
  app.use(forceDomain({ hostname, protocol: 'https' }));
}

if (SERVER_TYPE !== 'production' && SERVER_TYPE !== 'development') {
  app.use('*', cors());
} else {
  app.use(
    cors({
      origin: [
        'https://theasia.com',
        'https://www.theasia.com',
        'http://www.theasiadev.com',
        'https://shop.theasia.com',
        'https://dtqhtyynspr54.cloudfront.net',
        'https://d3jq6ro99p575u.cloudfront.net',
      ],
      default: env.APP_URL,
    }),
  );
}
app.use(bodyParser.json());
app.use(device.capture());

// Static path for new app build folder
// console.log('Path : ', path.resolve(__dirname, '../build'));
app.use('/site', express.static(path.resolve(__dirname, '../build')));
app.use('/static', express.static(path.resolve(__dirname, '../build/static')));
app.use('/locales', express.static(path.resolve(__dirname, '../build/locales')));

app.use('/incompatible-browser', express.static(path.join(`${__dirname}/incompatible-browser`)));

app.use(
  uaRedirect({
    browsers: {
      unauthorized: {
        IE: '10-',
      },
    },
    redirectTo: '/incompatible-browser',
  }),
);

// for developmentget
app.get('/googled2d61b0c292a9e03.html', (req, res) => {
  res.sendFile(`${__dirname}/googled2d61b0c292a9e03.html`);
});

app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'text/xml');
  return res.sendFile(`${__dirname}/sitemap.xml`);
});

app.get('/build-version', (req, res) => {
  res.set('Content-Type', 'text/json');
  return res.sendFile(`${__dirname}/version.json`);
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(`${__dirname}/service-worker.js`);
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(`${__dirname}/robots.txt`);
});

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'staticHtml'));

app.get('/Iamports/createPayment/:bookingId', async (req, res) => {
  const bookingData = (await axios.get(`/bookings/${req.params.bookingId}`)).data;
  const refPrefix = SERVER_TYPE === 'production' ? 'PRO' : 'DEV';
  const d = new Date(bookingData.created_at);
  const dd = `0${d.getDate()}`.slice(-2);
  const mm = `0${d.getMonth()}`.slice(-2);
  const yyyy = d.getFullYear();
  const refId = `${refPrefix}-${bookingData.id}-${dd}${mm}-${yyyy}`;
  return res.render('createPayment', {
    refId,
    bookingId: bookingData.id,
    amount: bookingData.total,
    firstname: bookingData.billing_first_name,
    lastname: bookingData.billing_last_name,
    tourName: bookingData.tour.slug,
    phone: bookingData.billing_phone,
    m_redirect_url: `${env.APP_URL}/please-wait`,
  });
});

app.get('/please-wait', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'staticHtml/please-wait.html'));
});

app.get(
  '*',
  (req, res, next) => {
    // NOTE: to redirect to url base on user's locale setting
    const userLocale = req.universalCookies.get('user-locale');
    const pathToRedirect = mapLocaleToUrl(req.url, userLocale);
    if (pathToRedirect !== req.url) {
      res.redirect(pathToRedirect);
      return;
    }
    next();
  },
  (req, res, next) => {
    // NOTE: to map old links to new ones.
    // NOTE: remove trailing slash because in mapper doesn't have it
    const pathWithoutTrailingSlash = req.path.replace(/\/$/, '');
    const redirectRoute = redirectRoutes[req.path] || redirectRoutes[pathWithoutTrailingSlash];
    logger.debug(`[route=*] time=${new Date()}`);
    logger.debug(`[route=*] path=${req.path}`);
    logger.debug(`[route=*] pathWithoutTrailingSlash=${pathWithoutTrailingSlash}`);
    logger.debug(`[route=*] redirectRoute=${redirectRoute}`);
    if (redirectRoute) {
      logger.debug(`[route=*] redirect to ${redirectRoute}`);
      res.redirect(redirectRoute);
      return;
    }
    next();
  },
  (req, res) => {
    serverRender(req, res, { stats, i18n, webpackAssets });
  },
);

app.set('port', process.env.PORT || port);
preloadAll()
  .then(() => {
    app.listen(app.get('port'), err => {
      if (err) {
        console.error(err);
      } else {
        console.info('==> Client listening on port %s', port);
      }
    });
  })
  .catch(e => {
    logger.error('[preloadAll]', e);
  });
