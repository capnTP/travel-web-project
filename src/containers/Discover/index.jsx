// @flow
import React, { Component } from 'react';
// $FlowFixMe
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { translate, Trans, type TFunction } from 'react-i18next';
import { Grid, Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import ContentLoader from 'react-content-loader';
import gql from 'graphql-tag';

import WithWeather from '../../components/Weather';
import TourCard from '../../components/Cards/TourCard';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import queryString from '../../helpers/querystring';
import SeoHelper from '../../components/SeoHelper';
import Carousal from '../../components/Carousel';
import CityCard from '../../components/Cards/City';
import smoothScroll from '../../helpers/smoothScroller';
import Select from '../../components/Select';

import style from './style.less';
import helper from './helper';
import CategoryTypeFilter from './CategoryTypeFilter';
import FilterModal from './FilterModal';
import discoverQuery from './queryDiscover.gql';
import cachesQuery from './queryCaches.gql';
import productPriceRangeQuery from './queryProductPriceRange.gql';

type SelectOption = {
  text: string,
  value: string,
};

type DiscoverObj = {
  city: {
    id?: string,
  },
  language: ?Object,
  recommended: Array<Object>,
  tours: Array<Object>,
  toursCount: number,
};

type Props = {
  cachesQuery: {
    categoryTypes: ?Array<Object>,
    countries: ?Array<Object>,
    features: ?Array<Object>,
    loading: boolean,
  },
  data: {
    discover: ?DiscoverObj,
    error: ?any,
    fetchMore: (obtion: Object) => Promise<any>,
    loading: boolean,
  },
  discoverToursCountQuery: {
    discoverToursCount: number,
    loading: boolean,
    refetch: (variables: { input: ?Object }) => Promise<any>,
  },
  history: {
    push: Function,
  },
  info: {
    currency: {
      code: string,
    },
    locale: string,
  },
  location: {
    pathname: string,
    search: string,
  },
  match: {
    params: {
      citySlug: string,
      lng: string,
      page: ?string,
    },
  },
  productPriceRangeQuery: {
    productPriceRange: {
      high: number,
      low: number,
    },
  },
  t: TFunction,
};

type State = {
  isOpenFilterModal: boolean,
  sticky: boolean,
  stickyFilterButton: boolean,
};

const SEARCH_KEYS_CONTAIN_ARRAY: string[] = [
  'categoryIds',
  'categoryTypeIds',
  'cityIds',
  'featureIds',
  'priceRange',
  'ratingRange',
];

const PRODUCTS_SORT_OPTIONS: SelectOption[] = [
  { text: 'Recommended', value: '' },
  { text: 'Rating', value: '1' },
  { text: 'Lowest price', value: '2' },
  { text: 'Promotions', value: '3' },
];

const getIsPromotionPage = (pathname: string): boolean => /^\/promotions/.test(pathname);

class Discover extends Component<Props, State> {
  currentPage: number = 0;

  state = {
    isOpenFilterModal: false,
    sticky: false,
    stickyFilterButton: false,
  };

  componentDidMount = () => {
    if (window) {
      window.addEventListener('scroll', this.onScroll);
    }
  };

  componentWillUnmount = () => {
    if (window) {
      window.removeEventListener('scroll', this.onScroll);
    }
  };

  onCategorySelect = value => {
    helper.mapToggleToQueryString({
      key: 'categoryTypeIds',
      props: this.props,
      value,
    });

    if (this.state.sticky && this.products) {
      const top = this.products.offsetTop;
      smoothScroll(top - 88, 500);
    }
  };

  onScroll = () => {
    if (window) {
      const y = window.scrollY;
      if (y <= 80) {
        if (this.state.sticky) {
          this.setState({
            sticky: false,
          });
        }
      } else if (y >= 80 && !this.state.sticky) {
        this.setState({
          sticky: true,
        });
      }
    }

    /** For sticky filter button when scroll pass */
    if (this.products) {
      const boundingClientRect = this.products.getBoundingClientRect();
      const scrollPassFilterButton = boundingClientRect.top - 80 < 0;

      if (scrollPassFilterButton) {
        this.setState(prevState => {
          if (!prevState.stickyFilterButton) {
            return {
              stickyFilterButton: true,
            };
          }
          return null;
        });
      } else {
        this.setState(prevState => {
          if (prevState.stickyFilterButton) {
            return {
              stickyFilterButton: false,
            };
          }
          return null;
        });
      }
    }
  };

  loadMore = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const { match: { params: { page = 1 } } = {}, data: { fetchMore } = {} } = this.props;
    const currentPage = this.currentPage || Number(page);

    const nextPage = currentPage + 1;

    if (!fetchMore) {
      return;
    }

    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        this.currentPage = nextPage;
        if (!fetchMoreResult) {
          return prev;
        }
        const { discover: savedDiscover } = prev;
        const { discover: { tours = [] } = {} } = fetchMoreResult;
        return Object.assign({}, prev, {
          discover: {
            ...fetchMoreResult.discover,
            tours: [...savedDiscover.tours, ...tours],
          },
        });
      },
      variables: {
        page: nextPage,
      },
    });
  };

  applyFilter = (params: Object): void => {
    const {
      location: { search },
      history: { push },
    } = this.props;

    const filters = queryString.parseWithArray(search, SEARCH_KEYS_CONTAIN_ARRAY);

    const newFilters = queryString.stringifyWithArray(
      {
        ...filters,
        ...params,
      },
      SEARCH_KEYS_CONTAIN_ARRAY,
    );
    push({
      search: newFilters,
    });
  };

  clearFilterButton = (hasQuery: boolean): null | typeof Button => {
    if (!hasQuery) {
      return null;
    }
    return (
      <Button
        onClick={() => {
          this.props.history.push({ search: '' });
        }}
      >
        <span className={classnames('icon icon-close', style.icon)} />
      </Button>
    );
  };

  products: ?HTMLElement;

  recommended: ?HTMLElement;

  render() {
    const { isOpenFilterModal } = this.state;
    const {
      cachesQuery: { categoryTypes, features, countries, loading: loadingCaches },
      productPriceRangeQuery: { productPriceRange = { high: 1000, low: 1 } },
      discoverToursCountQuery: { loading: loadingDiscoverToursCount, discoverToursCount },
      data: { loading, error, discover } = {},
      location: { pathname = '', search } = {},
      match: { params: { citySlug = '', page = '1' } } = {},
      info: { currency: { code } = {}, locale = '' },
      t,
    } = this.props;

    if (error) {
      console.error(error); // eslint-disable-line no-console
    }

    const urlPage = helper.toNumber(page || '');

    let tours;
    let recommended;
    const toursCount = discover ? discover.toursCount : 0;
    let city;
    let language;

    if (discover) {
      ({ tours, recommended, city, language } = discover);
    }

    let cityData: Object = {};
    if (language && city) {
      cityData = helper.getCityLocalization(language, city);
    }

    const DEFAULTS = {
      rating: { max: 5, min: 1 },
    };

    const queryStringObj = queryString.parseWithArray(search, SEARCH_KEYS_CONTAIN_ARRAY);
    const {
      categoryIds,
      categoryTypeIds,
      cityIds,
      countryId,
      featureIds,
      query,
      priceRange: priceValue = [
        Math.floor(productPriceRange.low),
        Math.ceil(productPriceRange.high),
      ],
      ratingRange: ratingValue = [DEFAULTS.rating.min, DEFAULTS.rating.max],
    } = queryStringObj;

    const hasQuery = Object.keys(queryStringObj).length > 0;
    const sort: string = queryStringObj.sort || '';
    const [, route = ''] = pathname.split('/');
    const cityPath = citySlug ? `/${citySlug}` : '';
    const isLastPage = helper.isLastPage(toursCount, this.currentPage || urlPage, 16);
    const nextPage = this.currentPage || urlPage;
    const isPromotionPage = getIsPromotionPage(pathname);
    const categoryTypeOptions = helper.getLocalization(language, categoryTypes);
    const showCategoryTypesFilter = !isPromotionPage && categoryTypeOptions.length > 1;

    return (
      <div className={style.main_container}>
        <SeoHelper
          description={t('seo.description')}
          isPublished
          keywords=""
          locale={locale}
          ogType="website"
          title={t('seo.title')}
        />

        {/* For SEO */}
        <h1
          style={{
            fontSize: '1px',
            height: 0,
            margin: 0,
            padding: 0,
            visibility: 'hidden',
            width: 0,
          }}
        >
          {t('seo.title')}
        </h1>

        {isPromotionPage && <h2 className={style.promo_tag}>{t('promotionTag')}</h2>}

        {showCategoryTypesFilter && (
          <div
            className={classnames(style.category_type_filter_wrapper, {
              [style.stick_to_top]: this.state.sticky,
            })}
          >
            <CategoryTypeFilter
              activeKeys={helper.toArray(categoryTypeIds)}
              categoryTypes={categoryTypeOptions}
              loading={loadingCaches}
              onSelectItem={this.onCategorySelect}
            />
          </div>
        )}

        {isOpenFilterModal && (
          <FilterModal
            categories={helper.getLocalization(language, helper.getCategoriesFromProps(this.props))}
            categoryIds={helper.toArray(categoryIds)}
            cityIds={cityIds || []}
            className={style.filter}
            countries={helper.getLocalization(language, countries, localizedCountries =>
              localizedCountries.map(c => {
                const mutable = { ...c };
                mutable.cities = helper.getLocalization(language, c.cities);
                return mutable;
              }),
            )}
            countryId={countryId || ''}
            currencyCode={code}
            featureIds={helper.toArray(featureIds)}
            features={helper.getLocalization(language, features)}
            hideLocationTab={!!city}
            loading={loadingDiscoverToursCount}
            onApply={arg => {
              this.applyFilter(arg);
              this.setState({ isOpenFilterModal: false });
            }}
            onChange={filter => {
              this.props.discoverToursCountQuery.refetch({ input: filter });
            }}
            onClose={() => {
              this.setState({ isOpenFilterModal: false });
            }}
            priceRange={priceValue.length ? priceValue.map(Number) : []}
            productPriceRange={productPriceRange}
            productsCount={discoverToursCount}
            query={query}
            ratingRange={ratingValue.length ? ratingValue.map(Number) : []}
            t={t}
          />
        )}

        <div>
          <div
            ref={node => {
              this.products = node;
            }}
            className={classnames(style.section_products, {
              [style.with_padding]: !isPromotionPage && this.state.sticky,
            })}
          >
            <ButtonGroup
              className={classnames(style.filter_button, {
                [style.sticky]: this.state.stickyFilterButton,
                [style.include_clear_button]: hasQuery,
              })}
            >
              {this.clearFilterButton(hasQuery)}

              <Button
                colorType="secondary"
                onClick={() => {
                  this.setState({ isOpenFilterModal: true });
                }}
              >
                <span className={classnames('icon icon-filter', style.icon)} />

                <span className={style.text}>{t('buttonLabelFilter')}</span>
              </Button>
            </ButtonGroup>

            <div className={style.products}>
              <div className={style.tool_bar}>
                <span
                  className={classnames(style.search_text_container, {
                    [style.hidden]: !query,
                  })}
                >
                  <Trans i18nKey="queryLabel">
                    {/* // $FlowFixMe */}
                    Searching for <strong>{{ query }}</strong>
                  </Trans>
                </span>

                <div className={style.sort_options}>
                  <span className={style.label}>Sort by</span>

                  {PRODUCTS_SORT_OPTIONS.map(p => {
                    const selected = p.value === sort;
                    return (
                      <Button
                        key={p.text}
                        colorType="secondary"
                        faded={!selected}
                        onClick={() => {
                          this.applyFilter({ sort: p.value });
                        }}
                        outlined
                      >
                        {p.text}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className={classnames({ [style.faded]: isOpenFilterModal })}>
                <Grid fluid>
                  <Row>
                    {tours &&
                      tours.map(item => (
                        <Col key={item.id} lg={3} md={6} sm={6} xl={3} xs={12}>
                          <TourCard translate={t} {...item} currency={code} />
                        </Col>
                      ))}

                    {loading &&
                      [1, 2, 3].map(num => (
                        <Col key={num} lg={3} md={6} sm={6} xl={3} xs={12}>
                          <div style={{ height: '420px', width: '270px' }}>
                            <ContentLoader
                              height={420}
                              primaryColor="#f3f3f3"
                              secondaryColor="#ecebeb"
                              speed={2}
                              width={270}
                            />
                          </div>
                        </Col>
                      ))}
                  </Row>
                </Grid>
              </div>

              {!loading && (!tours || tours.length === 0) && (
                <div className={style.no_tours_text}>
                  <h2>{t('noToursTitle')}</h2>

                  <p>{t('noToursP1')}</p>

                  <p>{t('noToursP2')}</p>
                </div>
              )}

              {isLastPage === false && (
                <div className={classnames(style.load_more, { [style.faded]: isOpenFilterModal })}>
                  <Link
                    onClick={this.loadMore}
                    rel="next"
                    to={`/${route}${cityPath}/${Number(nextPage) + 1}/${search}`}
                  >
                    <Button colorType="primary" loading={loading} outlined>
                      {t('buttonLabelLoadMore')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {!!cityData.id && (
              <div className={classnames(style.section_city, { [style.faded]: isOpenFilterModal })}>
                <span className={style.label}>
                  <Trans i18nKey="citySectionCopy">
                    {/* // $FlowFixMe */}
                    <span>What’s happening in {{ city: cityData.name }}? </span>
                    Find out what is taking place in {{ city: cityData.name }} at the moment
                  </Trans>
                </span>
                <WithWeather city={cityData.name} timezone={cityData.timezone}>
                  <CityCard {...cityData} />
                </WithWeather>
                <span className={style.section_title} data-title={cityData.name} />
              </div>
            )}

            {recommended && recommended.length > 0 && (
              <div
                ref={e => {
                  this.recommended = e;
                }}
                className={classnames(style.section_slider, { [style.faded]: isOpenFilterModal })}
              >
                <span className={style.label}>{t('recommendedSectionSubtitle')}</span>

                <Carousal
                  className={style.slider}
                  responsive={[
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToScroll: 1,
                        slidesToShow: 4,
                      },
                    },
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToScroll: 2,
                        slidesToShow: 2,
                      },
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToScroll: 2,
                        slidesToShow: 2,
                      },
                    },
                    {
                      breakpoint: 576,
                      settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                      },
                    },
                  ]}
                  slidesToScroll={1}
                  slidesToShow={4}
                >
                  {recommended.map(item => (
                    <TourCard translate={t} {...item} key={item.id} currency={code} />
                  ))}
                </Carousal>

                <span className={style.section_title} data-title={t('recommendedSectionTitle')} />
              </div>
            )}
          </div>
        </div>

        <div className={style.bottom_navigation}>
          <Select
            onChange={(event: SyntheticEvent<HTMLSelectElement>) => {
              this.applyFilter({ sort: event.currentTarget.value });
            }}
            rootClassName={style.sort_options}
            value={sort}
          >
            {PRODUCTS_SORT_OPTIONS.map(p => (
              <option key={p.value} value={p.value}>
                {p.text}
              </option>
            ))}
          </Select>

          <ButtonGroup className={style.filter_button}>
            {this.clearFilterButton(hasQuery)}

            <Button
              colorType="secondary"
              onClick={() => {
                this.setState({ isOpenFilterModal: true });
              }}
            >
              <span className={classnames('icon icon-filter', style.icon)} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(discoverQuery, {
    options: compProps => {
      const {
        location: { pathname, search } = {},
        match: { params: { citySlug = '', page = 1 } } = {},
      } = compProps;
      /** popup will be included sometimes,
       * it will cause an error in GraphQL
       *  */
      const { popup, ...input } = queryString.parseWithArray(search, SEARCH_KEYS_CONTAIN_ARRAY);

      input.citySlug = citySlug;
      input.promotionPage = getIsPromotionPage(pathname);

      /** Query params should not support in city page */
      if (citySlug) {
        delete input.query;
      }
      /** Ignore categoryTypeIds if categoryIds exist */
      if (input.categoryIds) {
        input.categoryTypeIds = null;
      }

      // $FlowFixMe
      return {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          input,
          page: Number(page),
        },
        withRef: true,
      };
    },
  }),
  graphql(
    gql`
      query discoverToursCountQuery($input: DiscoverInput) {
        discoverToursCount(input: $input)
      }
    `,
    {
      name: 'discoverToursCountQuery',
      options: (props: Props) => {
        const { location: { search } = {}, match: { params: { citySlug = '' } } = {} } = props;
        /** popup will be included sometimes,
         * it will cause an error in GraphQL.
         *  */
        const { popup, ...input } = queryString.parseWithArray(search, SEARCH_KEYS_CONTAIN_ARRAY);

        input.citySlug = citySlug;

        /** Query params should not support in city page */
        if (citySlug) {
          delete input.query;
        }
        /** Ignore categoryTypeIds if categoryIds exist */
        if (input.categoryIds) {
          input.categoryTypeIds = null;
        }

        return {
          fetchPolicy: 'cache-and-network',
          variables: {
            input,
          },
        };
      },
    },
  ),
  graphql(cachesQuery, {
    name: 'cachesQuery',
    options: props => {
      const { match } = props;
      const variables = {};

      /** CategoryTypes should be filtered by city */
      if (match && match.params) {
        const { citySlug } = match.params;

        if (citySlug) {
          variables.categoryTypesFilter = {
            city_slug: citySlug,
            order: 'order desc',
          };
        }
      }

      return {
        fetchPolicy: 'cache-first',
        variables,
      };
    },
  }),
  graphql(productPriceRangeQuery, {
    name: 'productPriceRangeQuery',
    options: () => ({
      fetchPolicy: 'cache-and-network',
    }),
  }),
)(translate(['discover', 'tourCard'])(Discover));
