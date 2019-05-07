import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from '../../Forms/ProgressBar';

import style from './style.less';

const Rating = ({ rating, productRef }) => (
  <div ref={productRef} className={style.rating_container}>
    <span className={style.txt_bold}>Ratings</span>
    <ul>
      {rating.map(item => (
        <li key={item.star}>
          <div className={style.flex_row}>
            <div className={style.col_6}>
              <ProgressBar count={item.count} />
            </div>
            <div className={style.col_2}>
              <span className={style.txt_bold}>{item.count}</span>
            </div>
            <div className={style.col_2}>
              <span>{item.star} stars</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Rating.propTypes = {
  rating: PropTypes.arrayOf(PropTypes.object),
  productRef: PropTypes.func.isRequired,
};

Rating.defaultProps = {
  rating: [
    {
      star: 5,
      count: 60,
    },
    {
      star: 4,
      count: 50,
    },
    {
      star: 3,
      count: 25,
    },
    {
      star: 2,
      count: 4,
    },
    {
      star: 1,
      count: 3,
    },
  ],
};

export default Rating;
