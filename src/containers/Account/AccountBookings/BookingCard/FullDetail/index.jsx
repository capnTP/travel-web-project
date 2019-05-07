import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../../../../../components/Button';

import style from './style.less';

const FullDetail = ({ booking, onClose, size }) => (
  <div
    className={classnames({
      [style.full_detail]: true,
      [style[size]]: true,
    })}
  >
    <div className={style.detail_group}>
      <div className={style.title}>Customer Contact Details</div>

      {booking.user.name && (
        <div className={style.key_value}>
          <div className={style.key}>Guest name</div>
          <div className={style.value}>{booking.user.name}</div>
        </div>
      )}

      {booking.user.email && (
        <div className={style.key_value}>
          <div className={style.key}>Email Address</div>
          <div className={style.value}>{booking.user.email}</div>
        </div>
      )}

      {booking.user.nationality && (
        <div className={style.key_value}>
          <div className={style.key}>Nationality</div>
          <div className={style.value}>{booking.user.nationality.name}</div>
        </div>
      )}

      {booking.user.phone && (
        <div className={style.key_value}>
          <div className={style.key}>Contact Number</div>
          <div className={style.value}>{booking.user.phone}</div>
        </div>
      )}
    </div>

    {booking.specialRequest && (
      <div className={style.detail_group}>
        <div className={style.title}>Special Requests</div>

        <div className={style.key_value}>
          <div className={style.key}>{booking.specialRequest}</div>
        </div>
      </div>
    )}

    <div className={style.detail_group}>
      <div className={style.title}>Pick Up Information</div>

      {booking.passportNumber && (
        <div className={style.key_value}>
          <div className={style.key}>Passport Number</div>
          <div className={style.value}>{booking.passportNumber}</div>
        </div>
      )}

      {booking.flightNumber && (
        <div className={style.key_value}>
          <div className={style.key}>Flight Number</div>
          <div className={style.value}>{booking.flightNumber}</div>
        </div>
      )}

      {booking.pickupLocationTime && (
        <div className={style.key_value}>
          <div className={style.key}>Pick Up Location & Time</div>
          <div className={style.value}>{booking.pickupLocationTime}</div>
        </div>
      )}

      {booking.pickupPlace && (
        <div className={style.key_value}>
          <div className={style.key}>Pick Up Location</div>
          <div className={style.value}>{booking.pickupPlace}</div>
        </div>
      )}

      {booking.pickupTime && (
        <div className={style.key_value}>
          <div className={style.key}>Pick Up Time</div>
          <div className={style.value}>{booking.pickupTime}</div>
        </div>
      )}
    </div>

    <div className={style.action}>
      <Button fullWidth={size === 'xs'} onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);

FullDetail.propTypes = {
  booking: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.string,
};

FullDetail.defaultProps = {
  onClose() {},
  size: '',
};

export default FullDetail;
