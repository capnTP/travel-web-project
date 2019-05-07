import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import TourName from '../../Tours/Product/TourName';
import PriceList from '../PriceList';

import style from './style.less';

const USER_DATE = 'Do MMMM YYYY';

class BookingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.0,
    };
  }

  render() {
    const {
      hide,
      info: { currency: { code: userCurrency = '' } = {} } = {},
      subProduct: { title = '', finalPrice: { exchange = {} } = {} } = {},
      userInput: {
        date = moment(),
        adults: adultCount = 0,
        children: childrenCount = 0,
        infants: infantCount = 0,
      } = {},
      productTitle = '',
      tourType,
      onUpdatePax,
      getTotal = () => {},
      oldExchangeRate,
      exchangeRate,
      exchangeTotal,
      isUserCurrency,
      exchangeCurrency,
      isDisable,
      t,
    } = this.props;

    return (
      !hide && (
        <div className={style.price_card}>
          <ReactTooltip place="top" />
          <div className={`${style.bordered_bottom} ${style.tour}`}>
            <TourName noPadding tourName={productTitle} />
          </div>
          {productTitle !== title && (
            <div className={`${style.bordered_bottom} ${style.sub_tour}`}>
              <TourName noPadding tourName={title} />
              <div className={style.info}>
                {/* <Star
              rating={4}
            />
            <span className="txt_underline">Reviews(8)</span> */}
              </div>
            </div>
          )}
          <div className={`${style.bordered_bottom} ${style.tour_date}`}>
            <span>
              {t('tour date')}:
              <span
                className="icon icon-info-circle"
                data-place="top"
                data-tip={t('if you wish')}
                data-type="success"
              />
            </span>
            <span className={`txt_bold ${style.date}`}>{moment(date).format(USER_DATE)}</span>
          </div>
          <div className={style.bordered_bottom}>
            <PriceList
              currencyCode={userCurrency}
              disable={isDisable}
              exchangePrice={exchange}
              onUpdatePax={onUpdatePax}
              paxCount={{
                adults: adultCount,
                children: childrenCount,
                infants: infantCount,
              }}
              t={t}
              tourType={tourType}
            >
              {total => {
                if (total !== this.state.total) {
                  getTotal(total);
                  this.setState({
                    total,
                  });
                }
              }}
            </PriceList>
          </div>
          <div className={`${style.bordered_bottom} ${style.total_price}`}>
            <span className={style.total}>{t('total price')}</span>
            <div>
              <span className={style.currency}>{userCurrency}</span>
              <span className={style.price}>{this.state.total}</span>
            </div>
          </div>
          {!isUserCurrency ? (
            <div className={style.info_payment}>
              {t('you are paying in different currency', {
                code: exchangeCurrency,
                total: exchangeTotal,
                exOld: oldExchangeRate,
                exNew: exchangeRate,
              })}
              {/* You are paying in {exchangeCurrency}, your total is {exchangeTotal} {exchangeCurrency}. */}
            </div>
          ) : (
            ''
          )}
        </div>
      )
    );
  }
}

BookingCard.propTypes = {
  hide: PropTypes.bool,
  subProduct: PropTypes.object,
  onUpdatePax: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  exchangeTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isUserCurrency: PropTypes.bool,
  oldExchangeRate: PropTypes.string,
  exchangeRate: PropTypes.string,
  exchangeCurrency: PropTypes.string,
  getTotal: PropTypes.func,
  isDisable: PropTypes.bool,
  t: PropTypes.func,
  productTitle: PropTypes.string,
  tourType: PropTypes.string,
  info: PropTypes.shape({
    currency: PropTypes.shape({
      code: PropTypes.string,
    }),
  }),
  userInput: PropTypes.shape({
    date: PropTypes.object,
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
  }),
};

BookingCard.defaultProps = {
  hide: false,
  subProduct: {},
  onUpdatePax: '',
  getTotal() {},
  exchangeTotal: '',
  oldExchangeRate: '',
  exchangeRate: '',
  exchangeCurrency: '',
  isUserCurrency: true,
  t(s) {
    return s;
  },
  info: {
    currency: {
      code: '',
    },
  },
  isDisable: false,
  productTitle: '',
  tourType: '',
  userInput: {
    date: moment(),
    adults: 0,
    children: 0,
    infants: 0,
  },
};

export default BookingCard;
