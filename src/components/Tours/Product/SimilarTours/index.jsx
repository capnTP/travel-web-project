import React from 'react';
import PropTypes from 'prop-types';

import ImageCard from '../Image';
import PriceCard from '../Price';
import TourCard from '../TourCard';

import style from './style.less';

const SimilarTours = ({ isDesktop, tours, productRef }) => (
  <div ref={productRef} className={style.tours_container}>
    <span>Similar Tours</span>
    {!isDesktop &&
      tours.map(item => (
        <div key={item} className={style.similar_card}>
          <ImageCard />
          <PriceCard isSimilar />
        </div>
      ))}
    {isDesktop && (
      <div className={style.desktop_container}>
        {tours.map(tour => (
          <div className={style.card}>
            <TourCard {...tour} />
          </div>
        ))}
      </div>
    )}
  </div>
);

SimilarTours.propTypes = {
  productRef: PropTypes.func.isRequired,
  tours: PropTypes.arrayOf(PropTypes.object),
  isDesktop: PropTypes.bool,
};

SimilarTours.defaultProps = {
  tours: [1, 2, 3, 4],
  isDesktop: false,
};

export default SimilarTours;
