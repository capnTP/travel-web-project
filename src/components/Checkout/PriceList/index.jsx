import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// import Button from '../../Forms/Button';
import { formatCurrency } from '../../../helpers/currencyFormatter';

import styles from './style.less';

class PriceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paxCount: props.paxCount,
      edit: {
        status: false,
        key: '',
      },
    };
  }

  onChange = ({ target: { value = '' } = {} }, key) => {
    const { paxCount = {} } = this.state;
    const val = parseInt(value, 10);
    if (!isNaN(val) && val && val !== 0) {
      paxCount[key] = val;
      this.setState({
        paxCount,
      });
    }
  };

  changePax = key => {
    this.setState({
      edit: {
        key,
        status: true,
      },
    });
  };

  updatePax = () => {
    this.setState(
      {
        edit: {
          key: '',
          status: 'false',
        },
      },
      () => {
        const { onUpdatePax } = this.props;
        const { paxCount = {} } = this.state;
        if (typeof onUpdatePax === 'function') {
          onUpdatePax(paxCount);
        }
      },
    );
  };

  render() {
    const {
      state: { edit, paxCount = {} },
      // changePax,
      // updatePax,
    } = this;

    const { children: totalFunc, currencyCode, disable, exchangePrice, t, tourType } = this.props;

    const {
      minimumAdultAge = '',
      minimumChildAge = '',
      minimumChildHeight = '',
    } = this.props.travellerRequirement;

    const userPax = Object.keys(paxCount);
    let billingAmount = 0;

    const adultRequirements = minimumAdultAge
      ? this.props.t('minimum adult age', { number: minimumAdultAge })
      : this.props.t('no specific');
    const minChildAge = minimumChildAge
      ? this.props.t('minimum child age', { number: minimumChildAge })
      : '';
    const minChildHeight = minimumChildHeight
      ? this.props.t('minimum child height', { number: minimumChildHeight })
      : '';
    const childRequirements =
      minimumChildAge || minimumChildHeight
        ? `${minChildAge} ${
            minimumChildAge && minimumChildHeight ? this.props.t('and') : ''
          } ${minChildHeight}`
        : this.props.t('no specific');

    return (
      <div>
        <ReactTooltip place="top" />
        {userPax.map((key, index) => {
          const pax = paxCount[key];
          const price = formatCurrency(currencyCode, exchangePrice[key]);
          const total = pax * price;
          // Calculating billing total
          billingAmount += total;
          if (index === userPax.length - 1) {
            totalFunc(formatCurrency(currencyCode, billingAmount));
          }

          if (!total) {
            return null;
          }
          let req = t('no specific');
          if (key === 'adults') {
            req = adultRequirements;
          } else if (key === 'children') {
            req = childRequirements;
          } else {
            req = t('no specific');
          }

          return (
            <div key={key} className={`${disable ? styles.price_breakdown : styles.item}`}>
              <div className={styles.pax_name}>
                <span className={styles.paxName}>{t(tourType === 'NORMAL' ? key : tourType)}:</span>
                <span
                  className="icon icon-info-circle"
                  data-class={styles.requirement}
                  data-tip={req}
                  data-type="success"
                />
              </div>
              <div className={styles.pax}>
                {edit.key === key && edit.status ? (
                  <input
                    defaultValue={paxCount[key]}
                    max="99"
                    min="1"
                    onChange={event => {
                      this.onChange.call(this, event, key);
                    }}
                    type="number"
                  />
                ) : (
                  <span>
                    x <b>{pax}</b>
                  </span>
                )}
              </div>
              {/* {!disable && (
                <div className={styles.edit}>
                  {edit.key === key && edit.status ? (
                    <Button onClick={() => updatePax(key)} text={t('apply')} type="bordered_asia" />
                  ) : (
                    <Button
                      onClick={() => changePax(key)}
                      text={t('change')}
                      type="bordered_asia"
                    />
                  )}
                </div>
              )} */}
              <div className={styles.sub_total}>
                <span className="font_12">{currencyCode}</span>
                <span className="txt_bold font_18">{formatCurrency(currencyCode, total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

PriceList.propTypes = {
  paxCount: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
  }),
  onUpdatePax: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  travellerRequirement: PropTypes.object,
  t: PropTypes.func,
  tourType: PropTypes.string,
  children: PropTypes.func,
  currencyCode: PropTypes.string,
  disable: PropTypes.bool,
  exchangePrice: PropTypes.object,
};

PriceList.defaultProps = {
  currencyCode: '',
  paxCount: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  exchangePrice: {
    adults: 0,
    children: 0,
    infants: 0,
  },
  children() {},
  disable: false,
  onUpdatePax: '',
  t: () => {},
  travellerRequirement: {},
  tourType: '',
};

export default PriceList;
