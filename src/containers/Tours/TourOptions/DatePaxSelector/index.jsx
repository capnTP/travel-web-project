import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { SingleDatePicker, DayPickerSingleDateController } from 'react-dates';
import moment from 'moment';

import Error from '../../../../components/Forms/Error';
import Overlay from '../../../../components/Tours/Overlay';
import Button from '../../../../components/Button';

import BottomBar from './BottomBar';
import PaxInput from './PaxInput';
import style from './style.less';

class DatePaxSelector extends React.Component {
  constructor(props) {
    super(props);
    const {
      formData,
      savedUserSelection: { date = '', adults = 0, children = 0, infants = 0 } = {},
      showCalendarPaxError,
    } = props;
    const childrenData = formData ? formData.children || 0 : children;
    const infantsData = formData ? formData.infants || 0 : infants;
    this.state = {
      formData: {
        date: formData ? formData.date || '' : date,
        adults: formData ? formData.adults || 0 : adults,
        children: showCalendarPaxError ? 0 : childrenData,
        infants: showCalendarPaxError ? 0 : infantsData,
      },
      showDateSelector: false,
      error: false,
      btnDisabled: true,
      errMessage: '',
      showPaxCalendar: props.showPaxCalendar,
      showCalendarPaxError,
      openModal: false,
      showGallery: false,
      showToast: false,
    };
    this.showPax = this.showPax.bind(this);
    this.closeError = this.closeError.bind(this);
    this.bookingSelection = this.bookingSelection.bind(this);
    this.modalAction = this.modalAction.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showPaxCalendar !== prevState.showPaxCalendar) {
      const { formData = {}, showCalendarPaxError } = nextProps;
      if (Object.keys(formData).length) {
        return {
          showPaxCalendar: nextProps.showPaxCalendar,
          showCalendarPaxError,
          formData,
        };
      }
      return {
        showPaxCalendar: nextProps.showPaxCalendar,
        showCalendarPaxError: nextProps.showCalendarPaxError,
      };
    }
    return null;
  }

  onValueChange = name => value => {
    this.setState({ formData: { ...this.state.formData, [name]: value } }, () => {
      this.checkValidate();
    });
  };

  mOnValueChange = name => value => {
    this.setState({ formData: { ...this.state.formData, [name]: value } }, () => {
      this.checkValidate();
    });
  };

  showPax = () => {
    this.setState(prevState => ({
      showPaxCalendar: !prevState.showPaxCalendar,
    }));
  };

  checkValidate = () => {
    const {
      formData: { adults = 0, children = 0, infants = 0, date = null },
    } = this.state;
    const {
      calendarLimit: { minimumPax = 0, maximumPax = 0 },
    } = this.props;
    const totalPax = adults + children + infants;

    if (totalPax >= minimumPax && date) {
      if (maximumPax !== 0 && totalPax > maximumPax) {
        this.setState({
          btnDisabled: true,
        });
      } else {
        this.setState({
          error: false,
          btnDisabled: false,
        });
      }
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  validateForm = type => {
    const {
      formData: { adults = 0, children = 0, infants = 0, date = null },
    } = this.state;
    const {
      calendarLimit: { minimumPax = 0, maximumPax = 0 },
      tourType,
    } = this.props;
    const totalPax = adults + children + infants;

    if (totalPax >= minimumPax && date) {
      if (maximumPax !== 0 && totalPax > maximumPax) {
        const message = `Note: Maximum pax is ${maximumPax}`;
        this.setState(
          {
            errMessage: message,
            error: true,
            btnDisabled: true,
            showToast: type === 'mobile',
          },
          () => {
            setTimeout(() => {
              this.setState({
                showToast: false,
              });
            }, 3000);
          },
        );
      } else {
        this.setState({
          error: false,
          btnDisabled: false,
        });
      }
    } else {
      let message = '';
      const productType = tourType === 'NORMAL' ? this.props.t('pax') : this.props.t(tourType);
      if (!date) {
        message = this.props.t('select your tour date');
      } else if (totalPax < minimumPax) {
        message = this.props.t('minimum pax', { number: minimumPax, type: productType });
      } else if (totalPax > maximumPax) {
        message = this.props.t('maximum pax', { number: maximumPax, type: productType });
      } else {
        message = `Note: Minimum pax is ${minimumPax} and maximum pax is ${maximumPax}`;
      }
      this.setState(
        {
          errMessage: message,
          error: true,
          btnDisabled: true,
          showToast: type === 'mobile',
        },
        () => {
          setTimeout(() => {
            this.setState({
              showToast: false,
            });
          }, 3000);
        },
      );
    }
  };

  closeError = () => {
    this.setState({
      error: false,
      showCalendarPaxError: '',
    });
  };

  bookingSelection = () => {
    if (this.props.hasTour) {
      this.props.openCalendarPax();
      this.setState({
        openModal: true,
      });
    }

    this.props.seeTours();
  };

  modalAction = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  confirm = () => {
    if (!this.state.btnDisabled) {
      this.setState({
        openModal: false,
      });
      this.props.onUpdate(this.state.formData);
    }
    this.validateForm('mobile');
  };

  onClickUpdate = () => {
    if (!this.state.btnDisabled) {
      this.props.onUpdate(this.state.formData);
    }
    this.validateForm('desktop');
  };

  render() {
    const {
      state: {
        formData,
        showDateSelector,
        showPaxCalendar,
        error,
        errMessage,
        showToast,
        showCalendarPaxError = '',
      },
      closeError,
    } = this;
    const {
      openCalendarPax,
      calendarLimit: {
        startDate,
        endDate,
        excludeDates = [],
        blockedDays = [],
        paxInfo: { children: childrenCount = 0, infants: infantsCount = 0 } = {},
      } = {},
      t = () => {},
      hasTour,
      travellerRequirement: {
        minimumAdultAge = '',
        minimumChildAge = '',
        minimumChildHeight = '',
      } = {},
      currentDate = moment(),
      tourType,
    } = this.props;

    const {
      state: { openModal },
      modalAction,
      bookingSelection,
      confirm,
      onClickUpdate,
    } = this;
    const selectedDate =
      formData && formData.date ? moment(formData.date).format('DD / M / YYYY') : '';

    const adultRequirements = minimumAdultAge
      ? t('minimum adult age', { number: minimumAdultAge })
      : t('no specific');
    const minChildAge = minimumChildAge ? t('minimum child age', { number: minimumChildAge }) : '';
    const minChildHeight = minimumChildHeight
      ? t('minimum child height', { number: minimumChildHeight })
      : '';
    const childRequirements =
      minimumChildAge || minimumChildHeight
        ? `${minChildAge} ${
            minimumChildAge && minimumChildHeight ? t('and') : ''
          } ${minChildHeight}`
        : t('no specific');

    const adultsPaxLocaleSelection = !childrenCount && !infantsCount ? 'passengers' : 'adults';
    const adultsPaxLocale = tourType === 'NORMAL' ? adultsPaxLocaleSelection : tourType;
    return (
      <div>
        {/* for mobile date selection */}
        <BottomBar date={selectedDate} hasTour={hasTour} onClick={bookingSelection} t={t} />

        <Overlay closeModal={modalAction} isOpen={openModal}>
          {showToast && (
            <div className={style.toast}>
              <span>{errMessage}</span>
            </div>
          )}
          <div className={style.overlay}>
            <div>
              <DayPickerSingleDateController
                date={formData.date}
                focused
                isDayBlocked={day => blockedDays.indexOf(day.format('dddd').toLowerCase()) > -1}
                isOutsideRange={date =>
                  !date.isBefore(endDate) ||
                  date.isBefore(startDate) ||
                  date.isBefore(
                    moment(currentDate)
                      .utc(true)
                      .add(13, 'hours'),
                  ) ||
                  excludeDates.indexOf(date.format('YYYY-MM-DD')) > -1
                }
                onDateChange={this.mOnValueChange('date')}
                onFocusChange={() => {
                  this.setState({
                    showDateSelector: !this.state.showDateSelector,
                  });
                }}
              />
            </div>
            <div className={style.pax_selection}>
              <PaxInput
                isMobile
                label={t(adultsPaxLocale)}
                onChange={this.mOnValueChange('adults')}
                requirement={adultRequirements}
                value={formData.adults}
              />
              {tourType === 'NORMAL'
                ? [
                    childrenCount > 0 && (
                      <PaxInput
                        key="pax_2"
                        isMobile
                        label={t('children')}
                        onChange={this.mOnValueChange('children')}
                        requirement={childRequirements}
                        value={formData.children}
                      />
                    ),
                    infantsCount > 0 && (
                      <PaxInput
                        key="pax_3"
                        isMobile
                        label={t('infants')}
                        onChange={this.mOnValueChange('infants')}
                        value={formData.infants}
                      />
                    ),
                  ]
                : ''}
            </div>
            <div className={style.confirm}>
              <button onClick={confirm} type="button">
                {t('confirm')}
              </button>
            </div>
          </div>
        </Overlay>
        {/* closing for mobile date selection */}

        <div className={` ${style.pax_container} ${showPaxCalendar ? style.collapse : ''}`}>
          <div
            aria-hidden
            className={style.div_collapse_date}
            onClick={openCalendarPax}
            role="button"
          >
            {tourType === 'NORMAL' ? (
              <span>{t('change dates and passenger numbers')}</span>
            ) : (
              <span>{t('change pax date number', { type: t(tourType) })}</span>
            )}

            <div>
              <span className="icon icon-arrow-up" />
            </div>
          </div>

          <div className={style.pax_calendar_container}>
            <div className={style.date_container}>
              <Error
                closeError={closeError}
                errMessage={showCalendarPaxError || errMessage}
                error={!!showCalendarPaxError || error}
              />
              <div className={style.date_pax_selector}>
                <div className={style.right}>
                  <div>
                    <div style={{ margin: '0 0 10px 0' }}>{t('select your tour date')}</div>
                    <SingleDatePicker
                      autoFocus
                      date={formData.date}
                      focused={showDateSelector}
                      inputIconPosition="after"
                      isDayBlocked={day =>
                        blockedDays.indexOf(day.format('dddd').toLowerCase()) > -1
                      }
                      isOutsideRange={date =>
                        !date.isBefore(endDate) ||
                        date.isBefore(startDate) ||
                        date.isBefore(
                          moment(currentDate)
                            .utc(true)
                            .add(13, 'hours'),
                        ) ||
                        excludeDates.indexOf(date.format('YYYY-MM-DD')) > -1
                      }
                      onDateChange={this.onValueChange('date')}
                      onFocusChange={() => {
                        this.setState({
                          showDateSelector: !this.state.showDateSelector,
                        });
                      }}
                      showDefaultInputIcon
                    />
                  </div>
                  <Button
                    className={style.update}
                    colorType="warning"
                    onClick={onClickUpdate}
                    style={{ margin: '60px 0 0 0' }}
                    type="button"
                  >
                    {t('update')}
                  </Button>
                </div>
                <div className={style.pax}>
                  <div>
                    {tourType === 'NORMAL' ? (
                      <span>{t('select the number of passengers')}</span>
                    ) : (
                      <span>{t('number of passengers', { type: t(tourType) })}</span>
                    )}
                  </div>
                  <PaxInput
                    label={t(tourType === 'NORMAL' ? 'adults' : tourType)}
                    onChange={this.onValueChange('adults')}
                    requirement={adultRequirements}
                    value={formData.adults}
                  />
                  {tourType === 'NORMAL'
                    ? [
                        childrenCount > 0 && (
                          <PaxInput
                            key="pax_2"
                            label={t('children')}
                            onChange={this.onValueChange('children')}
                            requirement={childRequirements}
                            value={formData.children}
                          />
                        ),
                        infantsCount > 0 && (
                          <PaxInput
                            key="pax_3"
                            label={t('infants')}
                            onChange={this.onValueChange('infants')}
                            value={formData.infants}
                          />
                        ),
                      ]
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatePaxSelector.propTypes = {
  currentDate: PropTypes.string,
  formData: PropTypes.object,
  onUpdate: PropTypes.func,
  showPaxCalendar: PropTypes.bool,
  openCalendarPax: PropTypes.func,
  calendarLimit: PropTypes.shape({
    endDate: PropTypes.object,
    excludeDates: PropTypes.arrayOf(PropTypes.string),
    blockedDays: PropTypes.arrayOf(PropTypes.string),
    minimumPax: PropTypes.number,
    maximumPax: PropTypes.number,
  }),
  savedUserSelection: PropTypes.shape({
    date: PropTypes.string,
    adults: PropTypes.string,
    children: PropTypes.string,
    infants: PropTypes.string,
  }),
  t: PropTypes.func,
  hasTour: PropTypes.bool,
  seeTours: PropTypes.func,
  travellerRequirement: PropTypes.object,
  tourType: PropTypes.string,
  showCalendarPaxError: PropTypes.string,
};

DatePaxSelector.defaultProps = {
  currentDate: moment(),
  formData: {},
  onUpdate: () => {},
  showPaxCalendar: false,
  openCalendarPax: () => {},
  calendarLimit: {
    endDate: moment(),
    excludeDates: [],
    blockedDays: [],
    minimumPax: 0,
    maximumPax: 0,
  },
  savedUserSelection: {},
  t() {},
  hasTour: false,
  seeTours: () => {},
  travellerRequirement: {
    minimumAdultAge: null,
    minimumChildAge: null,
    minimumChildHeight: null,
  },
  tourType: '',
  showCalendarPaxError: '',
};

export default DatePaxSelector;
