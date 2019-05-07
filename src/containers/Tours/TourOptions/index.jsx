import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-popover';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import Direction from '../../../components/Tours/Product/Direction';
import Overview from '../../../components/Tours/Product/Overview';
import Pricing from '../../../components/Tours/Product/SubProduct/Pricing';
import Itinerary from '../../../components/Tours/Product/SubProduct/Itinerary';
import Overlay from '../../../components/Tours/Overlay';
import Star from '../../../components/Forms/Star';
import PriceBreakdown from '../../../components/Tours/Product/PriceBreakdown';
import { formatCurrency } from '../../../helpers/currencyFormatter';
import Button from '../../../components/Button';

import DatePaxSelector from './DatePaxSelector';
import style from './style.less';
import Loader from './loader';

class TourOptions extends React.Component {
  state = {
    openModal: false,
  };

  modalAction = res => {
    this.props.clickBreakdown(res);
    this.setState(prevState => ({
      openModal: !prevState.openModal,
    }));
  };

  render() {
    const {
      productRef,
      subTours = [],
      subNav,
      collapseItem,
      clickSubProduct,
      onSelectDatePax,
      showPrice,
      openCalendarPax,
      showPaxCalendar,
      showCalendarPaxError,
      pricing,
      clickBreakdown,
      showBreakdown,
      activeSubProduct,
      calendarLimit,
      currency = {},
      savedUserSelection = {},
      onCheckout = () => {},
      bookingInfo,
      t = () => {},
      seeTours,
      isMobile,
      bookNow,
      travellerRequirement = {},
      isLoaded,
      isFiltered,
      currentDate,
      tourType,
      scrollTo = () => {},
      selectedSubProduct,
    } = this.props;
    const {
      state: { openModal },
      modalAction,
    } = this;
    const hasTour = this.props.subTours.length > 0;

    return (
      <div ref={productRef} className={style.tour_options}>
        <Helmet>
          <noscript>
            {`
              <style>
                .${style.tour_options}:after{
                   content:"Turn on your javascript to check prices.";
                   margin-top: -18px;
                   display: block;
                 }

                 .${style.tour_options} *{
                   display:none !important;
                 }
             </style>
            `}
          </noscript>
        </Helmet>

        <span className={style.title}>{t('tour options')}</span>

        {subTours.length > 0 && isLoaded && !isFiltered && (
          <div className={style.see_price}>
            <span>{t('to see prices')}</span>
            <DatePaxSelector
              calendarLimit={calendarLimit}
              currentDate={currentDate}
              formData={savedUserSelection}
              hasTour={hasTour}
              onUpdate={onSelectDatePax}
              openCalendarPax={openCalendarPax}
              seeTours={seeTours}
              showCalendarPaxError={showCalendarPaxError}
              showPaxCalendar={showPaxCalendar}
              t={t}
              tourType={tourType}
              travellerRequirement={travellerRequirement}
            />
          </div>
        )}

        {isLoaded && !subTours.length && (
          <div className={style.no_tours}>
            <span>No available tours.</span>
          </div>
        )}

        {!isLoaded && <Loader />}

        <div className={classnames(style.slide, subTours.length ? style.slide_in : '')}>
          {subTours.map(res => (
            <div
              key={res.id}
              ref={e => {
                this[`${res.id}`] = e;
              }}
              className={classnames(
                style.sub_products_collapsible,
                res.promo === 'buy_one' ? style.buy_one : '',
                res.promo === 'early_bird' ? style.early_bird : '',
              )}
            >
              <Popover
                key={res.id}
                body={
                  <PriceBreakdown
                    bookingInfo={bookingInfo}
                    clickBreakdown={clickBreakdown}
                    currency={currency}
                    onCheckout={onCheckout}
                    pricing={(res.finalPrice && res.finalPrice.exchange) || {}}
                    t={t}
                    tourType={tourType}
                    travellerRequirement={res.travellerRequirement}
                  />
                }
                isOpen={activeSubProduct === res.id && showBreakdown}
                place="right"
                preferPlace="right"
                tipSize={20}
              >
                <div className={style.main}>
                  <div className={style.flexRow}>
                    <div className={style.sub_info}>
                      {res.promo === 'buy_one' && (
                        <span className={style.special_offer}>Buy One Get One Free</span>
                      )}

                      {res.promo === 'early_bird' && (
                        <span className={style.special_offer}>Early Bird Special</span>
                      )}

                      <span className={style.title}>{res.title}</span>
                      {res.rating > 0 && res.reviews.length > 0 && (
                        <div className={style.reviews}>
                          <Star noOutline rating={res.rating} />
                          <span
                            className={style.review_text}
                            onClick={() => scrollTo('reviews', true)}
                            role="button"
                            tabIndex={0}
                          >
                            Reviews {`(${res.reviews.length})`}
                          </span>
                        </div>
                      )}
                    </div>

                    {showPrice && !isMobile && (
                      <div className={style.sub_pricing}>
                        <div className={style.discounted}>
                          {res.finalPrice && res.finalPrice.walkIn && (
                            <span>
                              {t('was')}
                              {formatCurrency(currency.code, res.finalPrice.walkIn.adults)}
                            </span>
                          )}
                        </div>

                        <div className={style.current_price}>
                          <span>{currency.code}</span>
                          <span>
                            {res.finalPrice && res.finalPrice.exchange
                              ? formatCurrency(currency.code, res.finalPrice.exchange.adults)
                              : ''}
                          </span>
                        </div>

                        <div className={style.price_info}>
                          {tourType === 'NORMAL' ? (
                            <span>{t(pricing.perPax)}</span>
                          ) : (
                            <span>{`${t('price')}/${t(tourType)}`}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* book button on mobile */}
                    <div className={style.m_sub_button}>
                      {showPrice && (
                        <Button colorType="primary" onClick={() => modalAction(res)} type="button">
                          <span>{t('bookNow')}</span>
                        </Button>
                      )}
                    </div>

                    {/* action buttons on desktop */}
                    <div className={style.sub_button}>
                      {showPrice && (
                        <div>
                          <Button
                            colorType="primary"
                            fullWidth
                            onClick={() => clickBreakdown(res)}
                            outlined
                            style={{ margin: '0 0 .5em 0' }}
                            type="button"
                          >
                            {t('price breakdown')}
                          </Button>

                          <Button
                            colorType="primary"
                            fullWidth
                            onClick={() => bookNow(res)}
                            type="button"
                          >
                            {t('bookNow')}
                          </Button>
                        </div>
                      )}

                      {!showPrice && (
                        <Button
                          colorType="primary"
                          fullWidth
                          onClick={() => openCalendarPax('show')}
                          outlined
                          type="button"
                        >
                          {t('select dates')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {showPrice && (
                  <div className={style.m_sub_pricing}>
                    <div className={style.price_info}>
                      {tourType === 'NORMAL' ? (
                        <span>{t(pricing.perPax)}</span>
                      ) : (
                        <span>{`${t('price')}/${t(tourType)}`}</span>
                      )}
                    </div>

                    <div className={style.m_price_info}>
                      <div className={style.discounted}>
                        {pricing.isDiscounted && (
                          <span>
                            {t('was')}
                            {formatCurrency(currency.code, res.finalPrice.walkIn.adults)}
                          </span>
                        )}
                      </div>

                      <div className={style.current_price}>
                        <span>{currency.code}</span>
                        <span>
                          {res.finalPrice && res.finalPrice.exchange
                            ? formatCurrency(currency.code, res.finalPrice.exchange.adults)
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Popover>

              <div className={style.footer}>
                <div className={style.footer_nav}>
                  <ul>
                    {subNav
                      .filter(word => {
                        const { description, time: { from, to } = {}, title } =
                          res.itinerary[0] || {};
                        if (
                          word.name === 'itinerary' &&
                          // !res.itinerary.length &&
                          !description &&
                          !from &&
                          !to &&
                          !title
                        ) {
                          return null;
                        }
                        if (word.name === 'map' && !res.locations.length) {
                          return null;
                        }
                        if (
                          word.name === 'overview' &&
                          !res.shortDescription.length &&
                          !res.details.length
                        ) {
                          return null;
                        }
                        return word;
                      })
                      .map(item => (
                        <li key={item.name}>
                          <a
                            className={
                              collapseItem.item === item.name && collapseItem.id === res.id
                                ? style.active
                                : ''
                            }
                            onClick={() => clickSubProduct(res.id, item.name, this[`${res.id}`])}
                            role="button"
                            tabIndex={0}
                          >
                            {t(item.name)}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <div>
                    {res.type && (
                      <React.Fragment>
                        <span>{res.type}</span>
                        {res.type.includes('Joint') ||
                          (res.type.includes('Private') && (
                            <span
                              className={classnames(style.icon_info, 'icon icon-info-circle')}
                            />
                          ))}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div
                  className={classnames(
                    style.subproduct_tab,
                    collapseItem.open && collapseItem.id === res.id ? style.collapse : '',
                  )}
                >
                  <div className={style.body}>
                    <Overview
                      details={res.details}
                      isHidden={collapseItem.item === 'overview' && collapseItem.id === res.id}
                      shortDescription={res.shortDescription}
                      subView
                      t={t}
                    />
                    <Itinerary
                      isHidden={collapseItem.item === 'itinerary' && collapseItem.id === res.id}
                      itinerary={res.itinerary}
                    />
                    {showPrice ? (
                      <Pricing
                        basePrice={res.priceInfo.basePrice}
                        currencyCode={currency.code}
                        isHidden={collapseItem.item === 'pricing' && collapseItem.id === res.id}
                        t={t}
                        tourType={tourType}
                      />
                    ) : (
                      ''
                    )}
                    {res.locations.length ? (
                      <Direction
                        hideTitle
                        isHidden={collapseItem.item === 'map' && collapseItem.id === res.id}
                        locations={res.locations}
                        t={t}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE: mobile device only
          this is full screen overlay for showing price breakdown
          when user click 'Book Now' button on mobile
          */}
        {openModal && selectedSubProduct && (
          <Overlay closeModal={modalAction} isOpen={openModal}>
            <PriceBreakdown
              bookingInfo={bookingInfo}
              clickBreakdown={clickBreakdown}
              currency={currency}
              onCheckout={onCheckout}
              pricing={
                (selectedSubProduct.finalPrice && selectedSubProduct.finalPrice.exchange) || {}
              }
              t={t}
              tourType={tourType}
              travellerRequirement={selectedSubProduct.travellerRequirement}
            />
          </Overlay>
        )}
      </div>
    );
  }
}

TourOptions.propTypes = {
  currentDate: PropTypes.string,
  productRef: PropTypes.func,
  collapseItem: PropTypes.object,
  subTours: PropTypes.arrayOf(PropTypes.object),
  subNav: PropTypes.arrayOf(PropTypes.object),
  clickSubProduct: PropTypes.func,
  onSelectDatePax: PropTypes.func,
  showPrice: PropTypes.bool,
  openCalendarPax: PropTypes.func,
  showPaxCalendar: PropTypes.bool,
  pricing: PropTypes.shape({
    isDiscounted: PropTypes.bool,
    lastPrice: PropTypes.string,
    discountedPrice: PropTypes.string,
    currency: PropTypes.string,
    pricePax: PropTypes.string,
  }),
  clickBreakdown: PropTypes.func,
  showBreakdown: PropTypes.bool,
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
  t: PropTypes.func,
  seeTours: PropTypes.func,
  isMobile: PropTypes.bool,
  bookNow: PropTypes.func,
  travellerRequirement: PropTypes.object,
  isLoaded: PropTypes.bool,
  isFiltered: PropTypes.bool,
  tourType: PropTypes.string,
  scrollTo: PropTypes.func,
  showCalendarPaxError: PropTypes.string,
  selectedSubProduct: PropTypes.object,
};

TourOptions.defaultProps = {
  currentDate: '',
  productRef: () => {},
  collapseItem: {},
  subTours: [],
  subNav: [],
  clickSubProduct: () => {},
  onSelectDatePax: () => {},
  showPrice: false,
  openCalendarPax: () => {}, // trigger to select dates
  showPaxCalendar: false, // open or collapse the datepax selector
  pricing: {
    isDiscounted: true,
    lastPrice: '4560',
    discountedPrice: '3600',
    currency: 'THB',
    perPax: 'price/person',
  },
  clickBreakdown: () => {},
  showBreakdown: false,
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
  t() {},
  seeTours: () => {},
  isMobile: false,
  bookNow: () => {},
  travellerRequirement: {},
  isLoaded: false,
  isFiltered: false,
  tourType: '',
  scrollTo: () => {},
  showCalendarPaxError: '',
  selectedSubProduct: null,
};

export default TourOptions;
