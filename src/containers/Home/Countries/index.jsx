// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { type TFunction } from 'react-i18next';
import classnames from 'classnames';

import style from './style.less';

type Props = {
  countries: Array<{ id: string, mainImage: string, name: string, thumbnailUrl: string }>,
  loadImages: boolean,
  translate: TFunction,
};

const Countries = (props: Props) => {
  const { countries = [], translate: t, loadImages } = props;
  return (
    <div className={style.countries_component}>
      <div className={style.title_tag}>
        <span>{t('where to go')}</span>
        <span>{t('our standout')}</span>
      </div>

      <div className={style.countries}>
        {countries.map(({ id, name, mainImage }) => (
          <Link
            key={id}
            className={classnames('CTA_country', style.cards)}
            target="_self"
            to={{
              pathname: '/discover',
              search: `?countryId=${id}`,
            }}
          >
            {mainImage && <img alt={name} src={loadImages ? mainImage : ''} />}

            <div className={style.country}>
              <span>{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Countries;
