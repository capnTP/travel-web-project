import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import Input from '../../../components/Forms/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Forms/Select';
import getCountries from '../../../queries/countries/getCountries.gql';
import { getCheckoutData } from '../../../helpers/checkoutDataUtil';

import QuickCheckout from './QuickCheckout';
import style from './style.less';

class Billing extends Component {
  constructor(props) {
    super(props);
    const state = getCheckoutData();

    this.state = {
      isLogin: false,
      isOpen: false,
      form: {
        firstName: {
          value:
            state.formData && state.formData.firstName.value
              ? state.formData.firstName.value
              : null,
          error: false,
          errMessage: null,
        },
        lastName: {
          value:
            state.formData && state.formData.lastName.value ? state.formData.lastName.value : null,
          error: false,
          errMessage: null,
        },
        nationality: {
          value:
            state.formData && state.formData.nationality.value
              ? state.formData.nationality.value
              : null,
          error: false,
          errMessage: null,
        },
        contactNumber: {
          value:
            state.formData && state.formData.contactNumber.value
              ? state.formData.contactNumber.value
              : null,
          error: false,
          errMessage: null,
          flag: 'flag/tha.svg',
          code: '+66',
        },
        emailAddress: {
          value:
            state.formData && state.formData.emailAddress.value
              ? state.formData.emailAddress.value
              : null,
          error: false,
          errMessage: null,
        },
        terms: {
          value: false,
          error: false,
          errMessage: null,
        },
      },
      countryList: [],
      inputCode: null,
      inList: true,
    };
  }

  componentDidMount() {
    this.props.shouldUpdate(false);
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.getCountries !== prevProps.getCountries) {
      this.setState({ countryList: this.props.getCountries.countries }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  validateEnglishOnly = key => {
    const { value } = this.state.form[key];
    const isEnglishOnly = /^[A-Za-z]*$/.test(value);
    let error = false;
    let errMessage = '';
    if (!isEnglishOnly) {
      error = true;
      errMessage = this.props.t('Field must be in english');
    }
    const formField = { [key]: { value, error, errMessage } };
    return formField;
  };

  validateFieldsBeforeSubmit = callback => {
    const firstNameField = this.validateEnglishOnly('firstName');
    const lastNameField = this.validateEnglishOnly('lastName');

    this.setState(
      prevState => ({ form: { ...prevState.form, ...firstNameField, ...lastNameField } }),
      callback,
    );
  };

  onSubmit = e => {
    e.preventDefault();

    /**
     * NOTE: to make fields validation work when user sign-in on this page
     * and they have name or lastname that's included non-english characters
     */
    this.validateFieldsBeforeSubmit(() => {
      if (!this.checkValidation()) {
        const formData = this.state.form;
        this.props.goNext(formData);
      }
    });
  };

  onLoginSuccess = data => {
    const {
      form: {
        firstName: { value: firstName = '' } = {},
        emailAddress: { value: emailAddress = '' } = {},
      } = {},
    } = this.state;
    if ((!firstName || !emailAddress) && data) {
      this.setState({
        isLogin: true,
        form: {
          firstName: {
            value: data.firstName,
          },
          lastName: {
            value: data.lastName,
          },
          contactNumber: {
            value: data.phone,
          },
          nationality: {
            value: data.countryId,
          },
          emailAddress: {
            value: data.email,
          },
          terms: {
            value: true,
          },
        },
      });
    }
    return true;
  };

  onChange = e => {
    const data = this.state.form;
    const onlyEnglish = new RegExp(/^[a-zA-Z0-9?><;\s,~:{}()[\]\-_+=!@#$%^&*|"'\\.]*$/);
    if (onlyEnglish.test(e.target.value)) {
      data[e.target.name].value = e.target.value;
      data[e.target.name].error = e.target.value.length === 0;
      data[e.target.name].errMessage = this.props.t('this field is required');
      if (e.target.type === 'email') {
        data[e.target.name].value = e.target.value;
        data[e.target.name].error = !this.validateEmail(e.target.value);
        data[e.target.name].errMessage = this.props.t('please enter a valid email address');
      }
      if (e.target.type === 'checkbox') {
        data[e.target.name].value = e.target.checked;
        data[e.target.name].error = !e.target.checked;
        data[e.target.name].errMessage = 'Please accept our terms and condition';
      }
    } else {
      /**
       * NOTE: when a field was pre-filled with non-english characters,
       * user will not be able to edit it without next line
       * */
      data[e.target.name].value = e.target.value;
      data[e.target.name].error = true;
      data[e.target.name].errMessage = this.props.t('Field must be in english');
    }

    // TODO: use prevState
    const assignData = Object.assign({}, this.state.form, data);
    this.setState({ form: assignData });
  };

  onPhoneSelect = (flag, code) => {
    const { form } = this.state;
    const num = {
      contactNumber: {
        value: form.contactNumber.value,
        error: form.contactNumber.error,
        errMessage: form.contactNumber.errMessage,
        flag,
        code,
      },
    };
    const newData = Object.assign({}, form, num);

    this.setState({ form: newData, isOpen: false, inList: true });
  };

  onSearch = event => {
    const { value } = event.target;
    this.setState({ inputCode: value, inList: false, isOpen: true });
  };

  onSearchBlur = event => {
    const { value } = event.target;
    const { form } = this.state;
    if (value) {
      const num = {
        contactNumber: {
          value: form.contactNumber.value,
          error: form.contactNumber.error,
          errMessage: form.contactNumber.errMessage,
          flag: form.contactNumber.flag || 'flag/tha.svg',
          code: value || form.contactNumber.code || '+66',
        },
      };
      const newData = Object.assign({}, form, num);
      this.setState({ form: newData, isOpen: false });
    } else {
      const num = {
        contactNumber: {
          value: form.contactNumber.value,
          error: form.contactNumber.error,
          errMessage: form.contactNumber.errMessage,
          flag: 'flag/tha.svg',
          code: '+66',
        },
      };
      const newData = Object.assign({}, form, num);
      this.setState({ form: newData, isOpen: false, inList: true });
    }
  };

  validateEmail = email => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    return re.test(email);
  };

  checkValidation = () => {
    const {
      firstName = {},
      lastName = {},
      emailAddress = {},
      terms = {},
      nationality = {},
      contactNumber = {},
    } = this.state.form;
    if (
      firstName.value &&
      !firstName.error &&
      (lastName.value && !lastName.error) &&
      (emailAddress.value && !emailAddress.error) &&
      (nationality.value && !nationality.error) &&
      (contactNumber.value && !contactNumber.error) &&
      terms.value
    ) {
      return false;
    }

    return true;
  };

  countryCodeList = () => {
    const {
      getCountries: { countries = [] },
    } = this.props;

    return countries.map(item => item.isoCode);
  };

  countryPhoneCode = () => {
    const {
      getCountries: { countries = [] },
    } = this.props;
    return countries.reduce((o, key) => ({ ...o, [`"${key.isoCode}"`]: key.countryCode }), {});
  };

  showPhoneList = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  handleClick = e => {
    if (!this.phone_list.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  onFocus = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      getCountries: { countries = [] },
      t,
    } = this.props;
    const {
      onSubmit,
      onChange,
      onPhoneSelect,
      showPhoneList,
      onSearch,
      onSearchBlur,
      state: {
        countryList,
        isLogin,
        isOpen,
        inputCode,
        inList,
        form: { firstName, lastName, nationality, contactNumber, emailAddress, terms = {} },
      },
    } = this;
    const isDisabled = this.checkValidation();

    return (
      <form onSubmit={onSubmit}>
        <div className={style.checkout_card}>
          {!isLogin ? <QuickCheckout onLoginSuccess={this.onLoginSuccess} t={t} /> : ''}

          {/* // TODO: use classnames */}
          <div className={`${style.form} ${isLogin ? style.noBorder : ''}`}>
            <div className={style.form_group}>
              <div>
                <Input
                  errMessage={firstName.errMessage}
                  error={firstName.error}
                  isRequired
                  label={t('firstName')}
                  name="firstName"
                  onChange={onChange}
                  placeholder={t('enter your first name')}
                  value={firstName.value}
                />
              </div>
              <div>
                <Input
                  errMessage={lastName.errMessage}
                  error={lastName.error}
                  isRequired
                  label={t('lastName')}
                  name="lastName"
                  onChange={onChange}
                  placeholder={t('enter your last name')}
                  value={lastName.value}
                />
              </div>
            </div>
            <div className={style.form_group}>
              <div>
                <Select
                  errMessage={nationality.errMessage}
                  error={nationality.error}
                  isRequired
                  label={t('nationality')}
                  name="nationality"
                  onChange={onChange}
                  optionList={countries}
                  placeholder={t('please select your nationality')}
                  t={t}
                  type="nationality"
                  value={nationality.value}
                />
              </div>
              <div className={style.custom_div}>
                <label className={style.country_label} htmlFor="contactNumber">
                  <span>{t('contact number')} *</span>
                  <div className={style.phone_group}>
                    <div
                      ref={node => {
                        this.phone_list = node;
                      }}
                      className={style.country_code}
                    >
                      <div>
                        {isOpen || !inList ? (
                          <div className={style.search_input}>
                            <MaskedInput
                              guide={false}
                              mask={[/[0-9]/, /[0-9]/, /[0-9]/]}
                              onBlur={event => onSearchBlur(event)}
                              onChange={event => onSearch(event)}
                              onFocus={() => this.onFocus}
                              placeholder="XXX"
                            />
                          </div>
                        ) : (
                          <div
                            aria-hidden
                            className={style.selected}
                            onClick={showPhoneList}
                            role="button"
                          >
                            <div className={style.image_div}>
                              <img
                                alt="flag"
                                // eslint-disable-next-line no-undef
                                src={`${IMIGIX_URL}/countries/${contactNumber.flag ||
                                  'flag/tha.svg'}`}
                              />
                              <span>{contactNumber.code || '+66'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={`${style.phone_list} ${isOpen ? style.show : ''}`}>
                        <div>
                          {inputCode
                            ? countryList
                                .filter(item => item.countryCode.includes(inputCode))
                                .map(item => (
                                  <div
                                    key={item.id}
                                    onClick={() => onPhoneSelect(item.flag, `+${item.countryCode}`)}
                                    role="button"
                                    tabIndex="0"
                                    value={[item.flag, item.countryCode]}
                                  >
                                    <img
                                      alt={item.name}
                                      src={`https://theasia.imgix.net/countries/${item.flag}`}
                                    />
                                    <span>+{item.countryCode}</span>
                                  </div>
                                ))
                            : countryList.map(item => (
                                <div
                                  key={item.id}
                                  onClick={() => onPhoneSelect(item.flag, `+${item.countryCode}`)}
                                  role="button"
                                  tabIndex="0"
                                  value={[item.flag, item.countryCode]}
                                >
                                  <img
                                    alt={item.name}
                                    src={`https://theasia.imgix.net/countries/${item.flag}`}
                                  />
                                  <span>+{item.countryCode}</span>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                    <MaskedInput
                      className={contactNumber.error ? style.error : ''}
                      guide={false}
                      mask={[
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                        /[0-9]/,
                      ]}
                      name="contactNumber"
                      onChange={e => onChange(e)}
                      placeholder={t('enter number')}
                      required
                      value={contactNumber.value}
                    />
                  </div>
                  {contactNumber.error && (
                    <span className={style.error_msg}>{contactNumber.errMessage}</span>
                  )}
                </label>
              </div>
            </div>
            <div className={style.form_input}>
              <Input
                errMessage={emailAddress.errMessage}
                error={emailAddress.error}
                isRequired
                label={t('email address')}
                name="emailAddress"
                onChange={onChange}
                placeholder={t('enter your email')}
                type="email"
                value={emailAddress.value}
              />
            </div>
            <div className={style.terms}>
              <Input
                errMessage={terms.errMessage}
                error={terms.error}
                name="terms"
                onChange={onChange}
                type="checkbox"
                value={terms.value}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: t('Accept our terms & conditions'),
                }}
              />
            </div>
          </div>
          <div>
            <Button colorType="warning" disabled={isDisabled}>
              {t('continue to next step')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

Billing.propTypes = {
  getCountries: PropTypes.shape({
    countries: PropTypes.array,
  }).isRequired,
  t: PropTypes.func.isRequired,
  shouldUpdate: PropTypes.func.isRequired,
  goNext: PropTypes.func.isRequired,
};

const countries = graphql(getCountries, {
  name: 'getCountries',
  options: () => ({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  }),
});

const HOCs = [countries, withApollo, withRouter];

export default HOCs.reduce((a, b) => b(a), Billing);
