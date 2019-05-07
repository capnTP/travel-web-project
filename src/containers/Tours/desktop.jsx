import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import VisibilitySensor from 'react-visibility-sensor';

import SeoHelper from '../../components/SeoHelper';
import * as Product from '../../components/Tours/Product';
import { Share } from '../../components/Tours/SpecialButton';
import Hr from '../../components/Tours/Product/Hr';
import Gallery from '../../components/Gallery';
import smoothScroll from '../../helpers/smoothScroller';

import style from './style.less';
import TourOptions from './TourOptions';
import helper from './helper';

export class ProductDesktop extends Component {
  state = {
    list: [
      { name: 'overview', id: 'overview' },
      { name: 'highlights', id: 'highlights' },
      { name: 'tour options', id: 'tours' },
      { name: 'more information', id: 'information' },
      { name: 'includeExclude', id: 'includes' },
      { name: 'directions', id: 'direction' },
      { name: 'reviews', id: 'reviews' },
    ],
    subNav: [{ name: 'overview' }, { name: 'itinerary' }, { name: 'pricing' }, { name: 'map' }],
    sticky: false,
    activeRef: 'overview',
    collapseItem: {},
    openModal: false,
    showGallery: false,
    scrollWidth: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    document.body.classList.remove('padding');
  }

  onScroll = () => {
    const y = window.scrollY;

    // if (this.reviews) {
    //   const yAxis = y + 600;
    //   this.setState({
    //     hideReview: yAxis >= this.reviews.offsetTop,
    //   });
    // }

    const { sticky } = this.state;
    if (this.props.isMobile) {
      if (y >= 45 && !sticky) {
        this.setState({
          sticky: true,
        });
      } else if (y <= 45 && sticky) {
        this.setState({
          sticky: false,
        });
      }
    } else if (y >= 441 && !sticky) {
      this.setState({
        sticky: true,
      });
    } else if (y <= 441 && sticky) {
      this.setState({
        sticky: false,
      });
    }
  };

  scrollTo = (itemId, isReview) => {
    const listName = itemId
      .toLowerCase()
      .replace(/\s/g, '')
      .replace('/', '');
    const top = this[listName].offsetTop;

    if (isReview) {
      smoothScroll(top - (this.state.scrollWidth > 0 ? 60 : 100), 350);
      this.setState({
        activeRef: itemId,
        scrollWidth: top,
      });
    }
    if (this.state.activeRef !== itemId) {
      smoothScroll(top - (this.state.scrollWidth > 0 ? 60 : 100), 350);
      this.setState({
        activeRef: itemId,
        scrollWidth: top,
      });
    }
  };

  clickSubProduct = (id, name) => {
    const { collapseItem } = this.state;
    if (collapseItem && collapseItem.id === id && collapseItem.item === name) {
      this.setState({
        collapseItem: {
          id: null,
          open: false,
          item: '',
        },
      });
    } else {
      this.setState({
        collapseItem: {
          id,
          item: name,
          open: true,
        },
      });
    }
  };

  modalAction = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  galleryAction = () => {
    this.setState(prevState => ({
      showGallery: !prevState.showGallery,
    }));
  };

  filterList = list =>
    list.reduce((acc = [], item) => {
      const { t } = this.props;
      const propCopy = this.props;
      const itemCopy = item;
      itemCopy.name = t(itemCopy.name);
      if (itemCopy.id === 'overview' && propCopy.shortDescription) {
        acc.push(itemCopy);
      } else if (
        itemCopy.id === 'includes' &&
        (propCopy.includes.length || propCopy.excludes.length)
      ) {
        acc.push(itemCopy);
      } else if (itemCopy.id === 'direction' && propCopy.locations.length) {
        acc.push(itemCopy);
      } else if (itemCopy.id === 'reviews' && propCopy.reviews.length) {
        acc.push(itemCopy);
      } else if (Array.isArray(propCopy[itemCopy.id]) && propCopy[itemCopy.id].length) {
        acc.push(itemCopy);
      } else if (!Array.isArray(propCopy[itemCopy.id]) && propCopy[itemCopy.id]) {
        acc.push(itemCopy);
      } else if (itemCopy.id === 'tours') {
        acc.push(itemCopy);
      }
      return acc;
    }, []);

  bookingSelection = () => {
    this.setState({
      openModal: true,
    });
  };

  seeTours = () => {
    this.scrollTo('tours');
  };

  render() {
    let { subNav } = this.state;
    const {
      state: { sticky, list, activeRef, collapseItem, showGallery },
      props: {
        availableLanguages,
        locale = '',
        images = [],
        t,
        pathname,
        onSelectDatePax,
        showPrice,
        clickCalendarPax,
        showCalendarPax,
        showCalendarPaxError,
        showPriceBreakdown,
        priceBreakdownAction,
        activeSubProduct,
        seo = {},
        calendarLimit = {},
        currency = {},
        savedUserSelection = {},
        onCheckout = () => {},
        bookingInfo,
        isPublished,
        isDiscounted,
        isMobile,
        city: { name: city, country, slug: citySlug } = {},
        bookNow,
        latestMinimumPrice,
        isLoaded,
        isFiltered,
        currentDate,
        onMapVisible,
        displayMap,
        tourType,
        featureType,
        onReviewVisible,
        hideReview,
      },
      scrollTo,
      clickSubProduct,
      galleryAction,
      filterList,
      seeTours,
    } = this;

    const details = Object.assign([], this.props.details);
    details.splice(1, 0, {
      name: 'type',
      text: featureType,
    });

    if (!showPrice) {
      subNav = subNav.filter(nav => nav.name !== 'pricing');
    }
    const bannerImage = images && images.length ? images[0] : {};
    const toursNavList = filterList(list);

    const visibilitySensorComponent = (
      <VisibilitySensor
        key="product-options"
        delayedCall
        intervalCheck
        onChange={this.props.onScrollChange}
        partialVisibility
      >
        <TourOptions
          activeSubProduct={activeSubProduct}
          bookingInfo={bookingInfo}
          bookNow={bookNow}
          calendarLimit={calendarLimit}
          clickBreakdown={priceBreakdownAction}
          clickSubProduct={clickSubProduct}
          collapseItem={collapseItem}
          currency={currency}
          currentDate={currentDate}
          isFiltered={isFiltered}
          isLoaded={isLoaded}
          isMobile={isMobile}
          latestMinimumPrice={latestMinimumPrice}
          onCheckout={onCheckout}
          onSelectDatePax={onSelectDatePax}
          openCalendarPax={clickCalendarPax}
          productRef={e => {
            this.tours = e;
          }}
          savedUserSelection={savedUserSelection}
          scrollTo={this.scrollTo}
          seeTours={seeTours}
          selectedSubProduct={this.props.selectedSubProduct}
          showBreakdown={showPriceBreakdown}
          showCalendarPaxError={showCalendarPaxError}
          showPaxCalendar={showCalendarPax}
          showPrice={showPrice}
          subNav={subNav}
          subTours={this.props.subTours}
          t={t}
          tourType={tourType}
          travellerRequirement={this.props.travellerRequirement}
        />
      </VisibilitySensor>
    );

    return (
      <div>
        <SeoHelper
          availableLanguages={availableLanguages}
          description={seo.description}
          image={bannerImage.raw}
          isPublished={
            isPublished && helper.isLocaleMatchAvailableLanguages(locale, availableLanguages)
          }
          keywords={seo.keywords}
          locale={locale}
          ogType="product"
          title={seo.title}
        />

        {!!seo.schema && (
          <Helmet>
            <script type="application/ld+json">{`${seo.schema}`}</script>
          </Helmet>
        )}

        {isMobile && (
          <div className={style.m_sub_header}>
            <Product.Nav
              activeRef={activeRef}
              fixedTop={false}
              list={toursNavList}
              productRef={e => {
                this.nav = e;
              }}
              scrollTo={scrollTo}
              stickTop={sticky}
            />
            <div className={style.flex_row}>
              <div className={style.row_6}>
                <Product.Breadcrumb city={city} country={country} slug={citySlug} />
              </div>
              <div className={style.row_6}>
                <Share url={pathname} />
              </div>
            </div>
          </div>
        )}
        <Gallery
          close={galleryAction}
          images={images}
          isOpen={showGallery}
          reviews={this.props.reviews}
          shortDescription={this.props.shortDescription}
          tourName={this.props.title}
        />

        <div className={`${style.product_container} ${sticky ? style.sticky : ''}`}>
          <Product.ImageCard
            alt={bannerImage.alt || ''}
            height={35}
            image={bannerImage.raw}
            onOpenGallery={galleryAction}
            productRef={e => {
              this.coverImage = e;
            }}
            t={t}
          />
          {!isMobile && (
            <Product.Nav
              activeRef={activeRef}
              fixedTop={false}
              list={toursNavList}
              productRef={e => {
                this.nav = e;
              }}
              scrollTo={scrollTo}
              stickTop={sticky}
            />
          )}
          <div className={style.product_content}>
            <div className={style.left_content}>
              {!isMobile && (
                <div className={style.flex_row}>
                  <div className={style.row_6}>
                    <Product.Breadcrumb city={city} country={country} slug={citySlug} />
                  </div>
                  <div className={style.row_6}>
                    <Share url={pathname} />
                  </div>
                </div>
              )}
              <div className={style.padding_container}>
                <Product.TourName tourName={this.props.title} />
                {isMobile && (
                  <Product.Price
                    currency={currency}
                    startsFrom={this.props.latestMinimumPrice}
                    t={t}
                  />
                )}
                <Product.Overview
                  details={details}
                  productRef={e => {
                    this.overview = e;
                  }}
                  shortDescription={this.props.shortDescription}
                  t={t}
                />

                <Product.Highlights
                  highlights={this.props.highlights}
                  productRef={e => {
                    this.highlights = e;
                  }}
                  t={t}
                />
              </div>

              {isPublished ? [visibilitySensorComponent, <Hr key="hr-brake-line" />] : ''}

              <div className={style.padding_container}>
                <Product.MoreInformation
                  information={this.props.information}
                  productRef={e => {
                    this.information = e;
                  }}
                />
                <Product.IncludesExclude
                  excludes={this.props.excludes}
                  includes={this.props.includes}
                  productRef={e => {
                    this.includes = e;
                  }}
                  t={t}
                />
                <Product.LongDescription
                  h2Title={this.props.descriptionHeader}
                  longDescription={this.props.longDescription}
                  productRef={e => {
                    this.longDescription = e;
                  }}
                />
                <VisibilitySensor key="product-maps" delayedCall onChange={onMapVisible}>
                  <div
                    ref={e => {
                      this.direction = e;
                    }}
                  >
                    {displayMap && <Product.Direction locations={this.props.locations} t={t} />}
                  </div>
                </VisibilitySensor>
              </div>
              <VisibilitySensor key="product-review" onChange={onReviewVisible} partialVisibility>
                <div>
                  <Product.Reviews
                    productRef={e => {
                      this.reviews = e;
                    }}
                    reviews={this.props.reviews}
                    t={t}
                  />
                </div>
              </VisibilitySensor>
            </div>
            <div
              className={`${style.right_content} ${
                isPublished && !isDiscounted ? style.add_margin_top : ''
              }`}
            >
              {!isPublished ? (
                <div className={`${style.header_card} ${style.not_published}`}>
                  <span>{t('Product not available')}</span>
                </div>
              ) : (
                ''
              )}
              {isPublished && isDiscounted ? (
                <div className={style.header_card}>
                  <span>{t('Special Offers are available')}</span>
                </div>
              ) : (
                ''
              )}
              <div className={style.image_gallery_list}>
                {images.slice(0, 7).map(img => (
                  <img
                    key={img.small}
                    alt={img.alt || ''}
                    data-base={img.small}
                    onClick={galleryAction}
                    role="presentation"
                    src={img.thumb}
                  />
                ))}
              </div>
              {hideReview ? null : (
                <Product.Reviews reviews={this.props.reviews} scrollTo={this.scrollTo} side t={t} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductDesktop.propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string),
  currentDate: PropTypes.string,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  longDescription: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string),
  city: PropTypes.object,
  details: PropTypes.arrayOf(PropTypes.object),
  includes: PropTypes.arrayOf(PropTypes.object),
  excludes: PropTypes.arrayOf(PropTypes.object),
  information: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  seo: PropTypes.object,
  onScrollChange: PropTypes.func,
  subTours: PropTypes.arrayOf(PropTypes.object),
  images: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func,
  onSelectDatePax: PropTypes.func,
  pathname: PropTypes.string.isRequired,
  showPrice: PropTypes.bool,
  clickCalendarPax: PropTypes.func,
  showCalendarPax: PropTypes.bool,
  showCalendarPaxError: PropTypes.string,
  showPriceBreakdown: PropTypes.bool,
  priceBreakdownAction: PropTypes.func,
  activeSubProduct: PropTypes.string,
  calendarLimit: PropTypes.shape({
    endDate: PropTypes.object,
    excludeDates: PropTypes.arrayOf(PropTypes.string),
    blockedDays: PropTypes.arrayOf(PropTypes.string),
    minimumPax: PropTypes.number,
    maximumPax: PropTypes.number,
  }),
  currency: PropTypes.object,
  savedUserSelection: PropTypes.object,
  onCheckout: PropTypes.func,
  bookingInfo: PropTypes.object,
  isPublished: PropTypes.bool,
  isDiscounted: PropTypes.bool,
  isMobile: PropTypes.bool,
  latestMinimumPrice: PropTypes.number,
  descriptionHeader: PropTypes.string,
  bookNow: PropTypes.func,
  isLoaded: PropTypes.bool,
  isFiltered: PropTypes.bool,
  travellerRequirement: PropTypes.object,
  onMapVisible: PropTypes.func,
  displayMap: PropTypes.bool,
  featureType: PropTypes.string,
  tourType: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  onReviewVisible: PropTypes.func,
  hideReview: PropTypes.bool,
  locale: PropTypes.string,
  selectedSubProduct: PropTypes.object,
};

ProductDesktop.defaultProps = {
  availableLanguages: [],
  currentDate: '',
  highlights: [],
  details: [],
  city: {},
  includes: [],
  excludes: [],
  information: [],
  locations: [],
  seo: {},
  onScrollChange() {},
  subTours: [],
  images: [],
  t() {},
  onSelectDatePax() {},
  showPrice: false,
  clickCalendarPax: () => {},
  showCalendarPax: false,
  showCalendarPaxError: '',
  showPriceBreakdown: false,
  priceBreakdownAction: () => {},
  activeSubProduct: '',
  calendarLimit: {
    endDate: {},
    excludeDates: [],
    blockedDays: [],
    minimumPax: 0,
    maximumPax: 0,
  },
  currency: {},
  savedUserSelection: {},
  onCheckout() {},
  bookingInfo: {},
  isPublished: false,
  isDiscounted: false,
  isMobile: false,
  latestMinimumPrice: 0,
  descriptionHeader: '',
  bookNow: () => {},
  isLoaded: false,
  isFiltered: false,
  travellerRequirement: {},
  onMapVisible() {},
  displayMap: false,
  featureType: '',
  tourType: '',
  reviews: [],
  onReviewVisible() {},
  hideReview: false,
  locale: '',
  selectedSubProduct: null,
};

export default ProductDesktop;
