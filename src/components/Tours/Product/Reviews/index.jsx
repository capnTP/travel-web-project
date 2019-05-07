import React from 'react';
import PropTypes from 'prop-types';

import Star from '../../../Forms/Star';
import constants from '../../../../constants';

import style from './style.less';

class Reviews extends React.Component {
  state = {
    length: 2,
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      length: prevState.length + 5,
    }));
  };

  render() {
    const { reviews, productRef, side, t, scrollTo, inModal } = this.props;
    const { length } = this.state;
    const reviewList = side ? reviews.slice(0, 1) : reviews.slice(0, length);
    return reviewList.length ? (
      <div ref={productRef} className={style.reviews_container}>
        {!side && (
          <div className={style.flex_between}>
            <span className={style.text_bold}>{t('travel reviews')}</span>
            {/* <button>
                <span className="icon icon-filter" />
              </button> */}
          </div>
        )}

        {reviewList.map(
          ({
            reviewerName,
            nationalityFlag: flag,
            reviewDescription,
            rating,
            reviewTitle,
            createdAt,
          }) => (
            <div key={reviewerName} className={style.review_card}>
              <div className={style.review_header}>
                <div className={style.reviewer}>
                  <img alt={flag} src={`${constants.IMIGIX_URL}/countries/${flag}`} />
                  <span className={style.review_name}>{reviewerName}</span>
                </div>
                <div className={style.rating}>
                  <Star noOutline rating={rating} />
                  <span className={style.date}>{createdAt}</span>
                </div>
              </div>
              <div className={style.review_body}>
                <span>{reviewTitle}</span>
                <span>{`"${reviewDescription}"`}</span>
              </div>
            </div>
          ),
        )}
        {side && reviews.length > 1 && !inModal ? (
          <div className={style.load_more}>
            <button onClick={() => scrollTo('reviews', true)} type="button">
              {t('Read All Reviews')}
            </button>
          </div>
        ) : null}
        {!side && reviews.length > 2 && length <= reviews.length ? (
          <div className={style.load_more}>
            <button onClick={this.onLoadMore} type="button">
              {t('Load more reviews')}
            </button>
          </div>
        ) : null}
      </div>
    ) : null;
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  productRef: PropTypes.func,
  side: PropTypes.bool,
  t: PropTypes.func,
  scrollTo: PropTypes.func,
  inModal: PropTypes.bool,
};

Reviews.defaultProps = {
  reviews: [],
  side: false,
  productRef() {},
  t() {},
  scrollTo() {},
  inModal: false,
};

export default Reviews;
