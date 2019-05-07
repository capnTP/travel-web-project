import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { getBundles } from 'react-loadable/webpack';
import Helmet from 'react-helmet';

import savedLocale from '../../src/helpers/locale';

import App from './app';
import apolloClient from './apollo.server';
import combineHtml from './combineHtml';

const logger = require('../logger');

const getRoute = url => {
  const localeRegex = new RegExp(/^(\/en|\/ko|\/th|\/zh)\b/);
  let routeName = '';
  try {
    const routeChunks = url.split(localeRegex);
    if (routeChunks.length > 1) {
      routeName = routeChunks[2].split('/')[1];
    } else {
      routeName = routeChunks[0].split('/')[1];
    }
  } catch (e) {
    console.log('Cannot find route name.');
  }

  console.log('routeName ===>', routeName);

  /** city page use same component as discover page */
  if (routeName === 'city') {
    return 'discover';
  }

  return routeName;
};

const getUniqueFiles = (data, type) =>
  data
    .filter(bundle => bundle.file.endsWith(`.${type}`))
    .filter((d, index, self) => self.findIndex(t => t.file === d.file) === index);

export default (req, res, { stats, i18n, webpackAssets }) => {
  const client = apolloClient(req);
  const context = {};
  const modules = [];
  const addModules = moduleName => {
    if (modules.indexOf(moduleName) === -1) {
      modules.push(moduleName);
    }
    return modules;
  };
  const locale = savedLocale.get(req);
  // const localeUrl = locale !== 'en' ? `/${locale}` : '';
  const routeName = getRoute(req.url);
  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale);

  const Document = App(req, context, client, i18nServer, addModules);
  getDataFromTree(Document)
    .then(() => {
      const content = ReactDOM.renderToString(Document);
      const bundles = getBundles(stats, modules);
      const styles = getUniqueFiles(bundles, 'css');
      const scripts = getUniqueFiles(bundles, 'js');
      const apolloState = JSON.stringify(client.extract()).replace(/</g, '\\\u003c');
      i18nServer.loadNamespaces([routeName]);

      const i18nStore = {};
      i18nServer.languages.forEach(l => {
        i18nStore[l] = i18nServer.services.resourceStore.data[l];
      });

      const i18nClient = JSON.stringify({ locale, i18nStore }).replace(/</g, '\\\u003c');
      const helmet = Helmet.renderStatic();
      styles.unshift({
        file: `${webpackAssets['main.css']}`,
      });
      const replaceInfo = [
        {
          string: '<link id="__DYNAMIC_STYLES__">',
          with: styles,
        },
        {
          string: '<script id="__DYNAMIC_SCRIPTS__"></script>',
          with: scripts,
        },
        {
          string: '<script id="__MANIFEST__"></script>',
          with: `<script src=/${webpackAssets['manifest.js']}></script>`,
        },
        {
          string: '<script id="__MAIN__"></script>',
          with: `<script src=/${webpackAssets['main.js']}></script>`,
        },
        {
          string: '<script id="__APOLLO_STATE__"></script>',
          with: `<script>window.__APOLLO_STATE__=${apolloState}</script>`,
        },
        {
          string: '<script id="__i18n_STATE__"></script>',
          with: `<script>window.__i18n=${i18nClient}</script>`,
        },
        {
          string: '<div id="root"></div>',
          with: `<div id="root">${content}</div>`,
        },
        {
          string: '<html lang="en">',
          with: `<html ${helmet.htmlAttributes.toString()}>`,
        },
        {
          string: '<script id="__HELMET_TAGS__"></script>',
          with: `${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
            ${helmet.noscript.toString()}`,
        },
      ];

      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        return res.end();
      }
      return res.send(combineHtml(replaceInfo));
    })
    .catch(error => {
      logger.error(`An error at \`getDataFromTree\` path=\`${req.path}\``, error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        try {
          const payload = JSON.parse(error.graphQLErrors[0].message);
          logger.debug('[getDataFromTree] error payload', payload);
          if (payload.code === 404) {
            logger.debug('[getDataFromTree] redirecting to /page-not-found ...');
            res.redirect('/page-not-found');
          }
        } catch (e) {
          logger.debug("[getDataFromTree] Couldn't get payload from error.message", error.message);
        }
      }
    });
};
