import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const Itinenary = ({ isHidden, itinerary }) => (
  <div
    className={`${style.itinerary}
  ${!isHidden ? style.hide : ''}`}
  >
    <ul>
      {itinerary.map(item => (
        <li key={item.title}>
          <div>
            <span className={style.time}>{`${item.time.from}  ${item.time.to &&
              `to ${item.time.to}`}`}</span>
            <span className={style.title}>{item.title}</span>
            <span>{item.description}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

Itinenary.propTypes = {
  isHidden: PropTypes.bool,
  itinerary: PropTypes.arrayOf(PropTypes.object),
};

Itinenary.defaultProps = {
  isHidden: true,
  itinerary: [],
};

export default Itinenary;
