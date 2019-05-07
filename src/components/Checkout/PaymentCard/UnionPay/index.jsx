import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import popupWindow from '../../../../helpers/popup';
import constants from '../../../../constants';

import style from './style.less';

class Union extends Component {
  state = {
    url: '',
    processing: true,
    window: '',
    loading: false,
  };

  componentWillUnmount() {
    const windowListener = window.removeEventListener || window.detachEvent;
    if (windowListener) windowListener('message', this.onMessage);
    if (windowListener) windowListener('onmessage', this.onMessage);
  }

  onMessage = event => {
    console.log('union event', event);
    const data = event.data;
    if (this.popup && data.theasia) {
      this.popup.close();
      this.props.onClose('Union Pay', data);
    }
  };

  getUrlFromPayment = () => {
    console.log('union pay data ===>', 'isProcessing');
    this.setState({ processing: true, loading: true });
    const status = axios({
      method: 'post',
      url: `${constants.API_URL}/Ingenicos/createPayment`,
      data: `booking_id=${this.props.bookingId}&payment_method_id=4`,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    });
    status
      .then(({ data }) => {
        console.log('data ===>', data.status);
        if (data.status === 200) {
          // completed payment
          this.setState({ processing: false });
          this.props.onSuccess('Union', data);
          if (this.popup) {
            this.popup.close();
          }
        } else if (data.status === 429) {
          // payment is already made
          this.setState({ processing: false });
          this.props.onError('Union', data);
          if (this.popup) {
            this.popup.close();
          }
        } else if (data.status === 1000) {
          if (this.popup) {
            this.popup.location.href = data.url;
          }
        } else {
          // on error payment
          this.setState({ processing: false });
          this.props.onError('Union', data);
          if (this.popup) {
            this.popup.close();
          }
        }
      })
      .catch(e => {
        console.log('error => ', e);
        this.setState({ processing: false });
        this.props.onError('Union', e);
        if (this.popup) {
          this.popup.close();
        }
        return e;
      });
  };

  changePayment = () => {
    this.setState({
      loading: false,
    });
    this.props.onChangePayment();
  };

  windowPopup = () => {
    this.popup = popupWindow(`${constants.APP_URL}/please-wait`, '_blank', 1100, 800);
    if (this.popup) {
      const windowListener = window.addEventListener || window.attachEvent;
      if (windowListener) windowListener('message', this.onMessage, false);
      if (windowListener) windowListener('onmessage', this.onMessage, false);
      this.getUrlFromPayment();
    }
    return this.popup;
  };

  render() {
    const {
      changePayment,
      props: { t },
    } = this;
    return (
      <div className={`${style.union_pay_wrapper}`}>
        {this.state.loading && (
          <div className={style.payment}>
            <span className="txt_bold font_16">{t('Union Pay Payment')}</span>
            <span>|</span>
            <span aria-hidden className="txt_asia" onClick={changePayment} role="button">
              {t('change payment')}
            </span>
          </div>
        )}
      </div>
    );
  }
}

Union.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Union;
