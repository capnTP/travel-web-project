import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../../helpers/currencyFormatter';

import style from './style.less';

const Pricing = ({ currencyCode, isHidden, t, tourType, basePrice }) => (
  <div
    className={`${style.pricing_container}
    ${!isHidden ? style.hide : ''}`}
  >
    <ul>
      {basePrice.map(item => (
        <li>
          <ul>
            <li>
              <span className={style.passenger}>
                {parseInt(item.pax, 10) > 1 ? `${item.pax} or more` : item.pax}{' '}
                {tourType === 'NORMAL' ? t('passenger') : t(tourType)}
              </span>
            </li>

            <li>
              {item.walkIn.adults !== item.exchange.adults ||
              item.walkIn.children !== item.exchange.children
                ? t('walk-in')
                : ''}
            </li>
            <li className={style.our_price}>{t('our price')}</li>
          </ul>

          <ul>
            <li>{tourType === 'NORMAL' ? t('adults') : t(tourType)}</li>
            <li>
              {item.walkIn.adults !== item.exchange.adults ? (
                <del>{formatCurrency(currencyCode, item.walkIn.adults)}</del>
              ) : (
                ''
              )}
            </li>
            <li className={style.our_price}>
              {formatCurrency(currencyCode, item.exchange.adults)}
            </li>
          </ul>
          {item.walkIn.children !== 0 && item.exchange.children !== 0 && tourType === 'NORMAL' ? (
            <ul>
              <li>{t('children')}</li>
              <li>
                {item.walkIn.children !== item.exchange.children ? (
                  <del>{formatCurrency(currencyCode, item.walkIn.children)}</del>
                ) : (
                  ''
                )}
              </li>
              <li className={style.our_price}>
                {formatCurrency(currencyCode, item.exchange.children)}
              </li>
            </ul>
          ) : null}
          {item.walkIn.infants !== 0 && item.exchange.infants !== 0 && tourType === 'NORMAL' ? (
            <ul>
              <li>{t('infants')}</li>
              <li>
                <del>
                  {item.walkIn.infants === 0
                    ? t('free')
                    : formatCurrency(currencyCode, item.walkIn.infants)}
                </del>
              </li>
              <li className={style.our_price}>
                {item.exchange.infants === 0
                  ? t('free')
                  : formatCurrency(currencyCode, item.exchange.infants)}
              </li>
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  </div>
);

Pricing.propTypes = {
  currencyCode: PropTypes.string,
  isHidden: PropTypes.bool,
  t: PropTypes.func,
  tourType: PropTypes.string,
  basePrice: PropTypes.arrayOf(PropTypes.object),
};

Pricing.defaultProps = {
  currencyCode: '',
  isHidden: true,
  t: () => {},
  tourType: '',
  basePrice: [],
};

export default Pricing;
