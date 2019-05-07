import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';
import { graphql, withApollo } from 'react-apollo';

import { Account, Signing } from '../../app/loadables';
import Alert from '../../components/Forms/Alert';
import * as Checkout from '../../components/Checkout';
import ImageCard from '../../components/Tours/Product/Image';
import alipay from '../../assets/images/newpayment/alipay.png';
import visa from '../../assets/images/newpayment/visa.png';
import mastercard from '../../assets/images/newpayment/mastercard.png';
import maestro from '../../assets/images/newpayment/maestro.png';
import cirrus from '../../assets/images/newpayment/cirrus.png';
import paypal from '../../assets/images/newpayment/paypal.png';
import americanexpress from '../../assets/images/newpayment/amex.png';
import jcb from '../../assets/images/newpayment/jcb.png';
import unionpay from '../../assets/images/newpayment/unionpay.png';
import googleCommerce from '../../helpers/googleEcommerce';
import createBooking from '../../queries/booking/createBooking.gql';
import getLangId from '../../helpers/getLangId';
import { getCheckoutData, setCheckoutData } from '../../helpers/checkoutDataUtil';
import logger from '../../helpers/logger';

import CompleteStep from './CompleteStep';
import Billing from './Billing';
import OptionalInformation from './OptionalInformation';
import Payment from './Payment';
import style from './style.less';

const PAYMENT_ICONS = [
  { name: 'visa', url: visa },
  { name: 'mastercard', url: mastercard },
  { name: 'maestro', url: maestro },
  { name: 'cirrus', url: cirrus },
  { name: 'paypal', url: paypal },
  { name: 'americanexpress', url: americanexpress },
  { name: 'jcb', url: jcb },
  { name: 'unionpay', url: unionpay },
  { name: 'alipay', url: alipay },
];

class CheckoutContainer extends Component {
  state = {
    isCollapse: false,
    bookingCollapse: false,
    mobile: false,
    total: 0.0,
    billingCountry: '',
    render: false,
    error: false,
    errMessage: '',
  };

  componentDidMount() {
    const checkoutData = getCheckoutData();

    this.debug('componentDidMount, checkoutData::', checkoutData);

    if (!checkoutData) {
      return;
    }

    const {
      userInput: { adults = 0, children = 0, infants = 0 } = {},
      productTitle = '',
      productId,
      selectedSubProduct: { finalPrice: { exchange = {} } = {} } = {},
    } = checkoutData;

    googleCommerce.setAction.checkout.step1({
      id: productId,
      name: productTitle,
      price: exchange.adults * adults + exchange.children * children + exchange.infants * infants,
    });
    OptionalInformation.isStep2 = false;
    Payment.isStep3 = false;
  }

  shouldComponentUpdate() {
    if (this.state.render) {
      return true;
    }
    return false;
  }

  debug = (...args) => {
    logger.debug(`[CheckoutContainer]`, ...args);
  };

  onBookingUpdate = args => {
    const {
      billingCountry,
      currency,
      oldExchangeRate,
      exchangeRate,
      exchangeTotal,
      isUserCurrency = true,
    } = args;
    this.setState({ render: true }, () => {
      this.setState({
        isUserCurrency,
        oldExchangeRate,
        exchangeRate,
        exchangeTotal,
        exchangeCurrency: currency,
        billingCountry,
      });
    });
  };

  onSuccessPayment = data => {
    const { location, history } = this.props;
    const prevCheckoutData = getCheckoutData();
    setCheckoutData({ ...prevCheckoutData, payment: data, step: 4 });
    const pathname = location.pathname;
    history.replace(pathname.replace('payment', 'complete'));
  };

  getTotal = total => {
    this.setState({ total });
  };

  collapseBooking = () => {
    if (window) {
      window.scroll({ top: 0, behavior: 'smooth' });
    }

    this.setState(
      prevState => ({ render: true, bookingCollapse: !prevState.bookingCollapse }),
      () => {
        this.setState({ render: false });
      },
    );
  };

  collapse = () => {
    this.setState(
      prevState => ({ render: true, isCollapse: !prevState.isCollapse }),
      () => {
        this.setState({ render: false });
      },
    );
  };

  goBack = step => {
    if (step === 1) {
      const { slug } = this.props.match.params;
      this.props.history.replace(`/discover/${slug}`);
    } else {
      this.setState({ render: true }, () => {
        this.props.history.goBack();
      });
    }
  };

  goNext = formData => {
    this.setState({ render: true }, () => {
      const prevCheckoutData = getCheckoutData();
      setCheckoutData({ ...prevCheckoutData, formData, step: 2 });
      this.props.history.push(`/checkout/${prevCheckoutData.slug}/more-information`);
    });
  };

  shouldUpdate = type => {
    this.setState({ render: type });
  };

  createBooking = data => {
    const {
      formData,
      productId,
      selectedSubProduct: {
        id,
        cancellationPolicy,
        finalPrice: { selling },
      },
      userInput,
      currency,
      userCurrency = {},
      locale = 'en',
      slug,
    } = getCheckoutData();

    const localeId = getLangId(locale);
    const form = Object.assign({}, formData, data);

    const bookingData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.emailAddress.value,
      nationality: parseInt(form.nationality.value, 10) || 0,
      phone: `${form.contactNumber.code || '+63'} ${form.contactNumber.value.replace(/ /g, '')}`,
      pickupPlace: form.pickupLocation.value || '',
      pickupTime: form.pickupTime.value || '',
      flightNumber: form.flightNumber.value || '',
      passportNumber: form.passportNumber.value || '',
      dropOffPlace: form.dropOffPlace.value || '',
      hotelName: form.hotelInfo.value || '',
      bookingMethodId: 1,
      tourId: parseInt(productId, 10),
      subProductId: parseInt(id, 10),
      tripStarts: userInput.date,
      inputDetails: {
        adultPax: userInput.adults,
        childPax: userInput.children,
        infantPax: userInput.infants,
      },
      priceDetails: {
        adultPrice: selling.adults,
        childPrice: selling.children,
        infantPrice: selling.infants,
      },
      total: parseFloat(this.state.total),
      specialRequest: form.specialRequest.value || '',
      langId: localeId,
      cancellationPolicyId: parseInt(cancellationPolicy.id, 10),
      supplierCurrencyCode: currency.code,
      supplierExchangeRate: currency.exchangeRate,
      promoCode: '',
      exchangeRate: userCurrency.exchangeRate,
      bookingCurrencyCode: userCurrency.code,
      bookingCurrencyId: userCurrency.id,
      billingCountryId: form.nationality.value,
      pickupLocationTime: form.pickupLocationTime.value,
      selectedTime: form.selectedTime.value,
    };
    this.props
      .createBooking({ variables: { input: bookingData } })
      .then(res => {
        const { data: { createBooking: bookingResult = {} } = {} } = res;

        Signing.preload();
        Account.preload();

        this.setState({ render: true }, () => {
          const prevCheckoutData = getCheckoutData();
          setCheckoutData({
            ...prevCheckoutData,
            formData: form,
            step: 3,
            booking: bookingResult,
          });

          this.props.history.replace(`/checkout/${slug}/payment`);
        });
      })
      .catch(() => {
        this.setState({ render: true }, () => {
          this.setState({ error: true, errMessage: this.props.t('unfortunately') }, () => {
            this.setState({ render: false });
          });
        });
      });
  };

  render() {
    const {
      isCollapse,
      bookingCollapse,
      mobile,
      total,
      isUserCurrency = true,
      oldExchangeRate,
      exchangeRate,
      exchangeTotal,
      exchangeCurrency,
    } = this.state;
    const {
      info,
      match: {
        params: { slug, lng = '' },
      },
      t,
    } = this.props;

    const locale = lng ? `/${lng}` : '';

    if (!slug) {
      const url = `${locale}/`;
      this.debug(`no slug, redirect to ${url}`);
      return <Redirect to={url} />;
    }

    const state = getCheckoutData();

    if (!state) {
      const url = `${locale}/discover/${slug}`;
      this.debug(`no checkout data, redirect to ${url}`);
      return <Redirect to={url} />;
    }

    const {
      userInput,
      selectedSubProduct,
      productId,
      productTitle,
      tourType,
      productImage,
    } = state;

    if (slug !== state.slug) {
      const url = `${locale}/discover/${slug}`;
      this.debug(`stored slug not match with current slug, redirect to ${url}`);
      return <Redirect to={url} />;
    }

    if (!selectedSubProduct.id) {
      const url = `${locale}/discover/${slug}`;
      this.debug(`no selectedSubProduct, redirect to ${url}`);
      return <Redirect to={url} />;
    }

    const {
      cancellationPolicy: { name: policyName = '', description: policyDescription = '' } = {},
      type: productType = '',
    } = selectedSubProduct;
    const pageUrl = `${locale}/checkout/${slug}/`;

    return (
      <div className="flex_column">
        <div className={style.cover_image}>
          <ImageCard
            alt={productImage.alt || ''}
            height={35}
            hide={mobile}
            image={productImage.raw}
            showButton={false}
            t={t}
          />
        </div>

        {/* for mobile view */}
        <div className={`${style.booking} ${bookingCollapse ? style.show_booking : ''}`}>
          <div
            aria-hidden
            className={style.header}
            onClick={this.collapseBooking}
            role="button"
            tabIndex="0"
          >
            <div className="flex_row justify_space_between">
              <span>{t('view booking')}</span>
              <div className={style.icon_booking}>
                <span
                  className={`icon icon-arrow-down
                    ${style.icon_arrow}`}
                />
              </div>
            </div>
          </div>
          <div className={`${style.body}`}>
            <Checkout.BookingCard
              exchangeCurrency={exchangeCurrency}
              exchangeRate={exchangeRate}
              exchangeTotal={exchangeTotal}
              getTotal={this.getTotal}
              info={info}
              isDisable={state.step >= 3}
              isUserCurrency={isUserCurrency}
              oldExchangeRate={oldExchangeRate}
              onUpdatePax={this.onUpdatePax}
              productId={productId}
              productTitle={productTitle}
              subProduct={selectedSubProduct}
              t={t}
              tourType={tourType}
              userInput={userInput}
            >
              {() => {}}
            </Checkout.BookingCard>
          </div>
        </div>

        <Checkout.Navbar goBack={this.goBack} path={pageUrl} step={state.step} t={t} />

        <div className={style.checkout_content}>
          <section>
            <div className={style.collapse}>
              <div
                aria-hidden
                className={style.div_collapsible}
                onClick={this.collapse}
                role="button"
                tabIndex="0"
              >
                <span className={`txt_bold ${style.header_title}`}>
                  {t('theasia secure')}
                  <span className={`icon icon-locked ${style.icon_locked}`} />
                </span>
                <div className={`${style.arrow_collapse} ${isCollapse ? style.show_up : ''}`}>
                  <span
                    className={`icon icon-arrow-down
                  ${style.icon_right} `}
                  />
                </div>
              </div>
              <div className={`${style.collapse_item} ${isCollapse ? style.show : ''}`}>
                <div className={`${style.supported_payments} form_group`}>
                  <span>{t('supported payment')}</span>
                  <div>
                    {PAYMENT_ICONS.map(({ name, url }) => (
                      <img key={name} alt={name} src={url} />
                    ))}
                  </div>
                </div>
                <div className="form_group">
                  <Alert
                    description={`${t('your card will not be charged - ', {
                      interpolation: { escapeValue: false },
                    })}${t('no payments')}`}
                    icon="icon-dollar-circle"
                  />
                </div>
              </div>
            </div>
            <div className="flex_column">
              <Switch>
                <Route
                  component={() => (
                    <Billing
                      goNext={this.goNext}
                      shouldUpdate={this.shouldUpdate}
                      t={t}
                      total={total}
                    />
                  )}
                  exact
                  path={`${pageUrl}billing-information`}
                />
                <Route
                  component={() => (
                    <OptionalInformation
                      createBooking={this.createBooking}
                      errMessage={this.state.errMessage}
                      error={this.state.error}
                      location={this.props.location}
                      shouldUpdate={this.shouldUpdate}
                      t={t}
                      total={total}
                    />
                  )}
                  exact
                  path={`${pageUrl}more-information`}
                />
                <Route
                  // exact
                  component={() => (
                    <Payment
                      country={this.state.billingCountry}
                      currencyCode={exchangeCurrency}
                      location={this.props.location}
                      onSuccess={this.onSuccessPayment}
                      t={t}
                      updateBooking={this.onBookingUpdate}
                    />
                  )}
                  path={`${pageUrl}payment`}
                />
                <Route
                  // exact
                  component={() => <CompleteStep state={state} t={t} />}
                  path={`${pageUrl}complete`}
                />
              </Switch>
            </div>
          </section>
          <aside>
            {state.step !== 4 ? (
              <div>
                <Checkout.BookingCard
                  exchangeCurrency={exchangeCurrency}
                  exchangeRate={exchangeRate}
                  exchangeTotal={exchangeTotal}
                  getTotal={this.getTotal}
                  info={info}
                  isDisable={state.step >= 3}
                  isUserCurrency={isUserCurrency}
                  oldExchangeRate={oldExchangeRate}
                  onUpdatePax={this.onUpdatePax}
                  productId={productId}
                  productTitle={productTitle}
                  subProduct={selectedSubProduct}
                  t={t}
                  tourType={tourType}
                  userInput={userInput}
                >
                  {() => {}}
                </Checkout.BookingCard>
                <div className={style.tour_info}>
                  <div className={style.bordered_bottom}>
                    <span className={style.tour_type}>
                      {productType}
                      <span
                        className="icon icon-info-circle"
                        data-tip={productType}
                        data-type="success"
                      />
                    </span>
                  </div>
                  <div className={style.form_group}>
                    <div className="flex_row">
                      <span className={style.cancellation}>{t('cancellation policy')}: </span>
                      <Link
                        className="txt_orange txt_bold"
                        target="_self"
                        to="/cancellation-policy/"
                      >
                        {policyName}
                      </Link>
                    </div>
                    <div className={style.form_group}>
                      <span>{policyDescription}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Checkout.CompleteSide t={t} />
            )}
          </aside>
        </div>
      </div>
    );
  }
}

CheckoutContainer.propTypes = {
  t: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  info: PropTypes.object,
  createBooking: PropTypes.func.isRequired,
};
CheckoutContainer.defaultProps = {
  t() {},
  history: {},
  location: {},
  match: {},
  info: {},
};

const booking = graphql(createBooking, {
  name: 'createBooking',
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  }),
});

const HOCs = [booking, withApollo, withRouter];

export default HOCs.reduce((a, b) => b(a), translate('checkout')(CheckoutContainer));
