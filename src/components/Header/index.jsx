import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { graphql } from 'react-apollo';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';

import SearchBar from '../SearchBar';
import logo from '../../assets/images/logo/theasialogo.png';
import userCurrency from '../../helpers/currency';
import userHelper from '../../helpers/user';
import compose from '../../helpers/compose';
import safeGet from '../../helpers/safeGet';

import style from './style.less';
import helper from './helper';

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

const getAvailableLanguages = (languages, tourLanguages) => {
  if (tourLanguages.length === 0) {
    return languages;
  }

  return languages.reduce((acc, value) => {
    if (tourLanguages.indexOf(value.code) > -1) {
      acc.push(value);
    }

    return acc;
  }, []);
};

class Header extends Component {
  state = {
    type: 'currency',
    showDialog: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onWindowResize);
    this.setState({
      showDialog: false,
    });
  }

  onWindowResize = () => {
    this.searchElementTop = 0;
  };

  onScroll = () => {
    const {
      context: { data: { searchElement = {} } = {} },
    } = this.props;
    const { scrollY: scrollTop = 0, innerWidth = 1200 } = window;

    if (innerWidth > 767) {
      if (searchElement && searchElement.getBoundingClientRect && this.header) {
        if (!this.searchElementTop) {
          const { top } = searchElement.getBoundingClientRect();
          this.searchElementTop = top < 0 ? top + scrollTop : top;
        }

        if (scrollTop > this.searchElementTop) {
          searchElement.classList.add('sticky_top_search');
          this.header.classList.add('top_search_active');
        } else {
          searchElement.classList.remove('sticky_top_search');
          this.header.classList.remove('top_search_active');
        }

        const color = Math.round(convertRange(scrollTop, [0, this.searchElementTop], [54, 225]));
        const opacity = convertRange(color, [54, 225], [0, 1]);
        if (color >= 54) {
          const green = color === 54 ? 52 : color;
          const rgb = [color, green, color];
          const rgba = [color, green, color, opacity];
          this.header.style.backgroundImage = `linear-gradient(to bottom, rgb(${rgb.join(
            ',',
          )}), rgba(${rgba.join(',')}))`;
        }
      }
    }
  };

  onSelectCurrency = (currency = {}) => {
    userCurrency.set({
      id: currency.id,
      code: currency.code,
    });

    window.location.reload();
  };

  openDialog = type => {
    this.setState({
      type,
      showDialog: true,
    });
  };

  hideDialog = () => {
    this.setState({
      showDialog: false,
    });
  };

  logout = () => {
    userHelper.clear();
    window.location.reload();
  };

  componentWillUmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    const {
      location: { pathname = '/' },
      context: {
        currency: { code },
        locale,
        user = {},
      },
      t = () => {},
      data,
    } = this.props;

    const currencyList = data.currencies || [];
    const languages = data.languages || [];
    const tourLanguages = data.tourLanguages || [];
    const availableLanguages = getAvailableLanguages(languages, tourLanguages);
    const isCheckoutPage = /\/checkout\//.test(pathname);

    const currencySelector = (
      <ul>
        {currencyList.map(item => (
          <li
            key={item.id}
            className={item.code === code ? style.active : ''}
            onClick={() => this.onSelectCurrency(item)}
            role="presentation"
          >
            <span className={classnames('currency', style.currency_name)}>{item.displayName}</span>
            <span className={classnames('currency', style.currency_code)}>{item.code}</span>
          </li>
        ))}
      </ul>
    );

    const languageSelector = (
      <ul className={style.languages}>
        {availableLanguages.map(item => (
          <li
            key={item.id}
            className={item.code === locale ? style.active : ''}
            onClick={() => {
              const cookies = new Cookies();
              cookies.set('user-locale', item.code, { path: '/', maxAge: 172800 });
              this.hideDialog();
            }}
            role="presentation"
          >
            <a
              className={classnames('language', style.language_name)}
              href={helper.getUrlWithLocale(pathname, item, availableLanguages)}
              target="_self"
            >
              {item.displayName}
            </a>
          </li>
        ))}
      </ul>
    );

    return (
      <header
        ref={e => {
          if (e) {
            this.header = e;
          }
        }}
        className={classnames(style.header_container, {
          [style.header_transparent]:
            pathname === '' ||
            pathname === '/' ||
            pathname === '/ko' ||
            pathname === '/zh' ||
            pathname === '/th',
        })}
      >
        <div className={style.left}>
          <Link to="/">
            <img alt="theasialogo" className={style.logo_mobile} src={logo} />
            <div className={style.logo_desktop}>
              <svg height="40px" version="1.1" viewBox="0 0 204 40" width="204px">
                <path
                  className="header_logo_main"
                  d="M35.5566,9.1758 C36.0966,9.0838 36.6326,9.0298 37.1526,9.0298 C39.1246,9.0298 40.3286,9.4678 40.7306,10.3398 C41.4326,11.8558 40.1966,15.0038 38.5346,17.9078 C38.2066,14.7138 37.1546,11.7438 35.5566,9.1758 Z M26.1186,13.9698 C28.2606,12.3638 30.4146,11.0198 32.4686,10.1358 C34.4126,12.9138 35.5686,16.3178 35.5686,19.9998 C35.5686,23.5898 34.4666,26.9258 32.6086,29.6578 L26.1186,13.9698 Z M23.5946,15.9778 L30.3246,32.2218 C30.3326,32.2558 30.3566,32.2838 30.3706,32.3178 C27.4726,35.1058 23.5946,36.8178 19.3226,36.8178 C15.0226,36.8178 11.1126,35.0758 8.2006,32.2438 C9.5846,30.4858 16.2606,22.1558 23.5946,15.9778 Z M5.9266,29.5058 C4.1326,26.7958 3.0806,23.5238 3.0806,19.9998 C3.0806,11.6418 8.9986,4.6918 16.7246,3.3998 L5.9266,29.5058 Z M24.8866,11.0078 L21.7266,3.3658 C25.0306,3.8718 28.0106,5.4158 30.3486,7.6678 C28.5466,8.5418 26.7146,9.6818 24.8866,11.0078 Z M11.9786,22.9578 L19.2346,5.4158 L22.3586,12.9558 C18.6486,15.9718 15.0626,19.5678 11.9786,22.9578 Z M38.2986,23.8518 C39.0786,22.8558 45.8206,13.9818 43.5006,8.9598 C42.5526,6.8958 40.4166,5.8458 37.1526,5.8458 C35.9786,5.8458 34.7546,6.0518 33.4966,6.4258 C29.9686,2.4818 24.9186,-0.0002 19.3226,-0.0002 C19.2726,-0.0002 19.2286,0.0018 19.1806,0.0018 C19.1726,0.0018 19.1666,-0.0002 19.1506,-0.0002 C19.1106,-0.0002 19.0866,0.0078 19.0566,0.0078 C8.5206,0.1558 0.0006,9.0658 0.0006,19.9998 C0.0006,31.0278 8.6726,39.9998 19.3226,39.9998 C28.6926,39.9998 36.5206,33.0598 38.2766,23.8778 C38.2766,23.8678 38.2906,23.8618 38.2986,23.8518 Z"
                />
                <g className="header_logo_text">
                  <polygon points="56.5664 13.8936 63.1504 13.8936 63.1504 32.8536 67.2784 32.8536 67.2784 13.8936 73.8724 13.8936 73.8724 10.4056 56.5664 10.4056" />
                  <polygon points="91.9708 19.919 83.0948 19.919 83.0948 10.407 78.9668 10.407 78.9668 32.855 83.0948 32.855 83.0948 23.411 91.9708 23.411 91.9708 32.847 96.0968 32.991 96.0968 10.529 91.9708 10.397" />
                  <polygon points="107.0664 29.1894 107.0584 23.4094 116.9264 23.4094 116.9264 19.9194 107.0584 19.9194 107.0584 14.0774 118.6264 14.0734 118.6184 10.4014 102.9404 10.5294 102.9404 32.9794 118.6284 32.8554 118.6264 29.1854" />
                  <path d="M161.9296,19.8126 C160.8996,19.6966 159.9776,19.5766 159.2756,19.4666 C158.1596,19.2786 157.3476,18.9406 156.8576,18.4566 C156.3816,17.9986 156.1516,17.5066 156.1516,16.9506 C156.1676,15.9846 156.5156,15.2826 157.2196,14.7986 C157.9136,14.3146 158.7756,14.0766 159.8316,14.0766 C161.9056,14.1126 163.8396,14.6706 165.5856,15.7286 L165.7916,15.8526 L168.1056,12.6866 L167.8636,12.5246 C165.6416,11.0546 163.0156,10.2826 160.0276,10.2266 C157.5296,10.2486 155.5676,10.8646 154.1836,12.0626 C152.7516,13.2806 152.0216,14.9146 152.0216,16.9126 C152.0216,18.5626 152.6036,19.9966 153.7456,21.1586 C154.8336,22.2786 156.4516,23.0086 158.5556,23.3266 L161.6856,23.7326 C163.6416,24.0466 164.5836,24.9166 164.5596,26.3986 C164.5156,28.2346 163.0776,29.1486 160.1336,29.1866 C157.5996,29.1646 155.3756,28.4526 153.5416,27.0586 L153.3556,26.9206 L150.6376,29.8126 L150.8776,29.9946 C153.4356,32.0206 156.5336,33.0446 160.0916,33.0446 L160.0956,33.0446 C165.6676,32.9786 168.5556,30.7466 168.6776,26.3966 C168.6776,24.7726 168.1236,23.3286 167.0296,22.1146 C165.9196,20.8746 164.2116,20.0986 161.9296,19.8126" />
                  <polygon points="174.042 32.854 178.166 32.854 178.166 10.406 174.042 10.406" />
                  <path d="M140.4844,21.7032 C138.3944,21.8812 136.7044,22.2552 135.4384,22.8272 L138.2224,16.1332 L140.4844,21.7032 Z M136.7264,10.5412 L127.4584,32.8952 L131.3404,32.8952 L132.4804,30.3672 C132.8684,29.4732 133.2124,28.6972 133.6384,28.1632 C135.1344,26.3072 137.6864,25.3892 141.8904,25.1912 L145.0304,32.8952 L148.7904,32.8952 L139.5384,10.5132 L136.7264,10.5412 Z" />
                  <path d="M195.7032,21.7032 C193.6012,21.8812 191.9092,22.2552 190.6472,22.8272 L193.4252,16.1332 L195.7032,21.7032 Z M194.7472,10.5132 L191.9392,10.5412 L182.6572,32.8952 L186.5452,32.8952 L187.6652,30.4112 C188.0452,29.5432 188.4012,28.7152 188.8492,28.1632 C190.3412,26.3072 192.8992,25.3892 197.1012,25.1912 L200.2432,32.8952 L203.9992,32.8952 L194.7472,10.5132 Z" />
                </g>
              </svg>
            </div>
          </Link>
        </div>

        <div
          className={classnames(style.middle, {
            [style.hidden]: isCheckoutPage,
          })}
        >
          <SearchBar />
        </div>

        <div
          className={classnames(style.right, {
            [style.hidden]: isCheckoutPage,
          })}
        >
          {this.state.showDialog && (
            <div className={style.currency_div}>
              <div className={style.currency_header}>
                <button onClick={this.hideDialog} type="button">
                  <span className="icon icon-arrow-left-thin" />
                  {t(this.state.type)}
                </button>
              </div>
              {this.state.type === 'currency' ? currencySelector : languageSelector}
            </div>
          )}

          <ul>
            <li className={style.link}>
              <Link className="btn_nav" target="_self" to="/promotions/">
                {t('promotions')}
              </Link>
            </li>
            <li className={style.currency_container}>
              <span>
                {code} <span className="icon icon-arrow-down" />
              </span>
              <div className={style.currency}>{currencySelector}</div>
            </li>
            <li className={style.language_container}>
              <span>
                {locale.toUpperCase() || 'EN'} <span className="icon icon-arrow-down" />
              </span>
              <div className={style.language}>{languageSelector}</div>
            </li>
            <li className={style.link}>
              <Link className="btn_nav" to={user ? '/account' : '?popup=signing'}>
                {user ? (
                  <span className={`icon icon-user-circle ${style.icon_profile}`} />
                ) : (
                  t('login')
                )}
              </Link>
            </li>
            <li className={style.setting_container}>
              <span className="icon icon-menu" />
              <div className={style.setting}>
                <ul>
                  <li>
                    <Link target="_self" to={user ? '/account' : '?popup=signing'}>
                      {user ? 'My Account' : t('create account')}
                    </Link>
                  </li>

                  <li onClick={() => this.openDialog('language')} role="presentation">
                    <span>{t('language')}</span>
                  </li>

                  <li onClick={() => this.openDialog('currency')} role="presentation">
                    <span>{t('currency')}</span>
                  </li>

                  <li>
                    <Link className="btn_nav" target="_self" to="/promotions/">
                      {t('promotions')}
                    </Link>
                  </li>

                  <li>
                    <Link className="btn_nav" target="_self" to="/cities/">
                      {t('cities')}
                    </Link>
                  </li>

                  <li>
                    <Link className="btn_nav" target="_self" to="/discover/">
                      {t('discover')}
                    </Link>
                  </li>

                  <li>
                    <a
                      className="btn_nav"
                      href="https://blog.theasia.com"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {t('lifestyle blog')}
                    </a>
                  </li>

                  <li>
                    <Link className="btn_nav" target="_self" to="/about-us/">
                      {t('about us')}
                    </Link>
                  </li>

                  <li>
                    <Link className="btn_nav" target="_self" to="/contact-us/">
                      {t('contact us')}
                    </Link>
                  </li>

                  {user && (
                    <li onClick={this.logout} role="presentation">
                      <span>{t('logout')}</span>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
  context: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  t: PropTypes.func,
  data: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.object),
    languages: PropTypes.arrayOf(PropTypes.object),
    tourLanguages: PropTypes.arrayOf(PropTypes.string),
  }),
};

Header.defaultProps = {
  location: {},
  context: {},
  history: {
    push() {},
  },
  t: () => {},
  data: {
    currencies: [],
    languages: [],
    tourLanguages: [],
  },
};

export default compose(
  withRouter,
  graphql(
    gql`
      query rootQuery($slug: String) {
        currencies {
          id

          code
          displayName
        }

        languages {
          id

          abbr
          code
          displayName
          localeAvailable
          name
        }

        tourLanguages(slug: $slug)
      }
    `,
    {
      options: props => {
        const match = matchPath(props.history.location.pathname, {
          path: '/discover/:slug',
          exact: true,
          strict: false,
        });
        const slug = safeGet(() => match.params.slug) || '';

        return {
          notifyOnNetworkStatusChange: true,
          fetchPolicy: 'cache-first',
          variables: {
            slug,
          },
        };
      },
    },
  ),
  translate('common'),
  Header,
);
