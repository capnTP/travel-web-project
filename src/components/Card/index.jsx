import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import GetWidth from '../GetWidth';

import style from './style.less';
import helper from './helper';

class Card extends React.Component {
  render() {
    const { thumbnailUrl, thumbnailAlt, content, className, expansion, showExpansion } = this.props;

    return (
      <GetWidth>
        {({ width }) => {
          const size = helper.getSize(width);

          return (
            <div
              className={classnames(style.Component, style[size], className, {
                [style.with_thumbnail]: !!thumbnailUrl,
              })}
            >
              {thumbnailUrl && (
                <div className={style.thumbnail_wrapper}>
                  <img alt={thumbnailAlt} src={thumbnailUrl} />
                </div>
              )}

              <div className={style.content}>{content({ width })}</div>

              {showExpansion && expansion && (
                <div className={style.expansion}>{expansion({ width })}</div>
              )}
            </div>
          );
        }}
      </GetWidth>
    );
  }
}

Card.propTypes = {
  thumbnailAlt: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  content: PropTypes.func.isRequired,
  className: PropTypes.string,
  expansion: PropTypes.func,
  showExpansion: PropTypes.bool,
};

Card.defaultProps = {
  thumbnailAlt: '',
  thumbnailUrl: '',
  className: '',
  expansion: null,
  showExpansion: false,
};

export default Card;
