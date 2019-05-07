import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';
import { graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import NewsLetter from '../NewsLetter';
import cities from '../../queries/cities/cities.gql';
import CONST from '../../constants';

import style from './style.less';

const { IMIGIX_URL } = CONST;

const PAYMENT_ICONS = [
  {
    name: 'visa',
    url: `/paymenticons/visa.png`,
  },
  {
    name: 'mastercard',
    url: `/paymenticons/mastercard.png`,
  },
  {
    name: 'maestro',
    url: `/paymenticons/maestro.png`,
  },
  {
    name: 'cirrus',
    url: `/paymenticons/cirrus.png`,
  },
  {
    name: 'paypal',
    url: `/paymenticons/paypal.png`,
  },
  {
    name: 'americanexpress',
    url: `/paymenticons/amex.png`,
  },
  {
    name: 'jcb',
    url: `/paymenticons/jcb.png`,
  },
  {
    name: 'unionpay',
    url: `/paymenticons/unionpay.png`,
  },
  {
    name: 'alipay',
    url: `/paymenticons/alipay.png`,
  },
];

const TOP_CITIES = [1, 2, 5, 6, 7, 8, 11, 14, 15, 19];

class Footer extends Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { mounted } = this.state;
    const {
      data: { cities: city = [] },
    } = this.props;

    const cityList = city.filter(item => {
      if (TOP_CITIES.includes(parseInt(item.id, 10))) {
        return item;
      }
      return null;
    });

    return (
      <footer className={style.footer}>
        <I18n ns="common">
          {(t, { i18n }) => (
            <React.Fragment>
              <NewsLetter />
              <div className={style.footer_container}>
                <section>
                  <div className={style.left}>
                    <span className={style.title}>{i18n.t('topCities')}</span>
                    <div className={style.top_cities}>
                      <ul>
                        {cityList.map(item => (
                          <li key={item.id}>
                            <Link target="_self" to={`/city/${item.slug}/`}>
                              {`${item.name}, ${item.country}`}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={style.right}>
                    <span className={style.title}>TheAsia.com</span>
                    <div className={style.top_cities}>
                      <ul>
                        <li>
                          <Link target="_self" to="/about-us/">
                            {i18n.t('about us')}
                          </Link>
                        </li>
                        <li>
                          <Link target="_self" to="/promotions/">
                            {i18n.t('promotions')}
                          </Link>
                        </li>
                        <li>
                          <Link target="_self" to="/discover/">
                            {i18n.t('discover')}
                          </Link>
                        </li>
                        <li>
                          <a
                            href="https://blog.theasia.com"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {i18n.t('lifestyle blog')}
                          </a>
                        </li>
                        <li>
                          <Link target="_self" to="/contact-us/">
                            {i18n.t('contact us')}
                          </Link>
                        </li>
                        <li>
                          <Link target="_self" to="/cancellation-policy/">
                            {i18n.t('policies')}
                          </Link>
                        </li>
                        <li>
                          <Link target="_self" to="/terms/">
                            {i18n.t('terms')}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              <div className={style.bottom}>
                <section className={style.footer_bottom}>
                  <div className={style.left}>
                    <span>Lotus Travel Pte, Ltd. (TheAsia.com) </span>
                    <span>
                      사업자 등록번호 : 212-86-14168, 상호명 : 더아시아코리아 주식회사(TheAsia Korea
                      Co., Ltd.),
                    </span>
                    <span>주소 : 서울특별시 종로구 새문안로 92, 1104호, 대표자명 : 김택,</span>
                    <span>통신판매업신고증 : 2018-서울종로-0796, Copyright 2016 - 2018. </span>
                  </div>
                  <div className={style.right}>
                    <span>{i18n.t('supported')}</span>
                    <div className={style.payment_option}>
                      <ul>
                        {PAYMENT_ICONS.map(item => (
                          <li key={item.name}>
                            <img
                              alt={item.name}
                              decoding="async"
                              src={
                                mounted
                                  ? `${IMIGIX_URL}${
                                      item.url
                                    }?w=45&h=27&auto=compress&lossless=1&q=10&cs=strip`
                                  : ''
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </React.Fragment>
          )}
        </I18n>
      </footer>
    );
  }
}

Footer.propTypes = {
  data: PropTypes.object,
};

Footer.defaultProps = {
  data: {},
};

const city = graphql(cities, {
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  }),
});

const HOCs = [city, withApollo];

export default HOCs.reduce((a, b) => b(a), Footer);
