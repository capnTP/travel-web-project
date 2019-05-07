import React from 'react';
import PropTypes from 'prop-types';

// import { I18n } from 'react-redux-i18n';
import Hr from '../Hr';

import style from './style.less';

const Overview = ({ productRef, isHidden, shortDescription, details, t, subView }) =>
  shortDescription || details.length ? (
    <div
      ref={productRef}
      className={`${style.product_overview} ${!isHidden ? style.hide : style.no_margin}`}
      id="overview"
    >
      {shortDescription && (
        <React.Fragment>
          <div className={style.info}>
            <span
              dangerouslySetInnerHTML={{
                __html: shortDescription,
              }}
            />
          </div>
          <Hr />
        </React.Fragment>
      )}
      <div className={style.overview_info}>
        <ul>
          {details
            .filter(item => {
              if (item.name === 'address' || item.name === 'telephone') {
                return null;
              }
              return item;
            })
            .map(item => (
              <li key={item.name}>
                <span>{t(item.name)}: </span>
                <span>{item.text}</span>
              </li>
            ))}
        </ul>
      </div>
      {!subView && <Hr />}
    </div>
  ) : null;

Overview.propTypes = {
  productRef: PropTypes.func,
  isHidden: PropTypes.bool,
  shortDescription: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func,
  subView: PropTypes.bool,
};

Overview.defaultProps = {
  productRef: () => {},
  isHidden: true,
  details: [],
  shortDescription: '',
  t() {},
  subView: false,
};

export default Overview;
