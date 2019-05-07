import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import classnames from 'classnames';
import queryString from 'query-string';

import Checkbox from '../../components/Checkbox';
import { Facebook, Google } from '../../components/SocialLogin';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import user from '../../helpers/user';
import locale from '../../helpers/locale';
import SeoHelper from '../../components/SeoHelper';

import style from './style.less';

const getErrorMessage = (resErr, t, translationKeys) => {
  const { message } = resErr;

  switch (true) {
    case message === 'Password Mismatch':
      return t(translationKeys.errorPasswordMismatch);
    case message.includes(
      'The `Users` instance is not valid. Details: `email` Email already exists',
    ):
      return t(translationKeys.errorEmailExists);
    case message === 'Login Failed':
    default:
      return t(translationKeys.errorLoginFailed);
  }
};

class Signing extends React.Component {
  constructor(props) {
    super(props);
    // if user jump directly using url, redirect to /profile if already logged in
    this.state = {
      type: props.type === 'register' ? 'type_register' : 'type_login',
      common: {
        email: '',
        password: '',
      },
      register: {
        confirmPassword: '',
        terms_accepted_at: false,
      },
      checkError: {
        email: false,
        password: false,
        confirmPassword: false,
        terms_accepted_at: false,
      },
      responseErr: false,
      loader: false,
    };
    this.resErr = { name: 'Error', message: 'Login Failed', details: '' };
    this.openRegister = this.openRegister.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.getRegister = this.getRegister.bind(this);
    this.getLogin = this.getLogin.bind(this);
    this.getForm = this.getForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getForm(e) {
    e.preventDefault();
    if (this.state.type === 'type_login') {
      this.getLogin();
    } else {
      this.getRegister();
    }
  }

  getRegister() {
    this.setState({
      loader: true,
    });
    const values = Object.assign({}, this.state.common, this.state.register);
    const isError = this.validateBlank(values);

    if (isError) {
      this.setState({ loader: false });
      return;
    }
    if (values.password === values.confirmPassword) {
      delete values.confirmPassword;
      values.lang_id = locale.get().id;
      values.terms_accepted_at = moment().format(__DATE_FORMAT__); // eslint-disable-line no-undef, taken from webpack globals
      const status = this.props.registerUser({
        variables: {
          input: {
            ...values,
          },
        },
      });

      status
        .then(() => {
          this.openLogin();
        })
        .catch(err => {
          Object.assign(this.resErr, JSON.parse(err.graphQLErrors[0].message));
          this.setState({ responseErr: true, loader: false });
        });
    } else {
      this.resErr.message = 'Password Mismatch';
      this.setState({
        responseErr: true,
        loader: false,
      });
    }
  }

  getLogin() {
    this.setState({ loader: true });

    const values = this.state.common;
    const isError = this.validateBlank(values);

    if (isError) {
      this.setState({ loader: false });
      return null;
    }

    return this.props
      .loginUser({
        variables: {
          input: {
            ...values,
          },
        },
      })
      .then(res => {
        const userData = res.data.loginUser;
        user.set(userData);

        if (userData) {
          const parsed = queryString.parse(location.search);
          if (parsed.from === 'home') {
            window.location.href = '/';
            return;
          }

          if (parsed.from === 'checkout') {
            this.props.history.replace({ search: '', state: this.props.history.location.state });
            return;
          }

          this.props.history.goBack();
        } else {
          this.setState({ responseErr: true, loader: false });
        }
      })
      .catch(() => {
        this.resErr = { message: 'Login Failed' };
        this.setState({ responseErr: true, loader: false });
      });
  }

  socialLogin = input =>
    this.props
      .socialLogin({
        variables: { input },
      })
      .then(res => {
        const { socialLogin: userData } = res.data;
        user.set(userData);
        this.props.history.goBack();
      })
      .catch(err => {
        Object.assign(this.resErr, JSON.parse(err.graphQLErrors[0].message));
        this.setState({ responseErr: true, loader: false });
      });

  validateBlank(values) {
    const keys = Object.keys(values);
    let isError = false;

    const { common, checkError, register } = this.state;

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] in common && (!common[keys[i]] || common[keys[i]].length === 0)) {
        checkError[keys[i]] = true;
        isError = true;
      } else if (keys[i] in register && (!register[keys[i]] || register[keys[i]].length === 0)) {
        checkError[keys[i]] = true;
        isError = true;
      } else {
        checkError[keys[i]] = false;
      }
    }

    if (isError) {
      this.setState({
        checkError,
      });
      return true;
    }
    return false;
  }

  handleChange(event) {
    const { common, register } = this.state;
    if (event.target.name === 'email' || event.target.name === 'password') {
      common[event.target.name] =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    } else {
      register[event.target.name] =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }
    this.setState({
      common,
      register,
    });
  }

  openLogin(e) {
    if (e) e.preventDefault();
    this.setState({
      type: 'type_login',
      responseErr: false,
      loader: false,
    });
  }

  openRegister(e) {
    if (e) e.preventDefault();
    this.setState({
      type: 'type_register',
      responseErr: false,
    });
  }

  closePopup() {
    const { location = {}, context = {} } = this.props;

    const parsed = queryString.parse(location.search);
    if (parsed.from === 'home' || (location.pathname.includes('/account') && !context.user)) {
      window.location.href = '/';
      return;
    }

    this.props.history.push({ search: '' });
  }

  render() {
    const data = this.constructor.translationKeys;
    const { t, location } = this.props;

    const isCheckoutPage = /^\/checkout\//.test(location.pathname);

    return (
      <div className={style.Signing}>
        <SeoHelper description={t(data.htmlTitle)} noIndexNoFollow title={t(data.htmlTitle)} />

        <div className={style.css_main_signing}>
          <div
            className={classnames(style.css_user_signing, this.state.type, style[this.state.type])}
          >
            <button
              className={classnames(style.modal_action, style.back_to_login)}
              onClick={this.openLogin}
              type="button"
            >
              <i className="icon-arrow-left" />
            </button>

            <button
              className={classnames(style.modal_action, style.close)}
              onClick={this.closePopup}
              type="button"
            >
              <i className="icon-close" />
            </button>

            {this.state.type === 'type_register' && (
              <h2 style={{ textAlign: 'center', margin: '0 0 30px 0' }}>
                {t(data.registrationTitle)}
              </h2>
            )}

            <div className={classnames('css_signing_social_login', style.social_login)}>
              <Facebook className={style.social} onClick={this.socialLogin}>
                <Button className={style.social} colorType="secondary" fullWidth outlined>
                  <i className="icon-facebook-outline" />

                  {t(data.facebookButtonText)}
                </Button>
              </Facebook>

              <Google className={style.social} onClick={this.socialLogin}>
                <Button
                  className={style.social}
                  colorType="danger"
                  fullWidth
                  outlined
                  style={{ marginBottom: '1em' }}
                >
                  <i className="icon-googleplus-outline" />

                  {t(data.googleButtonText)}
                </Button>
              </Google>
            </div>

            <div className={style.or}>{t(data.or)}</div>

            <form>
              {this.state.responseErr && (
                <div className={style.error_message}>
                  <span>{getErrorMessage(this.resErr, t, data)}</span>
                </div>
              )}

              <div
                className={classnames(style.input_group, {
                  [style['has-error']]: this.state.checkError.email,
                })}
              >
                <label htmlFor="user_email">{t(data.emailInputLabel)}</label>

                <TextInput
                  hasError={!!this.state.checkError.email}
                  id="user_email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder={t(data.emailInputPlaceholder)}
                  value={this.state.common.email}
                />

                <div className={style.error_message}>{t(data.errorBlank)}</div>
              </div>

              <div
                className={classnames(style.input_group, {
                  [style['has-error']]: this.state.checkError.password,
                })}
              >
                <label htmlFor="user_password">{t(data.passwordInputLabel)}</label>

                <TextInput
                  hasError={!!this.state.checkError.password}
                  id="user_password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder={t(data.passwordInputPlaceholder)}
                  type="password"
                  value={this.state.common.password}
                />

                <div className={style.error_message}>{t(data.errorBlank)}</div>
              </div>

              <div className="css_signing_input_register">
                <div
                  className={classnames(style.input_group, {
                    [style['has-error']]: this.state.checkError.confirmPassword,
                  })}
                >
                  <label htmlFor="user_password_confirm">{t(data.confirmPasswordInputLabel)}</label>

                  <TextInput
                    hasError={!!this.state.checkError.confirmPassword}
                    id="user_password_confirm"
                    name="confirmPassword"
                    onChange={this.handleChange}
                    placeholder={t(data.confirmPasswordInputPlaceholder)}
                    type="password"
                    value={this.state.common.confirmPassword}
                  />

                  <div className={style.error_message}>{t(data.errorBlank)}</div>
                </div>
              </div>

              {this.state.type === 'type_register' && (
                <div className={style.terms_and_conditions_wrapper}>
                  <Checkbox
                    hasError={this.state.checkError.terms_accepted_at}
                    id="terms_accepted_at"
                    label={t(data.termsAcceptedAtInputLabel)}
                    name="terms_accepted_at"
                    onChange={this.handleChange}
                    value={this.state.register.terms_accepted_at}
                  />

                  <a href="terms" target="_blank">
                    {t(data.terms)}
                  </a>
                </div>
              )}

              <Button
                colorType="primary"
                disabled={this.state.loader}
                fullWidth
                loading={this.state.loader}
                onClick={this.getForm}
                style={{ height: '60px', marginTop: '1em' }}
              >
                <span className="css_button_text_login">{t(data.loginButtonText)}</span>
                <span className="css_button_text_register">{t(data.registerButtonText)}</span>
              </Button>

              {!isCheckoutPage && (
                <div className={style.other_options}>
                  <a onClick={this.openRegister} role="button" tabIndex="0">
                    {t(data.registerLinkText)}
                  </a>

                  <span>|</span>

                  <Link to="?popup=forgetpassword">{t(data.forgotPassword)}</Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signing.propTypes = {
  context: PropTypes.object,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  registerUser: PropTypes.func,
  socialLogin: PropTypes.func,
  type: PropTypes.string,
  t: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Signing.defaultProps = {
  context: {
    user: null,
  },
  history: {},
  loginUser() {},
  registerUser() {},
  socialLogin() {},
  type: '',
  t() {},
  location: {
    pathname: '',
  },
};

Signing.translationKeys = {
  confirmPasswordInputLabel: 'confirmPasswordInputLabel',
  confirmPasswordInputPlaceholder: 'confirmPasswordInputPlaceholder',
  emailInputLabel: 'emailInputLabel',
  emailInputPlaceholder: 'emailInputPlaceholder',
  errorBlank: 'errorBlank',
  errorEmailExists: 'errorEmailExists',
  errorLoginFailed: 'errorLoginFailed',
  errorPasswordMismatch: 'errorPasswordMismatch',
  facebookButtonText: 'facebookButtonText',
  forgotPassword: 'forgotPassword',
  googleButtonText: 'googleButtonText',
  htmlTitle: 'htmlTitle',
  loginButtonText: 'loginButtonText',
  or: 'or',
  passwordInputLabel: 'passwordInputLabel',
  passwordInputPlaceholder: 'passwordInputPlaceholder',
  registerButtonText: 'registerButtonText',
  registerLinkText: 'registerLinkText',
  registrationTitle: 'registrationTitle',
  terms: 'terms',
  termsAcceptedAtInputLabel: 'termsAcceptedAtInputLabel',
};

export default compose(
  graphql(
    gql`
      mutation registerUser($input: Register!) {
        registerUser(input: $input) {
          email
        }
      }
    `,
    {
      name: 'registerUser',
    },
  ),
  graphql(
    gql`
      mutation loginUser($input: Login!) {
        loginUser(input: $input) {
          id

          ttl
          created
          userId
        }
      }
    `,
    {
      name: 'loginUser',
    },
  ),
  graphql(
    gql`
      mutation socialLogin($input: SocialLogin!) {
        socialLogin(input: $input) {
          id
          ttl
          created
          userId
        }
      }
    `,
    {
      name: 'socialLogin',
    },
  ),
)(withApollo(translate('signing')(withRouter(Signing))));
