import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Map from '../../Map';
import Hr from '../Hr';

import style from './style.less';

class Direction extends React.Component {
  render() {
    const { productRef, isHidden, locations = [], hideTitle, t } = this.props;
    return locations.length ? (
      <div ref={productRef} className={`${style.direction} ${!isHidden ? style.hide : ''}`}>
        <Helmet>
          <noscript>{`<style>
        .${style.direction}:after{
         content:${t('turn on your javascript to check locations.')};
         margin-top: -18px;
         display: block;
       }
       .${style.direction} *{
          display:none !important;
         }
       </style>`}</noscript>
        </Helmet>
        {!hideTitle && <span className={style.location_text}>{t('location')}</span>}
        <div className={style.map}>
          <Map latlng={locations.map(item => [item.latitude, item.longitude])} zoom={12} />
          <div className={style.direction_content}>
            <ul>
              {locations.map(item => (
                <li key={item.title}>
                  <div>
                    <span className={`icon icon-map-pin ${style.icons}`} />
                  </div>
                  <div>
                    <span className={style.title}>{item.title}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {!hideTitle && <Hr />}
      </div>
    ) : null;
  }
}

Direction.propTypes = {
  productRef: PropTypes.func,
  isHidden: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.object),
  hideTitle: PropTypes.bool,
  t: PropTypes.func,
};

Direction.defaultProps = {
  productRef: () => {},
  isHidden: true,
  locations: [],
  hideTitle: false,
  t() {},
};

export default Direction;
