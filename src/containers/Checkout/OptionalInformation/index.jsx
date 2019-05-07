import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';
import Input from '../../../components/Forms/Input';
import Select from '../../../components/Forms/Select';
import Textarea from '../../../components/Forms/Textarea';
import googleCommerce from '../../../helpers/googleEcommerce';
import Error from '../../../components/Forms/Error';
import { getCheckoutData } from '../../../helpers/checkoutDataUtil';

import style from './style.less';

class OptionalInformation extends React.Component {
  state = {
    form: {
      specialRequest: { value: null, error: false, errMessage: null },
      passportNumber: { value: null, error: false, errMessage: null },
      flightNumber: { value: null, error: false, errMessage: null },
      hotelInfo: { value: null, error: false, errMessage: null },
      pickupLocation: { value: null, error: false, errMessage: null },
      pickupTime: { value: null, error: false, errMessage: null },
      pickupLocationTime: { value: null, error: false, errMessage: null },
      selectedTime: { value: null, error: false, errMessage: null },
      dropOffPlace: { value: null, error: false, errMessage: null },
    },
  };

  componentDidMount() {
    if (window) {
      window.scrollTo(0, 0);
    }

    const checkoutData = getCheckoutData();
    const {
      productId,
      productTitle,
      userCurrency = {},
      userInput: { adults = 0, children = 0, infants = 0 } = {},
      selectedSubProduct: { finalPrice: { exchange = {} } = {} } = {},
    } = checkoutData;

    this.props.shouldUpdate(false);

    if (!OptionalInformation.isStep2) {
      googleCommerce.setAction.checkout.step2({
        id: productId,
        name: productTitle,
        currency: userCurrency.code,
        price: exchange.adults * adults + exchange.children * children + exchange.infants * infants,
      });
      OptionalInformation.isStep2 = true;
    }
  }

  onChange = e => {
    const data = this.state.form;
    const onlyEnglish = new RegExp(/^[a-zA-Z0-9?><;\s,~:{}()[\]\-_+=!@#$%^&*|"'\\.]*$/);
    if (onlyEnglish.test(e.target.value)) {
      data[e.target.name].value = e.target.value;
      data[e.target.name].error = e.target.value.length === 0 && e.target.required;
      data[e.target.name].errMessage = this.props.t('this field is required');
    } else {
      data[e.target.name].error = true;
      data[e.target.name].errMessage = this.props.t('Field must be in english');
    }

    // TODO: use prevState
    const assignData = Object.assign({}, this.state.form, data);
    this.setState({ form: assignData });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createBooking(this.state.form);
  };

  render() {
    const {
      onChange,
      props: { error, errMessage, t },
      state: {
        form: {
          specialRequest,
          passportNumber,
          flightNumber,
          hotelInfo,
          pickupLocation,
          pickupTime,
          pickupLocationTime,
          selectedTime,
          dropOffPlace,
        },
      },
    } = this;

    const {
      selectedSubProduct: {
        checkoutInfo: {
          isFlightInfoRequired = false,
          isHotelNameRequired = false,
          isPassportRequired = false,
          isPickupDetailRequired = false,
          isPickupTimeRequired = false,
          isDropOffRequired = false,
        } = {},
        selectedTime: isSelectedTime = [],
        pickupLocationTime: isPickupLocationTime = [],
      } = {},
      slug,
    } = getCheckoutData();

    const isRequired =
      isFlightInfoRequired ||
      isHotelNameRequired ||
      isPassportRequired ||
      isPickupDetailRequired ||
      isPickupTimeRequired ||
      selectedTime.length ||
      pickupLocationTime.length ||
      isDropOffRequired;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={style.checkout_card}>
          <Error errMessage={errMessage} error={error} slug={slug} t={t} />

          <div className={style.form}>
            <div className={style.txtarea}>
              <Textarea
                errMessage={specialRequest.errMessage}
                error={specialRequest.error}
                label={t('special requests subject')}
                name="specialRequest"
                onChange={onChange}
                placeholder={t('any special requests')}
                value={specialRequest.value}
              />
            </div>

            {isRequired && (
              <div className={style.txt_label}>
                <span className="txt_bold">{t('pick-up information')}</span>
              </div>
            )}

            {/* // TODO: use classnames */}
            <div
              className={`${style.form_group}
              ${isPassportRequired && isFlightInfoRequired ? style.col_6 : ''}
              ${!isPassportRequired && !isFlightInfoRequired ? style.hide : ''}
              `}
            >
              {isPassportRequired && (
                <div>
                  <Input
                    errMessage={passportNumber.errMessage}
                    error={passportNumber.error}
                    isRequired={isPassportRequired}
                    label={t('passport number')}
                    name="passportNumber"
                    onChange={onChange}
                    placeholder={t('enter your passport')}
                    value={passportNumber.value}
                  />
                </div>
              )}

              {isFlightInfoRequired && (
                <div>
                  <Input
                    errMessage={flightNumber.errMessage}
                    error={flightNumber.error}
                    isRequired={isFlightInfoRequired}
                    label={t('flight number')}
                    name="flightNumber"
                    onChange={onChange}
                    placeholder={t('enter your flight')}
                    value={flightNumber.value}
                  />
                </div>
              )}
            </div>
            <div
              className={`${style.form_group}
              ${isPickupDetailRequired && isPickupTimeRequired ? style.col_6 : ''}
              ${!isPickupDetailRequired && !isPickupTimeRequired ? style.hide : ''}
                `}
            >
              {isPickupDetailRequired && (
                <div>
                  <Input
                    errMessage={pickupLocation.errMessage}
                    error={pickupLocation.error}
                    isRequired={isPickupDetailRequired}
                    label={t('pick-up location')}
                    name="pickupLocation"
                    onChange={onChange}
                    placeholder={t('where to pick')}
                    value={pickupLocation.value}
                  />
                </div>
              )}

              {isPickupTimeRequired && (
                <div>
                  <Input
                    errMessage={pickupTime.errMessage}
                    error={pickupTime.error}
                    isRequired={isPickupTimeRequired}
                    label={t('pick-up time')}
                    name="pickupTime"
                    onChange={onChange}
                    placeholder={t('what time to pick')}
                    value={pickupTime.value}
                  />
                </div>
              )}
            </div>

            {isHotelNameRequired && (
              <div className={style.txtarea}>
                <Input
                  errMessage={hotelInfo.errMessage}
                  error={hotelInfo.error}
                  isRequired={isHotelNameRequired}
                  label={t('hotel name and address')}
                  name="hotelInfo"
                  onChange={onChange}
                  placeholder={t('enter your hotel name')}
                  value={hotelInfo.value}
                />
              </div>
            )}
            <div
              className={`${style.form_group}
              ${isPickupLocationTime.length && isSelectedTime.length ? style.col_6 : ''}
              ${!isPickupLocationTime.length && !isSelectedTime.length ? style.hide : ''}
              `}
            >
              {isPickupLocationTime.length > 0 && (
                <div>
                  {/* // TODO: bug
                    Field must be in English when selected 14:00-14:30
                     */}
                  <Select
                    errMessage={pickupLocationTime.errMessage}
                    error={pickupLocationTime.error}
                    isRequired
                    label={t('Pickup Location Time')}
                    name="pickupLocationTime"
                    onChange={onChange}
                    optionList={isPickupLocationTime.map(item => ({
                      id: `${item.time} - ${item.location}`,
                      name: `${item.time} - ${item.location}`,
                    }))}
                    placeholder={t('Pickup Location Time')}
                    t={t}
                    type="pickupLocationTime"
                    value={pickupLocationTime.value}
                  />
                </div>
              )}

              {isSelectedTime.length > 0 && (
                <div>
                  <Select
                    errMessage={selectedTime.errMessage}
                    error={selectedTime.error}
                    isRequired
                    label={t('selected time')}
                    name="selectedTime"
                    onChange={onChange}
                    optionList={isSelectedTime.map(item => ({ id: item.time, name: item.time }))}
                    placeholder={t('selected time')}
                    t={t}
                    type="selectedTime"
                    value={selectedTime.value}
                  />
                </div>
              )}
            </div>

            {isDropOffRequired && (
              <div className={style.form_group}>
                <Input
                  errMessage={dropOffPlace.errMessage}
                  error={dropOffPlace.error}
                  isRequired={isDropOffRequired}
                  label={t('drop off place')}
                  name="dropOffPlace"
                  onChange={onChange}
                  placeholder={t('enter your hotel name')}
                  value={dropOffPlace.value}
                />
              </div>
            )}
          </div>

          <div>
            <Button colorType="warning" text={t('continue to next step')} type="submit">
              {t('continue to next step')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

OptionalInformation.propTypes = {
  createBooking: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  shouldUpdate: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errMessage: PropTypes.string,
};

OptionalInformation.defaultProps = {
  error: false,
  errMessage: '',
};

export default OptionalInformation;
