import React from 'react';
import PropTypes from 'prop-types';

import style from './style.less';

const ImageCard = ({
  isDiscounted,
  offer,
  image = '',
  height,
  mobile,
  showButton,
  hide,
  onOpenGallery,
  productRef,
  t,
}) =>
  !hide ? (
    <div ref={productRef} className={style.image_card}>
      {isDiscounted ? (
        <div className={style.discount_container}>
          <div className={style.discount_banner}>
            <span>{offer}</span>
          </div>
        </div>
      ) : null}
      <div
        className={`${style.image} ${mobile ? style.alignBottomLeft : null}`}
        style={{
          height: `${height}vh`,
          backgroundImage: `url(${image})`,
        }}
      >
        {/* <img alt={alt} className={style.image_card} src={image} /> */}
        {showButton && (
          <button onClick={onOpenGallery} type="button">
            {t('open gallery')}
          </button>
        )}
      </div>
    </div>
  ) : null;

ImageCard.propTypes = {
  isDiscounted: PropTypes.bool,
  offer: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.number,
  mobile: PropTypes.bool,
  showButton: PropTypes.bool,
  hide: PropTypes.bool,
  onOpenGallery: PropTypes.func,
  // alt: PropTypes.string,
  productRef: PropTypes.func,
  t: PropTypes.func,
};

ImageCard.defaultProps = {
  isDiscounted: false,
  offer: 'Special Offer',
  image: '',
  height: 252,
  mobile: false,
  showButton: true,
  hide: false,
  onOpenGallery: () => {},
  // alt: '',
  productRef: () => {},
  t: () => {},
};

export default ImageCard;
