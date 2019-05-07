import React from 'react';
import PropTypes from 'prop-types';

import PriceCard from '../Price';
import Star from '../../../Forms/Star';

import style from './style.less';

const truncate = (str, length, ending) => {
  let textLength = length;
  let textEnding = ending;
  if (textLength === null) {
    textLength = 100;
  }
  if (textEnding === null) {
    textEnding = '...';
  }
  if (str.length > textLength) {
    return str.substring(0, textLength - textEnding.length) + textEnding;
  }
  return str;
};

const TourCard = ({ imgUrl, rating, title, isDiscounted }) => (
  <div className={style.tour_card}>
    <img alt={title} className={style.hero} src={imgUrl} />
    <h1>{truncate(title, 70)}</h1>
    <div className={style.rating}>
      <Star rating={rating} />
    </div>
    <PriceCard isDiscounted={isDiscounted} isSimilar />
  </div>
);

TourCard.propTypes = {
  imgUrl: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string,
  isDiscounted: PropTypes.bool,
};

TourCard.defaultProps = {
  imgUrl: '',
  rating: 5,
  title: '',
  isDiscounted: false,
};

export default TourCard;
