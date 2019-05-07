import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import popupWindow from '../../../../helpers/popup';
import constants from '../../../../constants';

import style from './style.less';

class Alipay extends Component {
  state = {
    url: '',
    processing: true,
    loading: false,
  };

  componentDidMount() {
    const windowListener = window.removeEventListener || window.detachEvent;
    if (windowListener) {
      windowListener('close', this.onClose, false);
    }
  }

  componentWillUnmount() {
    const windowListener = window.removeEventListener || window.detachEvent;
    if (windowListener) windowListener('message', this.onMessage);
    if (windowListener) windowListener('onmessage', this.onMessage);
    if (windowListener) windowListener('close', this.onClose, false);
  }

  onMessage = event => {
    const data = event.data;
    if (this.popup && data.theasia) {
      this.popup.close();
      this.props.onClose('Alipay', data);
    }
  };

  onClose = () => {
    console.log('isClose =>>>>>>>>>>>>');
  };

  getUrlFromPayment = () => {
    this.setState({ processing: true, loading: true });
    const status = axios({
      method: 'post',
      url: `${constants.API_URL}/Ingenicos/createPayment`,
      data: `booking_id=${this.props.bookingId}&payment_method_id=3`,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    });
    status
      .then(({ data }) => {
        console.log('data ===>', data.status);
        if (data.status === 200) {
          // complete payment
          this.setState({ processing: false });
          this.props.onSuccess('Alipay', data);
          if (this.popup) {
            this.popup.close();
          }
        } else if (data.status === 429) {
          // payment is already made
          this.setState({ processing: false });
          this.props.onError('Alipay', data);
          if (this.popup) {
            this.popup.close();
          }
        } else if (data.status === 1000) {
          // creating payment
          if (this.popup) {
            this.popup.location.href = data.url;
          }
          console.log('creating booking ==>');
        } else {
          // on error payment
          this.setState({ processing: false });
          this.props.onError('Alipay', data);
          if (this.popup) {
            this.popup.close();
          }
        }
      })
      .catch(e => {
        this.setState({ processing: false });
        this.props.onError('Alipay', e);
        if (this.popup) {
          this.popup.close();
        }
        return e;
      });
  };

  windowPopup = () => {
    this.popup = popupWindow(`${constants.APP_URL}/please-wait`, '_blank', 1000, 750);
    if (this.popup) {
      const windowListener = window.addEventListener || window.attachEvent;
      if (windowListener) windowListener('message', this.onMessage, false);
      if (windowListener) windowListener('onmessage', this.onMessage, false);
      if (windowListener) windowListener('beforeunload', this.onClose, false);
      this.getUrlFromPayment();
    }
    return this.popup;
  };

  changePayment = () => {
    this.setState({
      loading: false,
    });
    this.props.onChangePayment();
  };

  render() {
    const {
      changePayment,
      props: { t },
    } = this;
    return (
      <div className={`${style.alipay_wrapper}`}>
        {this.state.loading && (
          <div className={style.payment}>
            <span className="txt_bold font_16">{t('Alipay Payment')}</span>
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

Alipay.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Alipay;
