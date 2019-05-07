import React from 'react';
import PropTypes from 'prop-types';

import Star from '../../../Forms/Star';
import ImageCard from '../Image';
import PriceCard from '../Price';

import style from './style.less';

const Main = ({ productRef }) => (
  <div ref={productRef} className={style.product_card}>
    <div className={style.pagination}>
      <span>Thailand &gte; Bangkok</span>
      <Star rating={4} />
    </div>
    <ImageCard />
    <PriceCard isDiscounted />
  </div>
);

Main.propTypes = {
  productRef: PropTypes.func.isRequired,
};

export default Main;
