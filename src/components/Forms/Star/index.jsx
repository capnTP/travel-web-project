// @flow
import React from 'react';
import classnames from 'classnames';

import style from './style.less';
import '../../../assets/icons/style.css';

type Props = {
  noOutline?: boolean,
  onClick?: (value: number) => void,
  rating?: ?number,
  readOnly?: boolean,
  stars?: Array<number>,
};

const Star = (props: Props) => {
  const { onClick, readOnly, noOutline } = props;
  let { rating, stars } = props;

  if (!stars) {
    stars = [];
  }

  return (
    <div className={style.star_container}>
      {stars.map(item => {
        if (!rating) {
          rating = 0;
        }

        return (
          <span
            key={item}
            className={classnames('icon', {
              'icon-star-full': rating >= item,
              'icon-star-outline': rating < item && rating !== item && (!noOutline && !readOnly),
              [style.read_only]: readOnly,
            })}
            onClick={() => {
              if (!readOnly && onClick) {
                onClick(item);
              }
            }}
            role="button"
            tabIndex="0"
          />
        );
      })}
    </div>
  );
};

Star.defaultProps = {
  rating: 0,
  stars: [1, 2, 3, 4, 5],
  readOnly: false,
  onClick() {},
  noOutline: false,
};

export default Star;
