import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../../../components/Card';
import CardHelper from '../../../../components/Card/helper';
import safeGet from '../../../../helpers/safeGet';
import Button from '../../../../components/Button';
import Star from '../../../../components/Forms/Star';

import style from './style.less';

const getThumbnailUrl = booking => {
  if (!booking) {
    return '';
  }

  let thumbnail = safeGet(
    () => booking.tour.tourMedias.find(m => m.isThumbnail).detail.absoluteUrl,
  );

  if (!thumbnail) {
    thumbnail = booking.tour.tourMedias[0].detail.absoluteUrl;
  }

  return thumbnail;
};

const ReviewCard = ({ booking, onClickAddReview, onClickEditReview }) => {
  const review = safeGet(() => booking.review);
  const containsRejectedReview = review && review.status === 2;

  return (
    <Card
      className={style.booking_card_component}
      content={({ width }) => {
        const size = CardHelper.getSize(width);

        return (
          <div className={classnames(style.content_wrapper, style[size])}>
            <div className={style.tour_name}>{safeGet(() => booking.tour.name)}</div>

            <div className={style.secondary}>
              <div className={style.sub_tour}>
                <div className={style.name}>{safeGet(() => booking.subTour.name)}</div>

                {review && (
                  <div>
                    <Star rating={review.rating} />
                  </div>
                )}
              </div>

              <div className={style.action}>
                {containsRejectedReview && [
                  <Button colorType="danger" outlined>
                    Rejected
                  </Button>,
                  <Button colorType="primary" onClick={onClickEditReview} outlined>
                    Edit
                  </Button>,
                ]}

                {!review && (
                  <Button colorType="primary" onClick={onClickAddReview} outlined>
                    Review
                  </Button>
                )}

                {review && !containsRejectedReview && (
                  <Button colorType="primary" onClick={onClickEditReview} outlined>
                    Read
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      }}
      thumbnailUrl={getThumbnailUrl(booking)}
    />
  );
};

ReviewCard.propTypes = {
  booking: PropTypes.object.isRequired,
  onClickAddReview: PropTypes.func.isRequired,
  onClickEditReview: PropTypes.func.isRequired,
};

export default ReviewCard;
