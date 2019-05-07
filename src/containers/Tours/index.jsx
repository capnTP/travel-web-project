/* eslint-disable react/no-multi-comp */
import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router';
import moment from 'moment';
import { translate } from 'react-i18next';

import { Checkout } from '../../app/loadables';
import Price from '../../helpers/price';
import getSubTours from '../../queries/tours/subTours.gql';
import getToursPricing from '../../queries/tours/toursPricing.gql';
import googleCommerce from '../../helpers/googleEcommerce';
import safeGet from '../../helpers/safeGet';
import compose from '../../helpers/compose';
import { setCheckoutData } from '../../helpers/checkoutDataUtil';

import getTour from './tourBySlug.gql';
import Desktop from './desktop';

// Globals in webpack
// eslint-disable-next-line no-undef
const DATE_FORMAT = __DATE_FORMAT__;

export class MainProduct extends React.Component {
  constructor(props) {
    super(props);
    this.userDataKey = '_userPaxDateSelect_';
    this.state = {
      subTours: [],
      showPrice: false,
      showCalendarPaxError: '',
      showCalendarPax: true,
      showPriceBreakdown: false,
      activeSubProduct: '',
      priceCalc: '',
      selectedSubProduct: {},
      currency: {},
      isLoaded: false,
      isFiltered: false,
      displayMap: false,
      hideReview: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelectDatePax = this.onSelectDatePax.bind(this);
    this.openCalendarPax = this.openCalendarPax.bind(this);
    this.priceBreakdownAction = this.priceBreakdownAction.bind(this);
    this.applySavedUserData = this.applySavedUserData.bind(this);
    this.onCheckout = this.onCheckout.bind(this);
    this.onMapVisible = this.onMapVisible.bind(this);
    this.onReviewVisible = this.onReviewVisible.bind(this);
  }

  onCheckout = () => {
    const { userInput, selectedSubProduct } = this.state;
    const { currency } = this.props.data.tourBySlug;
    const {
      match: { params: { slug = '', lng = '' } = {} } = {},
      data: { tourBySlug: { id = '', title = '', images = [], tourType } = {} } = {},
      info: { currency: userCurrency = {}, locale = 'en' } = {},
    } = this.props;
    const { finalPrice: { exchange = {} } = {} } = selectedSubProduct;
    const { adults = 0, children = 0, infants = 0 } = userInput;
    googleCommerce.addProduct({
      id,
      name: title,
      price: exchange.adults * adults + exchange.children * children + exchange.infants * infants,
      currencyCode: userCurrency.code,
      quantity: adults + children + infants,
    });
    const productImage = images && images.length ? images[0] : {};
    const url = lng ? `/${lng}` : '';
    const checkoutData = {
      userInput,
      selectedSubProduct,
      productId: id,
      productTitle: title,
      tourType,
      productImage,
      currency,
      userCurrency,
      step: 1,
      slug,
      locale,
    };
    setCheckoutData(checkoutData);
    this.props.history.push(`${url}/checkout/${slug}/billing-information`);
  };

  onChange(isVisible) {
    const { data: { tourBySlug: { id = '', currency = {} } = {} } = {} } = this.props;
    const { subTours: lastSubTours = [] } = this.state;
    if (isVisible && !lastSubTours.length) {
      const status = this.props.getSubTours({
        variables: {
          tourId: id,
          currency: {
            id: currency.id,
            code: currency.code,
            exchangeRate: currency.exchangeRate,
          },
        },
      });
      status.then(({ data: { subTours = [] } = {} }) => {
        const priceCalc = new Price(subTours);
        window.__priceCalc__ = priceCalc; // eslint-disable-line no-underscore-dangle
        this.setState(
          {
            subTours,
            priceCalc,
            isLoaded: true,
          },
          () => {
            this.applySavedUserData();
          },
        );
      });
    }
  }

  onMapVisible(isVisible) {
    const { displayMap } = this.state;
    if (!displayMap && isVisible) {
      this.setState({
        displayMap: true,
      });
    }
  }

  onReviewVisible(isVisible) {
    this.setState({
      hideReview: isVisible,
    });
  }

  onSelectDatePax({ date, adults = 0, children = 0, infants = 0 }, isSaved) {
    if (!date) return false;
    const { subTours = [], savedUserSelection } = this.state;
    const { data: { tourBySlug: { currency = {} } = {} } = {} } = this.props;
    const userTourDate = date.utc().format(DATE_FORMAT);
    const status = this.props.getToursPricing({
      variables: {
        input: {
          subProducts: subTours.map(item => item.id),
          date: userTourDate,
          adults,
          children,
          infants,
        },
        currency: {
          id: currency.id,
          code: currency.code,
          exchangeRate: currency.exchangeRate,
        },
        isFiltered: true,
      },
    });

    return status.then(({ data: { toursPricing = [] } = {} }) => {
      const {
        priceCalc: { filterTourWithPrice = () => {} },
      } = this.state;
      const { match: { params: { slug = '' } = {} } = {} } = this.props;
      const filteredSubTours = filterTourWithPrice(
        date,
        {
          adults,
          children,
          infants,
        },
        toursPricing,
      );

      if (filteredSubTours.length) {
        Checkout.preload();
        this.setState({
          savedUserSelection: isSaved && filteredSubTours.length ? savedUserSelection : {},
          showPrice: true,
          showCalendarPax: false,
          toursPricing,
          subTours: filteredSubTours,
          showCalendarPaxError: '',
          userInput: {
            date: userTourDate,
            adults,
            children,
            infants,
          },
        });
      } else if (!isSaved) {
        this.setState(
          {
            showCalendarPax: true,
          },
          () => {},
        );
      }

      if (filteredSubTours.length) {
        this.userData = JSON.stringify({
          date: userTourDate,
          adults,
          children,
          infants,
          slug,
        });
        localStorage.setItem(this.userDataKey, this.userData);
      }
    });
  }

  openCalendarPax = status => {
    this.setState(prevState => ({
      showCalendarPax: status === 'show' ? true : !prevState.showCalendarPax,
      showPriceBreakdown: false,
      activeSubProduct: '',
      selectedSubProduct: '',
    }));
  };

  priceBreakdownAction = subTour => {
    const { id } = subTour;
    this.setState(prevState => ({
      showPriceBreakdown: id !== '' && prevState.activeSubProduct !== id,
      showCalendarPax: false,
      activeSubProduct: prevState.activeSubProduct === id ? '' : id,
      selectedSubProduct: subTour,
    }));
  };

  bookNow = subTour => {
    const { id } = subTour;
    const {
      priceCalc: { getCalendar = () => {} } = {},
      userInput: { children = 0, infants = 0 } = {},
    } = this.state;
    const { paxInfo = {} } = getCalendar();
    const { children: haveChildren = 0, infants: haveInfants = 0 } = paxInfo[id] || {};
    this.setState(
      {
        showCalendarPaxError: '',
      },
      () => {
        if (!haveInfants && infants) {
          this.setState({
            showCalendarPaxError: 'Selected product does not have infants',
            showCalendarPax: true,
          });
        } else if (!haveChildren && children) {
          this.setState({
            showCalendarPaxError: 'Selected product does not have children',
            showCalendarPax: true,
          });
        } else
          this.setState(
            {
              showPriceBreakdown: id !== '',
              showCalendarPax: false,
              activeSubProduct: id,
              selectedSubProduct: subTour,
            },
            () => {
              this.onCheckout();
            },
          );
      },
    );
  };

  applySavedUserData() {
    const { match: { params: { slug = '' } = {} } = {} } = this.props;
    let savedData = {};
    const userData = localStorage.getItem(this.userDataKey);
    try {
      savedData = JSON.parse(userData);
    } catch (e) {
      console.error('Cant find saved user data!!'); // eslint-disable-line no-console
    }
    if (
      savedData &&
      savedData.date &&
      !moment(savedData.date).isBefore(moment().format(DATE_FORMAT), 'day') &&
      userData !== this.userData &&
      slug === savedData.slug
    ) {
      const savedUserSelection = {
        ...savedData,
        date: moment(savedData.date),
      };

      const isOpen = !!(
        savedData.date &&
        (savedData.adults > 0 || (savedData.children > 0) | (savedData.infants > 0))
      );

      this.setState(
        {
          savedUserSelection,
          showCalendarPax: !isOpen,
        },
        () => {
          this.onSelectDatePax(savedUserSelection, true);
        },
      );
    }
  }

  render() {
    const { currency = {}, device, locale } = this.props.info;
    const {
      state: {
        showPrice,
        showCalendarPax,
        showCalendarPaxError,
        showPriceBreakdown,
        activeSubProduct,
        isLoaded,
        isFiltered,
        priceCalc: { getCalendar = () => {} } = {},
        hideReview,
      },
      openCalendarPax,
      priceBreakdownAction,
    } = this;

    const {
      match: {
        params: { slug },
      },
    } = this.props;

    const pathname = `https://theasia.com${locale ? `/${locale}` : ''}/discover/${slug}`;
    const { tourBySlug } = this.props.data;
    const { subTours = [], savedUserSelection = {}, userInput = {}, displayMap } = this.state;
    const isMobile = device === 'mobile';
    const availableLanguages = this.props.data.tourLanguages || [];

    return (
      <Desktop
        {...tourBySlug}
        activeSubProduct={activeSubProduct}
        availableLanguages={availableLanguages}
        bookingInfo={userInput}
        bookNow={this.bookNow}
        calendarLimit={getCalendar()}
        clickCalendarPax={openCalendarPax}
        currency={currency}
        displayMap={displayMap}
        hideReview={hideReview}
        isFiltered={isFiltered}
        isLoaded={isLoaded}
        isMobile={isMobile}
        locale={locale}
        onCheckout={this.onCheckout}
        onMapVisible={this.onMapVisible}
        onReviewVisible={this.onReviewVisible}
        onScrollChange={this.onChange}
        onSelectDatePax={this.onSelectDatePax}
        pathname={pathname}
        priceBreakdownAction={priceBreakdownAction}
        savedUserSelection={savedUserSelection}
        selectedSubProduct={this.state.selectedSubProduct}
        showCalendarPax={showCalendarPax}
        showCalendarPaxError={showCalendarPaxError}
        showPrice={showPrice}
        showPriceBreakdown={showPriceBreakdown}
        subTours={subTours}
        t={this.props.t}
      />
    );
  }
}

MainProduct.propTypes = {
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  info: PropTypes.shape({
    device: PropTypes.string,
    currency: PropTypes.object,
    locale: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      deviceType: PropTypes.string,
    }),
  }).isRequired,
  getSubTours: PropTypes.func.isRequired,
  getToursPricing: PropTypes.func.isRequired,
  t: PropTypes.func,
};

MainProduct.defaultProps = {
  info: {
    device: 'desktop',
    currency: {},
    locale: '',
  },
  t() {},
};

const ProductWithHoc = compose(
  withRouter,
  graphql(getSubTours, {
    name: 'getSubTours',
    options: () => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }),
  }),
  graphql(getToursPricing, {
    name: 'getToursPricing',
    options: () => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }),
  }),
  graphql(getTour, {
    withRef: true,
    options: props => ({
      variables: {
        slug: props.match.params.slug,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }),
  }),
  translate('discover'),
  MainProduct,
);

// TODO: Why do we need this?
// May be move these functionalities to main component
class MainProductWithData extends React.Component {
  componentDidMount() {
    const {
      data: {
        loading,
        tourBySlug: { id, title, currency: { code } = {}, latestMinimumPrice } = {},
      } = {},
    } = this.props;

    if (!loading) {
      googleCommerce.addImpression({
        id,
        name: title,
        currencyCode: code,
        price: latestMinimumPrice,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { data: { tourBySlug: newData = {}, error } = {} } = nextProps;

    if (error) {
      return true;
    }

    const { data: { tourBySlug: oldData = {} } = {} } = this.props;
    return JSON.stringify(newData) !== JSON.stringify(oldData);
  }

  render() {
    const { data: { error } = {}, info = {} } = this.props;

    if (error && error.graphQLErrors.length > 0) {
      const errorObj = safeGet(() => JSON.parse(error.graphQLErrors[0].message));
      if (errorObj && errorObj.code === 404) {
        return <Redirect to="/page-not-found" />;
      }
    }

    return <ProductWithHoc data={this.props.data} info={info} />;
  }
}

MainProductWithData.propTypes = {
  data: PropTypes.shape({
    tourBySlug: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
  }),
  info: PropTypes.object,
};
MainProductWithData.defaultProps = {
  data: {
    tourBySlug: '',
    loading: true,
    error: '',
  },
  info: {},
};

export default MainProductWithData;
