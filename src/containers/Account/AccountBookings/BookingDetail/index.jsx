import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

import Button from '../../../../components/Button';

import style from './style.less';

class BookingDetail extends React.Component {
  render() {
    const { booking } = this.props;
    return (
      <div className={style.BookingDetail}>
        <h3 className={style.header}>
          Your Booking Details
          <i
            className={classnames('icon-close', style.close_button)}
            onClick={this.props.onClose}
            role="button"
            tabIndex="0"
          />
        </h3>

        <div className={style.content}>
          <div className={style.flex_card}>
            <span>Booking No.</span>
            <strong className={style.success_color}>#{booking.booking_no}</strong>
          </div>

          <div className={style.flex_card}>
            <span>Tour date</span>
            <strong>{moment(booking.trip_starts).format('DD MMM YYYY')}</strong>
          </div>
        </div>

        <div className={style.pre_action_wrapper}>
          <Button
            fullWidth
            onClick={() => {
              this.props.onViewFullBooking(booking.id);
            }}
          >
            View Full Booking
          </Button>
        </div>

        {/* eslint-disable <div className={style.booking_members}>
          <div className={style.member}>
            <div className={style.member_type}>Adult: </div>

            <div className={style.member_count}>
              <span className={style.multiple}>X</span> <b>{booking.adult_pax}</b>
            </div>

            <div className={style.currency_wrapper}>
              <span className={style.currency}>{booking.bookingCurrencyCode}</span>
              <b>5600</b>
            </div>
          </div>
          <div className={style.member}>
            <div className={style.member_type}>Children: </div>
            <div className={style.member_count}>
              <span className={style.multiple}>X</span> <b>{booking.child_pax}</b>
            </div>
            <div className={style.currency_wrapper}>
              <span className={style.currency}>{booking.bookingCurrencyCode}</span>
              <b>5600</b>
            </div>
          </div>
          <div className={style.member}>
            <div className={style.member_type}>Infants: </div>
            <div className={style.member_count}>
              <span className={style.multiple}>X</span> <b>{booking.infant_pax}</b>
            </div>
            <div className={style.currency_wrapper}>
              <span className={style.currency}>{booking.bookingCurrencyCode}</span>
              <b>0</b>
            </div>
          </div>
        </div> eslint-enable */}

        <div className={style.total_price_wrapper}>
          <div>
            <b className={style.total_txt}>Total Price</b>
          </div>
          <div className={style.currency_wrapper}>
            <span className={style.currency}>{booking.bookingCurrencyCode}</span>
            <span className={style.amount}>
              <b>{booking.total}</b>
            </span>
          </div>
        </div>

        <div className={style.cancellation_policy_wrapper}>
          <div className={style.policy_type_wrapper}>
            <b className={style.policy_type}>Cancellation Policy:</b>
            <b className={style.policy_name}>{booking.subTour.cancellationPolicy.name}</b>
          </div>
          <div className={style.refund_txt}>{booking.subTour.cancellationPolicy.description}</div>
        </div>
      </div>
    );
  }
}

BookingDetail.propTypes = {
  booking: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onViewFullBooking: PropTypes.func,
};

BookingDetail.defaultProps = {
  onClose() {},
  onViewFullBooking() {},
};

export default BookingDetail;
