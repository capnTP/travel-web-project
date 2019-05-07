import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../helpers/currencyFormatter';

import style from './style.less';

const PriceCard = ({ isDiscounted, isSimilar, startsFrom, currency, t }) => (
  <div className={style.content}>
    <div className={style.price_content}>
      <span>{t('starting from')}</span>
      <span>
        {formatCurrency(currency.code, startsFrom)} <small>{currency.code}</small>
      </span>
      {isDiscounted ? <del>{t('was')} 2200</del> : null}
    </div>
    {isSimilar ? (
      <div className={style.view}>
        <button type="button">View Tour</button>
      </div>
    ) : null}
  </div>
);

PriceCard.propTypes = {
  isDiscounted: PropTypes.bool,
  isSimilar: PropTypes.bool,
  startsFrom: PropTypes.number,
  currency: PropTypes.object,
  t: PropTypes.func,
};

PriceCard.defaultProps = {
  isDiscounted: false,
  isSimilar: false,
  startsFrom: 0,
  currency: {},
  t() {},
};

export default PriceCard;
