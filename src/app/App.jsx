import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import Footer from '../components/Footer';
import Loader from '../components/Loader';

import userContext from './context';
import Routes from './routes';
import { Signing } from './loadables';

import './style.less';

const ForgetPassword = Loadable({
  loader: () => import('../containers/ForgetPassword'),
  loading: Loader,
});

const Header = Loadable({
  loader: () => import('../components/Header'),
  loading: () => (
    <div
      style={{
        minHeight: 80,
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px 0px',
        marginBottom: 1,
      }}
    />
  ),
});

const PopupRoutes = {
  forgetpassword: ForgetPassword,
  signing: Signing,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const { request, i18n } = props;
    this.state = {
      ...userContext(request),
      data: {},
    };
    if (i18n.language !== this.state.locale) {
      i18n.changeLanguage(this.state.locale || 'en');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { request, i18n } = nextProps;
    const {
      locale: newLocale,
      currency: { code: newCurrency } = {},
      user: { id: newUser } = {},
    } = userContext(request);
    const {
      locale: lastLocale,
      currency: { code: lastCurrency } = {},
      user: { id: lastUser } = {},
    } = prevState;
    if (lastLocale !== newLocale || lastCurrency !== newCurrency || lastUser !== newUser) {
      i18n.changeLanguage(newLocale);
      return Object.assign({}, prevState, userContext(request));
    }
    return null;
  }

  setHomeContext = data => {
    const { data: oldData } = this.state;
    this.setState({
      data: {
        ...oldData,
        ...data,
      },
    });
  };

  render() {
    const { location = {}, i18n, request } = this.props;
    const context = Object.assign({}, this.state, { setContext: this.setHomeContext });
    const { locale = 'en', currency: { code } = {}, user: { id: userId = '' } = {} } = userContext(
      request,
    );
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }

    let popupName = '';
    let Popup = () => null;
    if (location.search) {
      const parsed = queryString.parse(location.search);
      popupName = parsed.popup;
    }
    if (popupName) {
      Popup = PopupRoutes[popupName];
    }
    const uniqueRenderKey = `${locale}-${code}-${userId}`;

    let fontLink = '';
    if (locale === 'ko') {
      fontLink = 'https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700';
    } else if (locale === 'th') {
      fontLink = 'https://fonts.googleapis.com/css?family=Prompt:300,700';
    } else {
      fontLink = 'https://fonts.googleapis.com/css?family=Raleway:200,700';
    }

    const components = [
      <Helmet>
        <html lang={locale} />
        <link href={fontLink} rel="stylesheet" type="text/css" />
      </Helmet>,
      <Header key={`${'main-header'}-${uniqueRenderKey}`} context={context} />,
      <Routes key={`${'main-content'}-${uniqueRenderKey}`} context={context} />,
    ];

    /** No footer for these routes */
    const noFooterRoutes = ['/account', '/page-not-found'];
    if (noFooterRoutes.every(r => location.pathname.includes(r) === false)) {
      components.push(<Footer key={`${'main-footer'}-${uniqueRenderKey}`} context={context} />);
    }

    components.push(
      <main key={`${'main-popup'}-${uniqueRenderKey}`}>
        <Popup context={context} />
      </main>,
    );

    return components;
  }
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  request: PropTypes.object,
  location: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.object,
  }),
};

App.defaultProps = {
  request: {},
  location: {},
};

export default withRouter(App);
