// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { translate, type TFunction } from 'react-i18next';

import SeoHelper from '../../components/SeoHelper';
import citiesQuery from '../../queries/cities/citiesList.gql';
import compose from '../../helpers/compose';
import CityCard from '../../components/Cards/City';

import style from './style.less';

type Props = {
  data: {
    cities: ?(Object[]),
  },
  info: {
    locale: string,
  },
  t: TFunction,
};

type State = {};

class Cities extends React.Component<Props, State> {
  render() {
    const {
      t,
      data,
      info: { locale = '' },
    } = this.props;

    const cities = data.cities || [];

    return (
      <div className={style.cities}>
        <SeoHelper
          description={t('seo_description')}
          isPublished
          keywords={t('seo_description')}
          locale={locale}
          ogType="website"
          title={t('seo_title')}
        />
        <div>
          {cities.map(item => (
            <div className={style.city_wrapper}>
              <CityCard {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(citiesQuery),
  translate('cities'),
  Cities,
);
