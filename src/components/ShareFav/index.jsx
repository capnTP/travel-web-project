import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.less';

class ShareFav extends Component {
  render() {
    const {
      props: { share, addToFavorite, isFavorite, horizontal },
    } = this;

    const containerStyle = classNames(style.share_fav_container, {
      [style.horizontal]: horizontal,
    });
    // NOTE::: we dont have icon-heart that can be fill. ask for andrew for this icon;
    const favoriteStyle = classNames(`icon icon-heart ${style.icon_span} ${style.favorite}`, {
      [style.isFavorite]: isFavorite,
    });
    const shareStyle = classNames(`icon icon-share ${style.icon_span}`, {
      [style.share]: share,
    });
    return (
      <div className={containerStyle}>
        <span aria-hidden className={favoriteStyle} onClick={addToFavorite} role="button" />
        {share ? <span className={shareStyle} /> : null}
      </div>
    );
  }
}

ShareFav.propTypes = {
  isFavorite: PropTypes.bool,
  share: PropTypes.bool,
  addToFavorite: PropTypes.func,
  horizontal: PropTypes.bool,
};

ShareFav.defaultProps = {
  isFavorite: false,
  share: true, // default to true
  addToFavorite: () => {}, // HOC ,
  horizontal: false,
};

export default ShareFav;
