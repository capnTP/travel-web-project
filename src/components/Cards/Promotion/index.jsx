// @flow
import * as React from 'react';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import ShareFav from '../../ShareFav';

import style from './style.less';

type Props = {
  active?: boolean,
  city?: ?{
    name?: string,
  },
  color?: '' | 'blue' | 'yellow',
  discountPercentage?: number,
  images?: ?Array<{
    small: string,
    thumb: string,
  }>,
  isLoading?: boolean,
  name?: string,
  shareFav?: boolean,
};

type State = {};

class Promotion extends React.Component<Props, State> {
  static defaultProps = {
    active: false,
    color: '',
    isLoading: false,
    discountPercentage: 0,
    name: '',
    images: [],
    city: {},
    shareFav: true,
  };

  render() {
    const { active, color, isLoading, discountPercentage, name, shareFav = true } = this.props;

    const images = this.props.images || [];
    const city = this.props.city || {};
    const cityName = city.name;

    const divClass = classNames(style.promo_card, color ? style[color] : '', {
      [style.isActive]: active,
    });

    if (isLoading) {
      return (
        <ContentLoader className={divClass} preserveAspectRatio="none">
          <rect height="100%" rx="0" ry="0" width="100%" x="0" y="0" />
        </ContentLoader>
      );
    }

    return (
      <div className={divClass}>
        {images[0] && images[0].small && (
          <img alt={name} data-base={images[0].small} src={images[0].thumb} />
        )}

        {shareFav && <ShareFav />}

        <div className={style.promo_bottom}>
          <div className={style.promo_info}>
            <span className={style.up_to}>up to</span>
            <span>
              <span className={style.discount}>{parseInt(discountPercentage, 10)}</span>
              <sup>%</sup>
              <span className={style.off}>off</span>
            </span>
            <span className={style.tour_type}>Tours in {cityName}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Promotion;
