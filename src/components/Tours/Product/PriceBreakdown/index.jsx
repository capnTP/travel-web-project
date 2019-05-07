import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PriceList from '../../../Checkout/PriceList';

import style from './style.less';

const USER_DATE = 'Do MMMM YYYY';

class PriceBreakdown extends Component {
  constructor(props) {
    super(props);
    this.total = '';
    this.state = {
      total: 0,
    };
  }

  filterBookingInfo = info => {
    const data = Object.keys(info)
      .filter(item => item !== 'date' && item !== 'slug')
      .map(k => Object.assign({}, { [k]: info[k] }))
      .reduce((res, o) => Object.assign(res, o), {});
    return data;
  };

  render() {
    const {
      clickBreakdown,
      onCheckout,
      bookingInfo,
      pricing,
      currency,
      t,
      travellerRequirement,
      tourType,
    } = this.props;
    const paxInfo = this.filterBookingInfo(this.props.bookingInfo) || {};

    return (
      <div className={style.breakdown}>
        <div className={style.header}>
          <span>{t('price breakdown')}</span>
          <button onClick={() => clickBreakdown('')} type="button">
            <span aria-hidden className="icon icon-close" role="button" />
          </button>
        </div>
        <div className={style.date}>
          <span>{t('tour date')}:</span>
          <span>{moment(bookingInfo.date).format(USER_DATE)}</span>
        </div>
        <div className={style.content}>
          <PriceList
            currencyCode={currency.code}
            disable
            exchangePrice={pricing}
            paxCount={paxInfo}
            t={t}
            tourType={tourType}
            travellerRequirement={travellerRequirement}
          >
            {total => {
              if (total !== this.state.total) {
                this.setState({
                  total: total || 0,
                });
              }
            }}
          </PriceList>
        </div>
        <div className={style.total}>
          <span>{t('total price')} </span>
          <div>
            <span>{currency.code}</span>
            <span>{this.state.total}</span>
          </div>
        </div>
        <div className={style.checkout}>
          <button onClick={onCheckout} type="button">
            {t('proceed to checkout')}
          </button>
        </div>
      </div>
    );
  }
}

PriceBreakdown.propTypes = {
  clickBreakdown: PropTypes.func,
  onCheckout: PropTypes.func,
  bookingInfo: PropTypes.object,
  pricing: PropTypes.object,
  currency: PropTypes.object,
  t: PropTypes.func,
  travellerRequirement: PropTypes.object,
  tourType: PropTypes.string,
};

PriceBreakdown.defaultProps = {
  clickBreakdown: () => {},
  onCheckout: () => {},
  bookingInfo: {},
  pricing: {},
  currency: {},
  t(s) {
    return s;
  },
  travellerRequirement: {},
  tourType: '',
};

export default PriceBreakdown;
