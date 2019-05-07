import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import constants from '../../../../constants';
import logger from '../../../../helpers/logger';

import styles from './style.less';

let env = 'sandbox';

if (!constants.SANDBOX) {
  env = 'production';
}

logger.debug(`Paypal payment mode=${env}`);

let paypal = false;

if (typeof window !== 'undefined') {
  paypal = require('paypal-checkout'); // eslint-disable-line global-require
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
    };
  }

  render() {
    const PayPalButton = paypal ? paypal.Button.driver('react', { React, ReactDOM }) : '';
    const style = {
      size: 'large',
      color: 'blue',
      shape: 'rect',
      label: 'checkout',
    };
    const payment = () =>
      // Make a call to the REST api to create the payment
      // eslint-disable-next-line no-undef
      paypal.request
        .post(`${constants.API_URL}/Paypals/createPayment`, {
          booking_id: this.props.bookingId,
          payment_method_id: this.props.paymentType,
        })
        .then(data => {
          console.log('payment =>', data.id);
          return data.id;
        })
        .catch(err => this.props.onError(err));

    const commit = true;
    const onAuthorize = data =>
      // Make a call to the REST api to execute the payment
      // eslint-disable-next-line no-undef
      paypal.request
        // eslint-disable-next-line no-undef
        .post(`${constants.API_URL}/Paypals/executePayment`, {
          paymentID: data.paymentID,
          payerID: data.payerID,
          booking_id: this.props.bookingId,
        })
        .then(res => {
          console.log('onAuthorize => ', res);
          this.props.onSuccess(res);
          // The payment is complete!
          // You can now show a confirmation message to the customer
        })
        .catch(err => {
          console.log('onAuthorize err => ', err);
          this.props.onError(err);
        });

    const onCancel = data => {
      console.log('on cancel', data);
      this.props.onCancel(data);
      // this.props.paymentCancel(data);
    };
    const onClick = data => {
      console.log('on click', data);
      this.props.onClick();
    };

    const validate = () => {
      if (!this.state.isValidated) {
        this.setState({ isValidated: true });
      }
    };

    const { onChangePayment, t } = this.props;
    return (
      <div className={styles.paypal_div}>
        <div className={styles.payment}>
          <span className="txt_bold font_16">{t('Paypal Checkout Payment')}</span>
          <span>|</span>
          <span aria-hidden className="txt_asia" onClick={onChangePayment} role="button">
            {t('change payment')}
          </span>
        </div>
        <div className={styles.paypal}>
          {paypal ? (
            <PayPalButton
              commit={commit}
              env={env}
              onAuthorize={onAuthorize}
              onCancel={onCancel}
              onClick={onClick}
              payment={() => payment(paypal)}
              style={style}
              validate={validate}
            />
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  bookingId: PropTypes.string.isRequired,
  paymentType: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default App;
