import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Wishlist = ({ textHidden }) => (
  <span aria-hidden className={style.wishlist} role="button">
    {textHidden ? null : <span>Wishlist</span>}
    <span className="fas fa-heart" />
  </span>
);

Wishlist.propTypes = {
  textHidden: PropTypes.bool,
  // fill: PropTypes.bool,
};

Wishlist.defaultProps = {
  textHidden: false,
  // fill: false,
};

export default Wishlist;
