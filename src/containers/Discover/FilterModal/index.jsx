// @flow
import * as React from 'react';
import classnames from 'classnames';
import { type TFunction } from 'react-i18next';

import Button from '../../../components/Button';
import RangeSlider from '../../../components/Input/RangeSlider';
import debounce from '../../../helpers/debounce';

import style from './style.less';
import Toggles from './Toggles';
import Location from './Location';

type FilterStateEnum =
  | 'priceRange'
  | 'ratingRange'
  | 'categoryIds'
  | 'featureIds'
  | 'cityIds'
  | 'countryId';

type ToggleItem = {
  id: string,
  name: string,
};

type State = {
  categoryIds: string[],
  cityIds: string[],
  countryId: string,
  featureIds: string[],
  priceRange: number[],
  query: string,
  ratingRange: number[],
};

type Props = {
  categories: ToggleItem[],
  categoryIds: string[],
  cityIds: string[],
  className?: string,
  countries: Object[],
  countryId: string,
  currencyCode: string,
  featureIds: string[],
  features: ToggleItem[],
  hideLocationTab: boolean,
  loading?: boolean,
  onApply: (arg: State) => void,
  onChange: (arg: State) => void,
  onClose?: Function,
  priceRange: number[],
  productPriceRange: {
    high: number,
    low: number,
  },
  productsCount: number,
  query: string,
  ratingRange: number[],
  t: TFunction,
};

class FilterModal extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    loading: false,
    onClose() {},
    onTabChange() {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      priceRange: props.priceRange,
      ratingRange: props.ratingRange,
      categoryIds: props.categoryIds,
      featureIds: props.featureIds,
      cityIds: props.cityIds,
      countryId: props.countryId,
      query: props.query,
    };
  }

  componentDidMount() {
    this.props.onChange(this.state);
  }

  onChangeWithDebounce = debounce(this.props.onChange, 1000, false);

  setFilterState = (key: FilterStateEnum, value: any): void => {
    this.setState({ [key]: value }, () => {
      this.onChangeWithDebounce(this.state);
    });
  };

  scrollTo = (domRef: ?HTMLDivElement) => {
    if (domRef) {
      domRef.scrollIntoView({ behavior: 'smooth' });
    }
  };

  slidersTab: ?HTMLDivElement;

  locationTab: ?HTMLDivElement;

  categoriesTab: ?HTMLDivElement;

  featuresTab: ?HTMLDivElement;

  render() {
    const { featureIds, categoryIds, priceRange, ratingRange, cityIds, countryId } = this.state;
    const {
      className,
      loading,
      onClose,
      productsCount,
      categories,
      t,
      features,
      productPriceRange,
      currencyCode,
      countries,
      hideLocationTab,
    } = this.props;

    return (
      <div
        className={classnames(style.filter_modal, className || '')}
        onClick={onClose}
        role="presentation"
      >
        <div
          className={style.body}
          onClick={(event: SyntheticEvent<HTMLDivElement>) => {
            event.stopPropagation();
          }}
          role="presentation"
        >
          <div className={style.tool_bar}>
            <a
              className={style.clear}
              onClick={() => {
                this.setState(
                  {
                    priceRange: [],
                    ratingRange: [],
                    categoryIds: [],
                    featureIds: [],
                    cityIds: [],
                    countryId: '',
                    query: '',
                  },
                  () => {
                    this.onChangeWithDebounce(this.state);
                  },
                );
              }}
              role="button"
              tabIndex="0"
            >
              {t('filter.clearFilters')}
            </a>

            <button className={style.close_modal} onClick={onClose} type="button">
              <i className="icon-close" />
            </button>
          </div>

          <div className={style.tab_header}>
            <div className={style.tab_buttons}>
              {[
                {
                  name: 'Price',
                  title: t('tabLabelPriceRange'),
                  componentRef: this.slidersTab,
                  hidden: false,
                },
                {
                  name: 'Rating',
                  title: t('tabLabelRatings'),
                  componentRef: this.slidersTab,
                  hidden: false,
                },
                {
                  name: 'Location',
                  title: t('tabLabelLocation'),
                  componentRef: this.locationTab,
                  hidden: hideLocationTab,
                },
                {
                  name: 'Categories',
                  title: t('tabLabelCategories'),
                  componentRef: this.categoriesTab,
                  hidden: false,
                },
                {
                  name: 'Features',
                  title: t('tabLabelFeatures'),
                  componentRef: this.featuresTab,
                  hidden: false,
                },
              ]
                .filter(x => !x.hidden)
                .map(tab => (
                  <Button
                    key={tab.name}
                    colorType="secondary"
                    onClick={() => {
                      this.scrollTo(tab.componentRef);
                    }}
                    outlined
                    type="button"
                  >
                    {tab.title || tab.name}
                  </Button>
                ))}
            </div>
          </div>

          <div className={style.tabs}>
            <div
              ref={node => {
                this.slidersTab = node;
              }}
              className={style.tab_body}
            >
              <div className={style.sliders}>
                <div>
                  <RangeSlider
                    defaultValue={priceRange.length ? priceRange.map(Number) : ''}
                    getValue={value => {
                      this.setFilterState('priceRange', value);
                    }}
                    max={Math.ceil(productPriceRange.high)}
                    min={Math.floor(productPriceRange.low)}
                    title={t('sliderLabelPriceRange')}
                    valuePostfix={currencyCode}
                  />
                </div>

                <div>
                  <RangeSlider
                    defaultValue={ratingRange.length ? ratingRange.map(Number) : ''}
                    getValue={value => {
                      this.setFilterState('ratingRange', value);
                    }}
                    max={5}
                    min={1}
                    title={t('sliderLabelRatings')}
                    valuePostfix={t('sliderUnitRatings')}
                  />
                </div>
              </div>
            </div>

            <div
              ref={node => {
                this.locationTab = node;
              }}
              className={style.tab_body}
            >
              <Location
                activeCityIds={cityIds}
                activeCountryId={countryId}
                clearButtonLabel=""
                countries={countries}
                onClear={() => {
                  this.setFilterState('cityIds', []);
                  this.setFilterState('countryId', '');
                }}
                onSelectCity={value => {
                  let ids = [...cityIds];
                  if (ids.indexOf(value) > -1) {
                    ids = ids.filter(i => i !== value);
                  } else {
                    ids.push(value);
                  }
                  this.setFilterState('cityIds', ids);
                }}
                onSelectCountry={value => {
                  let id = value;

                  /** Toggle behavior */
                  if (countryId === value) {
                    id = '';
                  }

                  this.setFilterState('countryId', id);
                }}
                t={t}
              />
            </div>

            <div
              ref={node => {
                this.categoriesTab = node;
              }}
              className={style.tab_body}
            >
              <Toggles
                list={categories}
                onChange={v => {
                  this.setFilterState('categoryIds', v);
                }}
                onClear={() => {
                  this.setFilterState('categoryIds', []);
                }}
                selectedIds={categoryIds}
                t={t}
                title={t('tabBodyTitleCategories')}
              />
            </div>

            <div
              ref={node => {
                this.featuresTab = node;
              }}
              className={style.tab_body}
            >
              <Toggles
                list={features}
                onChange={v => {
                  this.setFilterState('featureIds', v);
                }}
                onClear={() => {
                  this.setFilterState('featureIds', []);
                }}
                selectedIds={featureIds}
                t={t}
                title={t('tabBodyTitleFeatures')}
              />
            </div>
          </div>

          <div className={style.apply_button_container}>
            <Button
              colorType="primary"
              fullWidth
              loading={loading}
              onClick={() => this.props.onApply(this.state)}
            >
              {t('filter.applyButtonLabel', { productsCount })}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterModal;
