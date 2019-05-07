import React, { Component } from 'react';
import PropTypes from 'prop-types';

import popupWindow from '../../../../helpers/popup';
import constants from '../../../../constants';

import style from './style.less';

class Iamport extends Component {
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
    console.log('iamport event', event);
    const data = event.data;
    if (this.popup && data.theasia) {
      this.popup.close();
      this.props.onClose('Iamport', data);
    } else if (this.popup && data === '{"popupStatus":"closed"}') {
      console.log('popup is closed');
      this.popup.close();
      this.setState({
        loading: false,
      });
      this.props.onChangePayment();
    }
  };

  getUrlFromPayment = () => {
    console.log('Iamport data ===>', 'isProcessing');
    this.setState({ processing: true, loading: true });
    this.popup.location.href = `${constants.APP_URL}/Iamports/createPayment/${
      this.props.bookingId
    }`;
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
      if (windowListener) {
        windowListener('message', this.onMessage, false);
      }
      if (windowListener) {
        windowListener('onmessage', this.onMessage, false);
      }
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
      <div className={`${style.iamport_wrapper}`}>
        {this.state.loading && (
          <div className={style.payment}>
            <span className="txt_bold font_16">{t('Credit Card Payment')}</span>
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

Iamport.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Iamport;
