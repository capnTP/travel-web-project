import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Bookmark = ({ textHidden }) => (
  <span aria-hidden className={style.bookmark} role="button">
    {textHidden ? null : <span>Bookmark</span>}
    <span className="fas fa-bookmark" />
  </span>
);

Bookmark.propTypes = {
  textHidden: PropTypes.bool,
  // fill: PropTypes.bool,
};

Bookmark.defaultProps = {
  textHidden: false,
  // fill: false,
};

export default Bookmark;
