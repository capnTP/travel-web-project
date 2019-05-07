import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';

import safeGet from '../../../../helpers/safeGet';
import Card from '../../../../components/Card';
import CardHelper from '../../../../components/Card/helper';
import Button from '../../../../components/Button';

import style from './style.less';
import FullDetail from './FullDetail';

const getThumbnail = booking => {
  let thumbnail = safeGet(
    () => booking.tour.tourMedias.find(m => m.isThumbnail).detail.absoluteUrl,
  );

  if (!thumbnail) {
    thumbnail = booking.tour.tourMedias[0].detail.absoluteUrl;
  }

  return thumbnail;
};

class BookingCard extends React.Component {
  render() {
    const { booking, showFullDetail } = this.props;

    if (!booking) {
      return null;
    }

    return (
      <Card
        content={({ width }) => {
          const size = CardHelper.getSize(width);

          return (
            <div
              className={classnames({
                [style.booking_info]: true,
                [style[size]]: true,
              })}
            >
              <div className={style.left_wrapper}>
                <div className={style.booking_no_wrapper}>
                  <span>Booking No: </span>
                  <strong>#{booking.booking_no}</strong>
                </div>

                <div className={style.tour_name}>{booking.tour.name}</div>

                <div className={style.sub_tour_name}>{booking.subTour.name}</div>
              </div>

              <div className={style.right_wrapper}>
                <div className={style.trip_starts_wrapper}>
                  <div className={style.trip_starts}>
                    <div className={style.day}>{moment(booking.trip_starts).format('DD')}</div>
                    <div className={style.month}>{moment(booking.trip_starts).format('MMM')}</div>
                    <div className={style.year}>{moment(booking.trip_starts).format('YY')}</div>
                  </div>
                </div>

                <Button colorType="primary" onClick={this.props.onView} outlined>
                  View Booking
                </Button>
              </div>
            </div>
          );
        }}
        expansion={({ width }) => {
          const size = CardHelper.getSize(width);

          return (
            <FullDetail
              booking={booking}
              onClose={() => {
                this.props.onHideFullDetail(booking.id);
              }}
              size={size}
            />
          );
        }}
        showExpansion={showFullDetail}
        thumbnailAlt={booking.tour.name}
        thumbnailUrl={getThumbnail(booking)}
      />
    );
  }
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    tour: PropTypes.object.isRequired,
  }).isRequired,
  onHideFullDetail: PropTypes.func,
  onView: PropTypes.func,
  showFullDetail: PropTypes.bool,
};

BookingCard.defaultProps = {
  onHideFullDetail() {},
  onView() {},
  showFullDetail: false,
};

export default BookingCard;
