import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

import safeGet from '../../../../helpers/safeGet';
import Star from '../../../../components/Forms/Star';
import Button from '../../../../components/Button';

import style from './style.less';
import helper from './helper';

const emptyFormData = {
  recommend: null,
  rating: 0,
  review_title: '',
  review: '',
};

const getInput = (props, state) => {
  const booking = state.review ? state.review.booking : props.booking;
  return {
    booking_id: booking.id,
    group_size: helper.getGroupSize(booking),
    language_id: booking.user.language_id,
    nationality: booking.user.countryId,
    rating: state.formData.rating,
    recommend: state.formData.recommend,
    review: state.formData.review,
    review_title: state.formData.review_title,
    reviewer_name: booking.user.name,
    sub_product_id: booking.sub_product_id,
    tour_id: booking.tour_id,
    user_id: props.info.user.userId,
  };
};

class ReviewForm extends React.Component {
  state = {
    formData: emptyFormData,
    review: null,
    isSubmitting: false,
  };

  onSubmit = async () => {
    this.setState({ isSubmitting: true });
    const reviewId = safeGet(() => this.state.review.id);

    if (reviewId) {
      await this.props
        .updateReview({
          variables: {
            id: reviewId,
            input: getInput(this.props, this.state),
          },
        })
        .catch(error => error);
    } else {
      await this.props
        .createReview({
          variables: {
            input: getInput(this.props, this.state),
          },
        })
        .catch(error => error);
    }

    this.setState({ isSubmitting: false });
    this.props.closeReviewPopOver();
    this.props.refetchRootQuery();
  };

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  render() {
    const {
      formData: { review, review_title, rating, recommend },
    } = this.state;

    const header = (
      <h3 className={style.header}>
        Your review
        <i
          className={classnames('icon-close', style.close_button)}
          onClick={this.props.closeReviewPopOver}
          role="button"
          tabIndex="0"
        />
      </h3>
    );

    const booking = this.props.booking;

    if (!booking) {
      return null;
    }

    const readOnly = !!booking.review;
    const reviewData = booking.review;

    const reviewWasSaved = !!safeGet(() => this.props.booking.review.id);

    return (
      <div className={style.ReviewForm}>
        {header}

        <div className={style.content}>
          <div className={style.flex_card}>
            <span>Booking No.</span>
            <strong className={style.success_color}>#{booking.booking_no}</strong>
          </div>

          <div className={style.flex_card}>
            <span>Tour date</span>
            <strong>{moment(booking.trip_starts).format('DD MMM YYYY')}</strong>
          </div>

          <div className={style.recommend}>
            <p>Would you recommend this activity to your friends and family?</p>

            {readOnly && (
              <div className={style.recommend_button_wrapper}>
                <Button
                  colorType="warning"
                  onClick={() => {
                    const { formData } = this.state;
                    formData.recommend = true;
                    this.setState({ formData });
                  }}
                >
                  {reviewData.recommend ? 'Yes' : 'No'}
                </Button>
              </div>
            )}

            {!readOnly && (
              <div className={style.recommend_button_wrapper}>
                <Button
                  colorType={recommend === true ? 'warning' : ''}
                  onClick={() => {
                    const { formData } = this.state;
                    formData.recommend = true;
                    this.setState({ formData });
                  }}
                >
                  Yes
                </Button>

                <Button
                  colorType={recommend === false ? 'warning' : ''}
                  onClick={() => {
                    const { formData } = this.state;
                    formData.recommend = false;
                    this.setState({ formData });
                  }}
                >
                  No
                </Button>
              </div>
            )}
          </div>

          <div className={style.ratings_wrapper}>
            <span>Overall rating</span>

            <div className={style.ratings}>
              {reviewData && <Star rating={parseInt(reviewData.rating, 10)} readOnly={readOnly} />}

              {!reviewData && (
                <Star
                  onClick={value => {
                    const { formData } = this.state;
                    formData.rating = value;
                    this.setState({ formData });
                  }}
                  rating={parseInt(rating, 10)}
                />
              )}
            </div>
          </div>

          <div className={style.title_wrapper}>
            {!readOnly ? (
              <div>
                <div className={style.divider}>
                  <div className={style.title}>
                    Title <span>(max 100 characters)</span>
                    <span className={style.superTopAsterik}>*</span>
                  </div>
                  <input
                    name="review_title"
                    onChange={this.handleChange}
                    placeholder="Enter title here"
                    value={review_title}
                  />
                </div>
                <div>
                  <div className={style.title}>
                    Comments
                    <span>*</span>
                  </div>
                  <textarea name="review" onChange={this.handleChange} value={review} />
                </div>
              </div>
            ) : (
              <div>
                <b>{reviewData.review_title}</b>
                <div className={style.comment_txt}>{`"${reviewData.review}"`}</div>
              </div>
            )}
          </div>
        </div>

        {!reviewWasSaved && (
          <div className={style.action}>
            <button className={style.submit} onClick={this.onSubmit} type="button">
              {this.state.isSubmitting ? 'Saving...' : 'Complete Review'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

ReviewForm.propTypes = {
  booking: PropTypes.object,
  closeReviewPopOver: PropTypes.func,
  createReview: PropTypes.func,
  refetchRootQuery: PropTypes.func,
  updateReview: PropTypes.func,
};

ReviewForm.defaultProps = {
  booking: null,
  closeReviewPopOver() {},
  createReview() {},
  refetchRootQuery() {},
  updateReview() {},
};

export default ReviewForm;
