// @flow
import * as React from 'react';
// $FlowFixMe
import { graphql, Query, type QueryRenderProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { translate, type TFunction } from 'react-i18next';
import VisibilitySensor from 'react-visibility-sensor';
import gql from 'graphql-tag';

import SearchBar from '../../components/SearchBar';
import WithWeather from '../../components/Weather';
import Carousel from '../../components/Carousel';
import City from '../../components/Cards/City';
import Promotion from '../../components/Cards/Promotion';
import TourCard from '../../components/Cards/TourCard';
import Review from '../../components/Cards/Review';
import SeoHelper from '../../components/SeoHelper';
import compose from '../../helpers/compose';
import isServer from '../../helpers/isServer';

import style from './style.less';
import Experience from './Experience';
import Slider from './Slider';
import Countries from './Countries';
import BookingInfo from './BookInfo';
import Blog from './Blog';

type Props = {
  clientQuery: {
    categoryTypes: ?(Object[]),
    homePageFeed: ?(Object[]),
    loading: boolean,
  },
  info: {
    currency: {
      code: string,
    },
    locale: string,
    setContext: ?(value: any) => void,
  },
  serverQuery: {
    countries: ?(Object[]),
  },
  t: TFunction,
};

type State = {
  isCountriesSectionVisible: boolean,
  isExperienceSectionVisible: boolean,
  isShowBlogsSection: boolean,
  isShowBookingInfoSection: boolean,
  isShowCitiesSection: boolean,
  isShowLatestReviewsSection: boolean,
  isShowNewProductsSection: boolean,
  isShowPromotionsSection: boolean,
};

class Home extends React.Component<Props, State> {
  state = {
    isCountriesSectionVisible: false,
    isExperienceSectionVisible: false,
    isShowBlogsSection: false,
    isShowPromotionsSection: false,
    isShowNewProductsSection: false,
    isShowBookingInfoSection: false,
    isShowCitiesSection: false,
    isShowLatestReviewsSection: false,
  };

  componentDidMount() {
    if (document && document.body) {
      document.body.classList.remove('softLanding');
    }

    if (this.searchEl) {
      const { info: { setContext } = {} } = this.props;
      if (setContext) {
        setContext({ searchElement: this.searchEl });
      }
    }
  }

  componentWillUnmount() {
    const { info: { setContext } = {} } = this.props;
    if (setContext) {
      setContext({ searchElement: {} });
    }
  }

  searchEl: ?HTMLElement;

  render() {
    const {
      isShowBookingInfoSection,
      isShowBlogsSection,
      isShowPromotionsSection,
      isShowNewProductsSection,
      isShowCitiesSection,
      isShowLatestReviewsSection,
      isExperienceSectionVisible,
      isCountriesSectionVisible,
    } = this.state;
    const {
      serverQuery,
      clientQuery,
      info: {
        currency: { code },
        locale,
      },
      t,
    } = this.props;

    const countries = serverQuery.countries || [];
    const loading = clientQuery.loading;
    const categoryTypes = clientQuery.categoryTypes || [];
    const homePageFeed = clientQuery.homePageFeed || [];

    const isOnServerSide = isServer();

    return (
      <div className={style.home}>
        <SeoHelper
          description={t('seo_description')}
          isPublished
          keywords=""
          locale={locale}
          ogType="website"
          title={t('seo_title')}
        />

        <div className={style.home_cover}>
          <div
            ref={node => {
              if (node) {
                this.searchEl = node;
              }
            }}
            className={style.search}
          >
            <span>{t('title_tag')}</span>
            <SearchBar />
          </div>
          <Slider images={homePageFeed} />
        </div>

        <VisibilitySensor
          key="home-section-countries"
          active={!isCountriesSectionVisible}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isCountriesSectionVisible: true });
            }
          }}
          partialVisibility
        >
          <Countries countries={countries} loadImages={isCountriesSectionVisible} translate={t} />
        </VisibilitySensor>

        <VisibilitySensor
          key="home-section-experience"
          active={!isExperienceSectionVisible}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isExperienceSectionVisible: true });
            }
          }}
          partialVisibility
        >
          <div className={style.locations}>
            <Experience
              category={categoryTypes}
              loadImages={isExperienceSectionVisible}
              translate={t}
            />
          </div>
        </VisibilitySensor>

        <VisibilitySensor
          key="home-section-promotions"
          active={!isShowPromotionsSection}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isShowPromotionsSection: true });
            }
          }}
          partialVisibility
        >
          <div className={style.promotions}>
            <div className={style.title_tag}>
              <span>{t('whats on offer')}</span>
              <span>{t('we are lossing')}</span>
            </div>

            {isShowPromotionsSection && (
              <Query
                query={gql`
                  {
                    tourPromotion {
                      id
                      name
                      slug
                      discountPercentage
                      images {
                        raw
                        thumb
                        small
                      }
                      city {
                        id
                        name
                      }
                    }
                  }
                `}
              >
                {({
                  loading: loadingPromotions,
                  error,
                  data,
                }: QueryRenderProps<{ tourPromotion: ?(Object[]) }, {}>) => {
                  if (loadingPromotions) {
                    return <strong>Loading ...</strong>;
                  }

                  if (error) {
                    return <strong>Can not load promotions {JSON.stringify(error)}</strong>;
                  }

                  const promotions = (!!data && data.tourPromotion) || [];

                  return (
                    <Carousel
                      activeCurrent
                      activeOnClick
                      arrows
                      className={style.slider_promotions}
                      infinite
                      responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                        { breakpoint: 768, settings: { slidesToScroll: 1, slidesToShow: 1 } },
                        {
                          breakpoint: 576,
                          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
                        },
                        {
                          breakpoint: 320,
                          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
                        },
                      ]}
                      slidesToScroll={1}
                      slidesToShow={1}
                    >
                      {promotions.map(item => (
                        <Link
                          key={item.id}
                          className={style.card}
                          target="_self"
                          to={{
                            pathname: '/promotions',
                            search: `?cityIds=${item.city.id}`,
                          }}
                        >
                          <Promotion {...item} isLoading={loading} shareFav={false} />
                        </Link>
                      ))}
                    </Carousel>
                  );
                }}
              </Query>
            )}
          </div>
        </VisibilitySensor>

        {!isOnServerSide && (
          <VisibilitySensor
            key="home-section-cities"
            active={!isShowCitiesSection}
            delayedCall
            intervalCheck
            onChange={(isVisible: boolean) => {
              if (isVisible) {
                this.setState({ isShowCitiesSection: true });
              }
            }}
            partialVisibility
          >
            <div className={style.countries}>
              <div className={style.see_all}>
                <Link className="CTA_city" rel="noopener noreferrer" target="blank" to="/cities/">
                  {t('see all')} <span className="icon icon-arrow-right-thin" />
                </Link>
              </div>

              {isShowCitiesSection && (
                <Carousel
                  arrows
                  className={style.slider}
                  infinite
                  responsive={[
                    { breakpoint: 1200, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                    {
                      breakpoint: 576,
                      settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
                    },
                  ]}
                  slidesToScroll={1}
                  slidesToShow={1}
                >
                  {countries.map(({ cities }) =>
                    cities.map(item => (
                      <WithWeather key={item.id} city={item.slug} timezone={item.timezone}>
                        <City {...item} />
                      </WithWeather>
                    )),
                  )}
                </Carousel>
              )}
            </div>
          </VisibilitySensor>
        )}

        <VisibilitySensor
          key="home-section-new-products"
          active={!isShowNewProductsSection}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isShowNewProductsSection: true });
            }
          }}
          partialVisibility
        >
          <div className={style.new_products}>
            <div className={style.title_tag}>
              <span>{t('whats new')}</span>
              <span>{t('discover our latest')}</span>
            </div>

            {isShowNewProductsSection && (
              <Query
                query={gql`
                  {
                    newTours {
                      tours {
                        id
                        slug
                        startingPrice
                        cityId
                        city
                        rating
                        discount
                        name
                        sortDescription
                        seo {
                          title
                          description
                          keywords
                          schema
                        }
                        features
                        image {
                          alt
                          raw
                          small
                          thumb
                        }
                      }
                    }
                  }
                `}
              >
                {({
                  loading: loadingNewProducts,
                  error,
                  data,
                }: QueryRenderProps<{ newTours: ?{ tours: ?(Object[]) } }, {}>) => {
                  if (loadingNewProducts) {
                    return <strong>Loading ...</strong>;
                  }

                  if (error) {
                    return <strong>Can not load new products {JSON.stringify(error)}</strong>;
                  }

                  const newProducts = (!!data && !!data.newTours && data.newTours.tours) || [];

                  return (
                    <Carousel
                      arrows
                      className={style.slider}
                      infinite
                      responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                        { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        {
                          breakpoint: 576,
                          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
                        },
                      ]}
                      slidesToScroll={1}
                      slidesToShow={4}
                    >
                      {newProducts.map(item => (
                        <TourCard translate={t} {...item} currency={code} />
                      ))}
                    </Carousel>
                  );
                }}
              </Query>
            )}
          </div>
        </VisibilitySensor>

        {!isOnServerSide && (
          <VisibilitySensor
            key="home-section-booking-info"
            active={!isShowBookingInfoSection}
            delayedCall
            intervalCheck
            onChange={(isVisible: boolean) => {
              if (isVisible) {
                this.setState({ isShowBookingInfoSection: true });
              }
            }}
            partialVisibility
          >
            <div className={style.bookingInfo}>
              {isShowBookingInfoSection && <BookingInfo translate={t} />}
            </div>
          </VisibilitySensor>
        )}

        <VisibilitySensor
          key="home-section-latest-reviews"
          active={!isShowLatestReviewsSection}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isShowLatestReviewsSection: true });
            }
          }}
          partialVisibility
        >
          <div className={style.reviews}>
            <div className={style.title_tag}>
              <span>{t('what are they saying')}</span>
              <span>{t('latest reviews')}</span>
            </div>

            {isShowLatestReviewsSection && (
              <Query
                query={gql`
                  {
                    topRatedProducts {
                      id
                      tours {
                        name
                        slug
                        city
                        discount
                        startingPrice
                        image {
                          raw
                          thumb
                          small
                          alt
                        }
                      }
                      reviews {
                        reviewerName
                        rating
                        nationalityFlag
                        reviewDescription
                      }
                    }
                  }
                `}
              >
                {({
                  loading: loadingTopRatedProducts,
                  error,
                  data,
                }: QueryRenderProps<{ topRatedProducts: ?(Object[]) }, {}>) => {
                  if (loadingTopRatedProducts) {
                    return <strong>Loading ...</strong>;
                  }

                  if (error) {
                    return <strong>Can not load latest reviews {JSON.stringify(error)}</strong>;
                  }

                  const topRatedProducts = (!!data && data.topRatedProducts) || [];

                  return (
                    <Carousel
                      arrows
                      className={style.slider_reviews}
                      infinite
                      responsive={[
                        { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                        { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        {
                          breakpoint: 576,
                          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
                        },
                      ]}
                      slidesToScroll={1}
                      slidesToShow={2}
                    >
                      {topRatedProducts.map(item => (
                        <div key={item.id} className={style.card}>
                          <Review
                            {...item.reviews}
                            currency={code}
                            isLoading={loading}
                            tour={item.tours}
                            translate={t}
                          />
                        </div>
                      ))}
                    </Carousel>
                  );
                }}
              </Query>
            )}
          </div>
        </VisibilitySensor>

        <VisibilitySensor
          key="home-section-blogs"
          active={!isShowBlogsSection}
          delayedCall
          intervalCheck
          onChange={(isVisible: boolean) => {
            if (isVisible) {
              this.setState({ isShowBlogsSection: true });
            }
          }}
          partialVisibility
        >
          <div className={style.blog}>
            {isShowBlogsSection && (
              <Query
                query={gql`
                  {
                    blog {
                      title
                      url
                      content
                      image {
                        raw
                        thumb
                      }
                    }
                  }
                `}
              >
                {({
                  loading: loadingBlogs,
                  data,
                  error,
                }: QueryRenderProps<{ blog: ?(Object[]) }, {}>) => {
                  if (loadingBlogs) {
                    return <strong>Loading ...</strong>;
                  }

                  if (error) {
                    return <strong>Can not load blogs {JSON.stringify(error)}</strong>;
                  }

                  const blogs = (!!data && data.blog) || [];
                  return <Blog blogs={blogs} translate={t} />;
                }}
              </Query>
            )}
          </div>
        </VisibilitySensor>
      </div>
    );
  }
}

export default compose(
  translate(['home', 'tourCard']),
  graphql(
    gql`
      {
        countries(where: { active: true }) {
          id

          cities {
            id

            categoryType {
              id
              name
            }

            description

            image

            localizations {
              id
              languageId
              name
            }

            name

            ratings

            slug

            timezone
          }

          localizations {
            id
            languageId
            name
          }

          mainImage

          name

          thumbnailUrl
        }
      }
    `,
    {
      name: 'serverQuery',
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  ),
  graphql(
    gql`
      {
        categoryTypes {
          id
          name
          localizations {
            id
            languageId
            name
          }
          categories(where: { count: { gt: 0 } }) {
            id
            name
            localizations {
              id
              languageId
              name
            }
            imageUrl
          }
        }

        homePageFeed {
          id
          image {
            raw
            thumb
          }
          mainText
          secondaryText
          secondaryTextLink
        }
      }
    `,
    {
      name: 'clientQuery',
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      options: {
        ssr: false,
      },
    },
  ),
  Home,
);
