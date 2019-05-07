// @flow
import React from 'react';
import classnames from 'classnames';
import ContentLoader from 'react-content-loader';

import style from './style.less';

type Props = {
  active?: boolean,
  img: string,
  itemKey: string,
  loading?: boolean,
  onClick?: (itemKey: string) => void,
  subtitle?: string,
  title: string,
};

const FilterToggle = ({ img, title, subtitle, onClick, active, itemKey, loading }: Props) => {
  if (loading) {
    return (
      <div className={classnames(style.filter_toggle, style.loading)}>
        <ContentLoader
          height={420}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          speed={2}
          width={270}
        />
      </div>
    );
  }

  return (
    <div
      className={classnames(style.filter_toggle, {
        [style.active]: active,
      })}
      onClick={() => {
        if (onClick) {
          onClick(itemKey);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {img && (
        <div
          className={classnames(style.img_container, {
            [style.active]: active,
          })}
        >
          <img alt={title} role="presentation" src={img} />
        </div>
      )}

      <div className={style.text_container}>
        <div className={style.title}>{title}</div>

        {subtitle && <div className={style.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
};

FilterToggle.defaultProps = {
  active: false,
  loading: false,
  onClick() {},
  subtitle: '',
};

export default FilterToggle;
