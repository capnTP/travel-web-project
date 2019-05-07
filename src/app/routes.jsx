import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  Tours,
  AboutUs,
  Policies,
  Terms,
  Contact,
  Account,
  PageNotFound,
  Discover,
  Checkout,
  Home,
  Cities,
  ResetPasswordPage,
} from './loadables';

const routes = {
  '/': {
    component: Home,
    localeNs: 'home',
    exact: true,
  },
  '/about-us': {
    component: AboutUs,
    localeNs: 'about',
    exact: true,
  },
  '/account': {
    component: Account,
  },
  '/cancellation-policy': {
    component: Policies,
    localeNs: 'checkout',
    exact: true,
  },
  '/checkout/:slug/': {
    component: Checkout,
    localeNs: 'checkout',
    exact: false,
  },
  '/cities': {
    component: Cities,
  },
  '/city/:citySlug': {
    component: Discover,
    exact: true,
  },
  '/city/:citySlug/:page(\\d+)': {
    component: Discover,
    exact: true,
  },
  '/contact-us': {
    component: Contact,
    localeNs: 'contact',
    exact: true,
  },
  '/discover': {
    component: Discover,
    exact: true,
  },
  '/discover/:page(\\d+)': {
    component: Discover,
    exact: true,
  },
  '/discover/:slug': {
    component: Tours,
    localeNs: 'discover',
    exact: true,
  },
  '/home': {
    component: Home,
    localeNs: 'home',
    exact: true,
  },
  '/promotions/:page(\\d+)?': {
    component: Discover,
    exact: true,
  },
  '/reset-password': {
    component: ResetPasswordPage,
    exact: true,
  },
  '/terms': {
    component: Terms,
    localeNs: 'terms',
    exact: true,
  },
};

const Routes = ({ context }) => (
  <main className="content_body">
    <Switch>
      {Object.keys(routes)
        .map(key => (
          <Route
            key={key}
            exact={routes[key].exact}
            path={key}
            render={props => {
              const Component = routes[key].component;
              return <Component {...props} info={context} />;
            }}
          />
        ))
        .concat(
          Object.keys(routes).map(key => (
            <Route
              key={`/:lng(th|ko|zh)${key}`}
              exact={routes[key].exact}
              path={`/:lng(th|ko|zh)${key}`}
              render={props => {
                const Component = routes[key].component;
                return <Component {...props} info={context} />;
              }}
            />
          )),
        )}

      <Route component={PageNotFound} path="/page-not-found" />

      {/* Routes other than above will must go to /404 */}
      <Redirect from="*" to="/page-not-found" />
    </Switch>
  </main>
);

Routes.propTypes = {
  context: PropTypes.object.isRequired,
};

export default Routes;
