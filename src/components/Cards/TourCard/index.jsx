// @flow
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import type { TFunction } from 'react-i18next';

// import Button from '../../Button';
import Star from '../../Forms/Star';
import { formatCurrency } from '../../../helpers/currencyFormatter';
import stringHelper from '../../../helpers/string';

import style from './style.less';

type Image = {
  alt: string,
  raw: string,
  thumb: string,
};

type Props = {
  city?: string,
  currency: string,
  discount?: number,
  image?: Image,
  isActive?: boolean,
  isActive?: boolean,
  name: string,
  rating: ?number,
  slug: string,
  startingPrice: number,
  translate: TFunction,
};

type State = {
  isActive?: boolean,
};

class TourCard extends React.Component<Props, State> {
  static defaultProps = {
    isActive: false,
    city: '',
    image: {
      raw: '',
      thumb: '',
      alt: '',
    },
  };

  constructor(props: Props) {
    super(props);
    const { isActive } = props;
    this.state = { isActive };
  }

  onMouseOver = () => {
    this.setState({
      isActive: true,
    });
  };

  onMouseOut = () => {
    this.setState({
      isActive: false,
    });
  };

  render() {
    const {
      rating = 0,
      slug,
      name,
      city,
      startingPrice: discountedPrice,
      image: { raw: imageSrc, thumb: thumbSrc, alt } = {},
      currency,
      translate = key => key,
    } = this.props;
    let { discount } = this.props;
    const { isActive } = this.state;

    if (!discount) {
      discount = 0;
    }

    /** starting price is a discounted price
     * so we have to use discount revert it back to starting price */
    // const startingPrice = (discountedPrice * ((100 + discount) / 100)).toFixed(2).toString();
    const formattedDiscountedPrice = formatCurrency(currency, discountedPrice);
    // const formattedStartingPrice = formatCurrency(currency, startingPrice);

    return (
      <div
        className={classnames(style.tour_card, {
          [style.active]: isActive,
        })}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <Link
          className={classnames('CTA_product', style.product_name)}
          target="_blank"
          to={`/discover/${slug}/`}
        >
          <div className={style.img_wrapper}>
            {imageSrc && <img alt={alt} data-base={imageSrc} src={thumbSrc} />}
            {discount > 0 ? (
              <div className={style.discount_wrapper}>
                <div className={style.box}>
                  <div className={style.un_skew}>
                    <span>Up to</span>
                    <div>
                      <span>
                        {parseInt(discount, 10)}
                        <sup>%</sup>
                      </span>
                      <span>off</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className={style.info_wrapper}>
            <Star rating={rating} readOnly />
            <div className={style.desc}>{stringHelper.padEnd(name, 60, '...')}</div>
            <div className={style.location}>
              <i className="icon-marker icon" />
              <span>{city}</span>
            </div>
          </div>

          <div className={style.price_wrapper}>
            <div className={style.visible_price}>
              <div className={style.un_skew}>
                <div className={style.label}>{translate('tourCard:priceLabel')}</div>
                <div className={style.price}>
                  {formattedDiscountedPrice} <span>{currency}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

TourCard.defaultProps = {
  discount: 0,
  image: {
    raw: '',
    thumb: '',
    alt: '',
  },
};

export default TourCard;
