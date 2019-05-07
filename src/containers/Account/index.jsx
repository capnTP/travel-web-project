import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

import style from './style.less';
import AccountBookings from './AccountBookings';
import AccountProfile from './AccountProfile';
import AccountReviews from './AccountReviews';

const MENUS = [
  {
    key: 'My Bookings',
    displayText: 'My Bookings',
    to: 'bookings',
    icon: 'icon-suitcase-outline',
  },
  {
    key: 'My Reviews',
    displayText: 'My Reviews',
    to: 'reviews',
    icon: 'icon-star',
  },
  {
    key: 'My Profile',
    displayText: 'My Profile',
    to: 'profile',
    icon: 'icon-user-circle',
  },
];

class Account extends React.Component {
  componentDidMount() {
    document.body.classList.remove('softLanding');

    const { info, location, history } = this.props;

    if (!info || !info.user || !info.user.id) {
      const parsed = queryString.parse(location.search);
      if (parsed.popup === 'signing') {
        return;
      }
      history.push(`${location.pathname}?popup=signing`);
    }
  }

  render() {
    const { info, match } = this.props;
    const authorized = info && info.user && info.user.id;

    if (!authorized) {
      return null;
    }

    return (
      <div className={style.Account}>
        <Helmet>
          <title>The Asia</title>
        </Helmet>

        <nav>
          <ul>
            {MENUS.map(m => (
              <li key={m.key}>
                <NavLink activeClassName={style.active} to={`${match.url}/${m.to}`}>
                  <i className={classnames(m.icon, style.menu_icon)} />
                  <span className={style.display_text}>{m.displayText}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={style.content}>
          <Switch>
            <Route
              key="/account/bookings"
              exact
              path="*/account/bookings"
              render={props => <AccountBookings info={info} {...props} />}
            />

            <Route
              key="/account/reviews"
              exact
              path="*/account/reviews"
              render={props => <AccountReviews info={info} {...props} />}
            />

            <Route
              key="/account/profile"
              exact
              path="*/account/profile"
              render={props => <AccountProfile info={info} {...props} />}
            />

            {/* eslint-disable
            // NOTE:
            // use redirect instead of index route like '/'
            // because we want NavLink to activate activeClassName
            eslint-enable */}
            <Redirect from="*/account" to={`${match.url}/bookings`} />
          </Switch>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  info: PropTypes.object,
  bookingsQuery: PropTypes.shape({
    bookings: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

Account.defaultProps = {
  info: null,
  bookingsQuery: {
    bookings: [],
    loading: false,
  },
  location: {
    pathname: '',
  },
  history: {
    push() {},
  },
  match: {
    url: '',
  },
};

export default Account;
