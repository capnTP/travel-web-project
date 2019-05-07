import React from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import CardValidator from 'card-validator';
import ReactTooltip from 'react-tooltip';

import Input from '../../../Forms/Input';
import Button from '../../../Button';
import creditcard from '../../../../assets/images/newpayment/creditcard.png';
import visa from '../../../../assets/images/newpayment/visa.png';
import mastercard from '../../../../assets/images/newpayment/mastercard.png';
import maestro from '../../../../assets/images/newpayment/maestro.png';
import discover from '../../../../assets/images/newpayment/discover.png';
import americanexpress from '../../../../assets/images/newpayment/amex.png';
import jcb from '../../../../assets/images/newpayment/jcb.png';
import dinersclub from '../../../../assets/images/newpayment/dinersclub.png';
import cvv from '../../../../assets/images/newpayment/cvv.png';

import style from './style.less';

class CreditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPayments: false,
      selectedItem: null,
      paymentForm: {},
      isProcessing: false,
      sessionData: {},
      cardId: 1,
      cardType: '',
    };

    this.onBlur = this.onBlur.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
    this.changePayment = this.changePayment.bind(this);

    const session = axios({
      method: 'post',
      // eslint-disable-next-line no-undef
      url: `${API_SERVER}/Ingenicos/createSession`,
      data: `booking_id=${props.bookingId}`,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    });
    session.then(({ data }) => {
      console.log('data : ', data);
      this.setState({ sessionData: data });
    });
  }

  onBlur = event => {
    const { name } = event.target;
    const { value } = event.target;
    let isValid;
    let error;
    let errMessage;
    let cardType = '';
    let cardId;
    let cardName = '';

    if (name === 'card_name') {
      error = !(value && value.length > 0);
      errMessage = error ? this.props.t('this field is required') : null;
    }

    if (name === 'card_number') {
      isValid = CardValidator.number(value);
      error = !(isValid.isPotentiallyValid && isValid.isValid && isValid.card.type !== 'unionpay');
      errMessage = error
        ? isValid.card && isValid.card.type === 'unionpay'
          ? this.props.t('Please select Union Pay payment method')
          : this.props.t('credit_form.card_invalid')
        : null;
      cardType = !error ? isValid.card.type.replace('-', '') : '';
      if (!error) {
        cardType = !error ? isValid.card.type.replace('-', '') : '';
        switch (cardType) {
          case 'visa':
            cardName = '';
            cardType = visa;
            cardId = 114;
            break;
          case 'mastercard':
            cardName = '';
            cardType = mastercard;
            cardId = 3;
            break;
          case 'americanexpress':
            cardName = 'americanexpress';
            cardType = americanexpress;
            cardId = 1;
            break;
          case 'dinersclub':
            cardName = '';
            cardType = dinersclub;
            cardId = 132;
            break;
          case 'discover':
            cardName = '';
            cardType = discover;
            cardId = 128;
            break;
          case 'jcb':
            cardName = '';
            cardType = jcb;
            cardId = 125;
            break;
          case 'maestro':
            cardName = '';
            cardType = maestro;
            cardId = 1;
            break;
          default:
            cardName = '';
            cardType = creditcard;
            cardId = 1;
        }
      }
    }
    if (name === 'expiration_date') {
      cardName = this.state.cardType;
      isValid = CardValidator.expirationDate(value);
      error = !(isValid.isPotentiallyValid && isValid.isValid);
      errMessage = error ? this.props.t('credit_form.expiry_invalid') : null;
    }
    if (name === 'cvv') {
      cardName = this.state.cardType;
      const maxLen = this.state.cardType === 'americanexpress' ? 4 : 3;
      isValid = CardValidator.cvv(value, maxLen);
      error = !(isValid.isPotentiallyValid && isValid.isValid);
      errMessage = error ? this.props.t('credit_form.cvv_invalid') : null;
    }

    const { paymentForm } = this.state;
    const form = Object.assign({}, paymentForm);

    form[name] = {
      value,
      error,
      errMessage,
      cardType,
    };

    this.setState({
      paymentForm: form,
      cardId,
      cardType: cardName,
    });
  };

  submitPayment = event => {
    event.preventDefault();
    const {
      paymentForm,
      sessionData: { s_key },
    } = this.state;
    if (
      !paymentForm.card_number.error &&
      !paymentForm.expiration_date.error &&
      !paymentForm.cvv.error
    ) {
      this.setState({ isProcessing: true, selectedItem: null });
      const data = {
        cardholderName: paymentForm.card_name.value,
        cardNumber: paymentForm.card_number.value.replace(/ /g, ''),
        expiryDate: paymentForm.expiration_date.value.replace('/', ''),
        cvv: paymentForm.cvv.value,
      };
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), s_key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const encryptedData = ciphertext.toString();
      console.log('encryptedData => ', encryptedData);
      this.props.createPayment(encryptedData);
    } else {
      console.log('invalid');
    }
  };

  changePayment = () => {
    this.setState(
      {
        paymentForm: {},
      },
      () => {
        this.props.onChangePayment();
      },
    );
  };

  render() {
    const {
      state: { paymentForm },
      onBlur,
      submitPayment,
      changePayment,
      props: { t },
    } = this;
    const nameValue =
      paymentForm.card_name && paymentForm.card_name.value ? paymentForm.card_name.value : '';
    const cardValue =
      paymentForm.card_number && paymentForm.card_number.value ? paymentForm.card_number.value : '';
    const expValue =
      paymentForm.expiration_date && paymentForm.expiration_date.value
        ? paymentForm.expiration_date.value
        : '';
    const cvvValue = paymentForm.cvv && paymentForm.cvv.value ? paymentForm.cvv.value : '';
    const nameErr = paymentForm.card_name && paymentForm.card_name.error;
    const cardErr = paymentForm.card_number && paymentForm.card_number.error;
    const expirationErr = paymentForm.expiration_date && paymentForm.expiration_date.error;
    const cvvErr = paymentForm.cvv && paymentForm.cvv.error;

    return (
      <form autoComplete="off" className={style.checkout_card} onSubmit={submitPayment}>
        <ReactTooltip html />
        <div className={style.form}>
          <div className={style.payment}>
            <span className="txt_bold font_16">{t('credit card payment')}</span>
            <span>|</span>
            <span aria-hidden className="txt_asia" onClick={changePayment} role="button">
              {t('change payment')}
            </span>
          </div>
          <div className={style.card_name}>
            <Input
              isRequired
              label={t('name on credit card')}
              name="card_name"
              onBlur={onBlur}
              onChange={onBlur}
              placeholder={t('enter the name shown')}
              value={nameValue}
            />
            {nameErr && <span className={style.error}>{t('this field is required')}</span>}
          </div>
          <div className={style.credit}>
            <span>
              {t('credit card')} {'*'}
            </span>
            <div className={style.input_group}>
              {!cardErr && paymentForm.card_number && paymentForm.card_number.cardType && (
                <div className={style.credit_image}>
                  <img
                    alt={paymentForm.card_number.cardType}
                    src={paymentForm.card_number.cardType}
                  />
                </div>
              )}
              <MaskedInput
                // eslint-disable-next-line
                className={cardErr ? style.input_error : ''}
                guide={false}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name="card_number"
                onBlur={event => onBlur(event)}
                onChange={event => onBlur(event)}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                value={cardValue}
              />
            </div>
            {cardErr && (
              <span className={style.error}>{paymentForm.card_number.errMessage || ''}</span>
            )}
          </div>
          <div className={style.input_columns}>
            <div>
              <label htmlFor="expiration_date">
                <span>
                  {t('expiry date')} {'*'}
                </span>
                <MaskedInput
                  autoComplete="off"
                  className={expirationErr ? style.error : ''}
                  guide={false}
                  mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/]}
                  name="expiration_date"
                  onBlur={event => onBlur(event)}
                  placeholder="MM/YY"
                  required
                  value={expValue}
                />
                {expirationErr && (
                  <span className={style.error}>
                    {paymentForm.expiration_date.errMessage || ''}
                  </span>
                )}
              </label>
            </div>
            <div>
              <label htmlFor="cvv">
                <span>
                  <span
                    className="icon icon-info-circle"
                    data-html
                    data-tip={`<img src=${cvv} height="60" />`}
                    data-type="success"
                  />{' '}
                  {t('cvv Number')} {'*'}
                </span>
                <MaskedInput
                  autoComplete="off"
                  className={cvvErr ? style.error : ''}
                  guide={false}
                  mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                  name="cvv"
                  onBlur={event => onBlur(event)}
                  onChange={event => onBlur(event)}
                  placeholder="123"
                  required
                  type="password"
                  value={cvvValue}
                />
                {cvvErr && <span className={style.error}>{paymentForm.cvv.errMessage || ''}</span>}
              </label>
            </div>
          </div>
        </div>

        <div>
          <Button colorType="warning" type="submit">
            {t('Complete Payment')}
          </Button>
        </div>
      </form>
    );
  }
}

CreditCard.propTypes = {
  bookingId: PropTypes.string.isRequired,
  createPayment: PropTypes.func.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CreditCard;
