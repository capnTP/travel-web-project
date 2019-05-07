// @flow
import React from 'react';
import classnames from 'classnames';
import { type TFunction } from 'react-i18next';

import FilterToggle from '../../FilterToggle';
import Button from '../../../../components/Button';

import style from './style.less';

function renderToggle(
  active: boolean,
  image: string,
  itemKey: string,
  title: string,
  onClick: (value: any) => void,
) {
  if (!window || window.innerWidth > 720) {
    return (
      <FilterToggle active={active} img={image} itemKey={itemKey} onClick={onClick} title={title} />
    );
  }

  return (
    <Button
      colorType={active ? 'secondary' : ''}
      onClick={() => {
        if (onClick) {
          onClick(itemKey);
        }
      }}
    >
      {title}
    </Button>
  );
}

type City = {
  filterThumbnail: string,
  id: string,
  name: string,
};

type Country = {
  cities: City[],
  id: string,
  name: string,
  thumbnailUrl: string,
};

type Props = {
  activeCityIds: string[],
  activeCountryId: ?string,
  countries: Country[],
  onClear: () => void,
  onSelectCity: (value: string[]) => void,
  onSelectCountry: (value: string) => void,
  t: TFunction,
};

type State = {
  collapse: boolean,
};

class Location extends React.Component<Props, State> {
  state = {
    collapse: false,
  };

  render() {
    const { collapse } = this.state;
    const {
      activeCountryId,
      activeCityIds,
      countries,
      onSelectCountry,
      onSelectCity,
      onClear,
      t,
    } = this.props;

    return (
      <div className={style.location_container}>
        <div className={style.tool_bar}>
          <span className={style.title}>{t('tabLabelLocation')}</span>

          <button
            className={style.clear}
            onClick={() => {
              if (onClear) {
                onClear();
              }
            }}
            type="button"
          >
            {t('filter.clear')}
          </button>

          <div className={classnames(style.collapse_toggle, { [style.collapse]: collapse })}>
            <button
              onClick={() => {
                this.setState(prevState => ({
                  collapse: !prevState.collapse,
                }));
              }}
              type="button"
            >
              <span className={style.text}>
                {collapse ? t('filter.showSection') : t('filter.hideSection')}
              </span>
              <span className={classnames('icon icon-arrow-up', style.icon)} />
            </button>
          </div>
        </div>

        {(!collapse || (collapse && activeCountryId)) && (
          <div className={style.list}>
            <p className={style.title}>{t('filter.countries')}</p>

            <ul>
              {countries
                .filter(({ id }) => {
                  if (!collapse) {
                    return true;
                  }

                  return activeCountryId === id;
                })
                .map(item => (
                  <li key={item.id}>
                    {renderToggle(
                      item.id === activeCountryId,
                      item.thumbnailUrl,
                      item.id,
                      item.name,
                      onSelectCountry,
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {(!collapse || (collapse && activeCityIds && activeCityIds.length > 0)) && (
          <div className={style.list}>
            <p className={style.title}>{t('filter.cities')}</p>

            <ul>
              {countries
                .filter(country => {
                  if (!activeCountryId) {
                    return true;
                  }

                  return country.id === activeCountryId;
                })
                .reduce((acc, val) => [...acc, ...val.cities], [])
                .filter(({ id }) => {
                  if (!collapse) {
                    return true;
                  }

                  return activeCityIds.indexOf(id) > -1;
                })
                .map(item => (
                  <li key={item.id}>
                    {renderToggle(
                      activeCityIds.indexOf(item.id) > -1,
                      item.filterThumbnail,
                      item.id,
                      item.name,
                      onSelectCity,
                    )}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Location;
