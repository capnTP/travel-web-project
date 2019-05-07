import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Loadable from 'react-loadable';
import gql from 'graphql-tag';

import { getCheckoutData } from '../../../helpers/checkoutDataUtil';
import * as Payments from '../../../components/Checkout/PaymentCard';
import CreditCard from '../../../components/Checkout/PaymentCard/CreditCard';
import Error from '../../../components/Forms/Error';
import googleCommerce from '../../../helpers/googleEcommerce';
import Loading from '../../../components/Loader';
import logger from '../../../helpers/logger';
import compose from '../../../helpers/compose';
import Select from '../../../components/Forms/Select';
import constants from '../../../constants';

import PaymentList from './PaymentList';
import style from './style.less';

const Paypal = Loadable({
  loader: () => import('../../../components/Checkout/PaymentCard/Paypal'),
  loading: Loading,
});

class Payment extends React.Component {
  state = {
    paymentType: null,
    paymentError: false,
    paymenErrMessage: '',
    isProcessing: false,
    billingError: false,
  };

  paymentMethod = {};

  componentDidMount() {
    const { currencyCode } = this.props;
    const {
      productId,
      productTitle,
      booking: { id, total },
    } = getCheckoutData();

    if (!Payment.isStep3) {
      googleCommerce.setAction.checkout.step3({
        id: productId,
        bookingId: id,
        name: productTitle,
        price: total,
        currencyCode,
      });
      Payment.isStep3 = true;
    }

    if (window) {
      window.scrollTo(0, 0);
    }
  }

  debug = (...args) => {
    logger.debug(`[PaymentStep]`, ...args);
  };

  error = (...args) => {
    logger.error(`[PaymentStep]`, ...args);
  };

  onSelectBillingCountry = event => {
    const value = event.target.value;
    this.debug('change billing country', value);

    if (!value) {
      return;
    }

    const { setCountry, getCountries: { countries } = {}, updateBooking } = this.props;
    const { booking: { id } = {} } = getCheckoutData();
    const { currency } = countries.find(item => item.id === value);

    setCountry({
      variables: {
        input: { id, billingCountryId: value },
        currency,
      },
    })
      .then(res => {
        this.debug('set billing country, HTTP POST: response', res);

        const {
          data: { setBillingCountry: bookingUpdate },
        } = res;
        updateBooking(bookingUpdate);
      })
      .catch(e => {
        this.error('set billing country, HTTP POST: error', e);

        if (e.graphQLErrors) {
          const graphQLError = e.graphQLErrors[0];
          try {
            const parsedError = JSON.parse(graphQLError);

            if (parsedError.message) {
              this.setState({
                billingError: true,
                paymenErrMessage: this.props.t('unfortunately'),
                isProcessing: false,
              });
            }
          } catch (parseError) {
            this.error('Could not parse graphQLErrors', graphQLError);
          }
        }
      });
  };

  onPaypalCancel = data => {
    this.debug('onPaypalCancel', data);

    this.setState(
      {
        paymentError: true,
        paymenErrMessage: `Paypal ${this.props.t('errors.cancelled')}`,
        isProcessing: false,
      },
      () => {
        setTimeout(() => {
          this.noError();
        }, 5000);
      },
    );
  };

  onPaypalError = data => {
    this.debug('onPaypalError', data);

    this.setState(
      {
        paymentError: true,
        paymenErrMessage: this.props.t('errors.try_again'),
        isProcessing: false,
      },
      () => {
        setTimeout(() => {
          this.noError();
        }, 5000);
      },
    );
  };

  onPaypalSuccess = data => {
    if (data.success) {
      this.setState({
        isProcessing: false,
      });
      this.props.onSuccess(data);
    } else {
      this.setState({
        paymentError: false,
        paymenErrMessage: 'Payment error failed. Please try again.',
      });
    }
  };

  onPaypalClick = data => {
    this.debug('onPaypalClick', data);

    this.setState({ isProcessing: true });
  };

  onPopupSuccess = (type, data) => {
    this.props.onSuccess(data);
  };

  onPopupError = (type, data) => {
    this.debug('onPopupError', data);

    this.setState({
      paymentError: true,
      paymenErrMessage: this.props.t('errors.try_again'),
      paymentType: null,
      isProcessing: false,
    });
  };

  onClosePopUp = async (type, data) => {
    this.debug('onClosePopUp', data);

    if (data && data.status === 200) {
      this.setState({ isProcessing: false });

      if (data.id === 'iamport') {
        const iamportPaymentData = (await axios({
          method: 'post',
          url: `${constants.API_URL}/Iamports/createPayment`,
          data: { booking_id: data.book, imp_uid: data.origin.imp_uid },
          config: { headers: { 'Content-Type': 'application/json' } },
        })).data;
        if (iamportPaymentData.status === 500) {
          this.error('error while create payment');
        } else if (iamportPaymentData.status === 200) {
          this.debug('success create payment');
        }
      }
      this.props.onSuccess(data);
      return;
    }

    this.setState(
      {
        paymentError: true,
        paymenErrMessage: `${this.props.t('errors.cancelled')}.`,
        isProcessing: false,
      },
      () => {
        setTimeout(() => {
          this.noError();
        }, 5000);
      },
    );

    clearInterval(this.intervalCheck);
    clearTimeout(this.timeoutCheck);
    clearTimeout(this.paymentTimeout);
    clearTimeout(this.intervalPopup);
  };

  onPaymentSuccess = () => {
    this.debug('onPaypalSuccess');

    this.setState({
      paymentType: null,
      paymentError: false,
      paymenErrMessage: '',
      isProcessing: false,
    });
  };

  onChangePayment = () => {
    this.setState({
      paymentType: null,
      paymentError: false,
      paymenErrMessage: '',
      isProcessing: false,
    });
  };

  setPayment = paymentType => {
    this.debug('setPayment,', paymentType);

    this.setState({ paymentType });

    if (paymentType === 3 || paymentType === 4 || paymentType === 5) {
      let dataType = 'Union';
      switch (paymentType) {
        case 3:
          dataType = 'Alipay';
          break;
        case 4:
          dataType = 'Union';
          break;
        case 5:
          dataType = 'Iamport';
          break;
        default:
          dataType = 'Union';
          break;
      }

      this.selectPayment.call(this.props, this.state, dataType, true);
    }
  };

  noError = () => {
    this.setState({
      paymentError: false,
      paymenErrMessage: false,
    });
  };

  createCreditPayment = value => {
    const { paymentType } = this.state;
    const { booking } = getCheckoutData();
    this.setState({ isProcessing: true });

    axios({
      method: 'post',
      url: `${constants.API_URL}/Ingenicos/createNewPayment`,
      data: {
        booking_id: booking.id,
        payment_method_id: paymentType,
        encrypted_customer_input: value,
      },
      config: { headers: { 'Content-Type': 'application/json' } },
    })
      .then(({ data }) => {
        this.debug('create credit card payment, HTTP POST: response', data);

        if (data.status === 200 && data.success) {
          this.setState({ isProcessing: false });
          this.props.onSuccess(data);
          return;
        }

        const paymentCode = this.props.t(`errors.${data.payment_code}`);
        const paymentError =
          typeof parseInt(paymentCode, 10) === 'string'
            ? paymentCode
            : this.props.t('errors.not_supported');

        this.setState(
          {
            paymentError: true,
            paymenErrMessage: `Failed: ${paymentError}`,
            isProcessing: false,
          },
          () => {
            setTimeout(() => {
              this.noError();
            }, 5000);
          },
        );
      })
      .catch(error => {
        this.error('create credit card payment, HTTP POST: error', error);

        this.setState({ paymentError: true, isProcessing: false }, () => {
          setTimeout(() => {
            this.noError();
          }, 5000);
        });
      });
  };

  completePaymentCheck = (bookingId, paymentType) => {
    const status = axios({
      method: 'post',
      url: `${constants.API_URL}/Payments/isCompletePayment`,
      data: {
        bookingId,
        paymentMethodId: paymentType,
      },
      config: { headers: { 'Content-Type': 'application/json' } },
    });
    status
      .then(({ data }) => {
        if (data.status === 2001) {
          this.closePopups();
          this.props.onSuccess(data);
        }
      })
      .catch(e => {
        this.error('check payment status, HTTP POST: error', e);

        this.setState({ paymentError: true, isProcessing: false }, () => {
          setTimeout(() => {
            this.noError();
          }, 5000);
        });
      });
  };

  isOpenedPopupIsClosed = () => {
    // console.log(this.openedPopup);
    if (this.openedPopup.closed) {
      this.closePopups();
    }
  };

  selectPayment = (event, type, isPopup) => {
    this.closePopups();
    // console.log(type);
    this.setState({ paymentType: type, paymentErr: false, isProcessing: true });
    // console.log(this.state.isProcessing);
    if (isPopup && this.paymentMethod[type] && this.paymentMethod[type].windowPopup) {
      /* note
       *  we will start check payment after popup opened 45 seconds
       *  frontend will call to api every 10 seconds
       *  payment will be expire after 5 minute
       */
      if (type === 'Iamport') {
        this.timeoutCheck = setTimeout(() => {
          this.intervalCheck = setInterval(() => {
            const { booking } = getCheckoutData();
            this.completePaymentCheck(booking.id, type);
          }, 10000);
        }, 45000);
        // Timeout for waitting payment complete
        this.paymentTimeout = setTimeout(() => {
          this.closePopups();
          // console.log('Payment timeout!!!');
          this.setState({
            paymentError: true,
            paymenErrMessage: `Failed: Payment timeout please complete payment again!!`,
            isProcessing: false,
          });
        }, 420000);
      }
      this.openedPopup = this.paymentMethod[type].windowPopup();
      this.intervalPopup = setInterval(() => {
        this.isOpenedPopupIsClosed();
      }, 3000);
    }
  };

  // alipay and union pay
  closePopups = () => {
    this.setState({ isProcessing: false });

    clearInterval(this.intervalCheck);
    clearTimeout(this.timeoutCheck);
    clearTimeout(this.paymentTimeout);
    clearTimeout(this.intervalPopup);

    if (this.paymentMethod.Alipay && 'popup' in this.paymentMethod.Alipay) {
      this.paymentMethod.Alipay.popup.close();
      this.paymentMethod.Alipay.changePayment();
    }

    if (this.paymentMethod.Union && 'popup' in this.paymentMethod.Union) {
      this.paymentMethod.Union.popup.close();
      this.paymentMethod.Union.changePayment();
    }

    if (this.paymentMethod.Iamport && 'popup' in this.paymentMethod.Iamport) {
      this.paymentMethod.Iamport.popup.close();
      this.paymentMethod.Iamport.changePayment();
    }
  };

  renderPayment = type => {
    const PaymentMain = Payments[type];

    if (!PaymentMain) {
      return null;
    }

    const { booking } = getCheckoutData();

    return (
      <PaymentMain
        ref={e => {
          this.paymentMethod[type] = e;
        }}
        bookingId={booking.id}
        onChangePayment={this.onChangePayment}
        onClose={this.onClosePopUp}
        onError={this.onPopupError}
        onSuccess={this.onPopupSuccess}
        paymentType={this.state.paymentType}
        t={this.props.t}
      />
    );
  };

  render() {
    const {
      props: { t, getCountries: { countries } = {}, country, currencyCode },
      state: { paymentType, isProcessing, paymentError, paymenErrMessage, billingError },
      setPayment,
      createCreditPayment,
      onPaypalCancel,
      onPaypalError,
      onPaypalSuccess,
      onPaypalClick,
      noError,
      onChangePayment,
    } = this;

    const { booking, slug } = getCheckoutData();

    return (
      <div className={style.checkout_card}>
        {isProcessing && (
          <div className={style.loader}>
            <BeatLoader color="#4bab86" loading size={32} />
            <br />
            <br />
            <span className={style.bold}>{t('payment process')}</span>
            <span>{t('do not refresh')}</span>
          </div>
        )}

        <Error
          closeError={noError}
          errMessage={paymenErrMessage}
          error={paymentError || billingError}
          slug={billingError ? slug : ''}
          t={t}
        />

        <div className={style.form}>
          {!paymentType && (
            <div>
              <Select
                isDisabled={billingError}
                label={t('billingCountry')}
                name="country"
                onChange={this.onSelectBillingCountry}
                optionList={countries}
                placeholder={t('selectBillingCountry')}
                type="nationality"
                value={country}
              />
            </div>
          )}

          {!billingError && (
            <div>
              {country && !paymentType && (
                <PaymentList currencyCode={currencyCode} onClick={setPayment} t={t} />
              )}

              {paymentType === 1 && (
                <Paypal
                  bookingId={booking.id}
                  onCancel={onPaypalCancel}
                  onChangePayment={onChangePayment}
                  onClick={onPaypalClick}
                  onError={onPaypalError}
                  onSuccess={onPaypalSuccess}
                  paymentType={paymentType}
                  t={t}
                />
              )}

              {paymentType === 2 && (
                <CreditCard
                  bookingId={booking.id}
                  createPayment={createCreditPayment}
                  onChangePayment={onChangePayment}
                  t={t}
                />
              )}

              {country && this.renderPayment('Union')}

              {country && this.renderPayment('Alipay')}

              {country && this.renderPayment('Iamport')}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Payment.propTypes = {
  getCountries: PropTypes.shape({
    countries: PropTypes.array,
  }),
  setCountry: PropTypes.func,
  updateBooking: PropTypes.func,
  t: PropTypes.func.isRequired,
  country: PropTypes.string,
  currencyCode: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

Payment.defaultProps = {
  getCountries: {},
  setCountry() {},
  updateBooking() {},
  country: '',
  currencyCode: '',
};

export default compose(
  withRouter,
  graphql(
    gql`
      mutation setBillingCountry($input: BookingInput!, $currency: String) {
        setBillingCountry(input: $input, currency: $currency) {
          id
          currency
          oldExchangeRate
          exchangeRate
          exchangeTotal
          billingCountry
          isUserCurrency
        }
      }
    `,
    {
      name: 'setCountry',
      options: () => ({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
      }),
    },
  ),
  graphql(
    gql`
      query {
        countries(withoutLocale: true) {
          id
          countryCode
          currency
          flag
          isoCode
          name
        }
      }
    `,
    {
      name: 'getCountries',
      options: () => ({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
      }),
    },
  ),
  Payment,
);
