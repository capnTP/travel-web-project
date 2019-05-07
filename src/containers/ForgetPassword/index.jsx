/* eslint-disable no-inline-comments, max-len */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import InputGroup from '../../components/Forms/InputGroup';

import style from './style.less';

class ForgetPassword extends React.Component {
  state = {
    email: '',
    emailError: '',
    isSubmitting: false,
    submitDisabled: true,
    requestState: '',
  };

  validateEmail = email => {
    if (!email) {
      return 'inputErrorRequired';
    }

    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );

    if (!validEmail) {
      return 'inputErrorInvalidEmail';
    }

    return '';
  };

  submit = async () => {
    const { email } = this.state;
    const errorMessage = this.validateEmail(email);

    if (errorMessage) {
      this.setState({ emailError: errorMessage });
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      const RESET_API = `${API_SERVER}/Users/reset`; // eslint-disable-line no-undef
      const res = await axios.post(RESET_API, { email });

      if (res.status === 204) {
        this.setState({ requestState: 'done' });
      }
    } catch (e) {
      this.setState({ requestState: 'error' });
    } finally {
      this.setState({ isSubmitting: false, emailError: '' });
    }
  };

  render() {
    const { email, requestState, isSubmitting, submitDisabled, emailError } = this.state;
    const { t, i18n: { language } = {} } = this.props;

    return (
      <div className={style.ForgetPassword}>
        <Helmet>
          <title>{`${t('title')} | The Asia`}</title>
          <meta content={t('title')} name="description" />
        </Helmet>

        <div className={style.container}>
          <button
            className={classnames(style.modal_action, style.back_to_login)}
            onClick={() => {
              const { requestState: r } = this.state;
              const { history } = this.props;

              switch (r) {
                case '':
                default:
                  history.push({ search: '?popup=signing' });
                  break;
                case 'error':
                case 'done':
                  this.setState({ requestState: '' });
                  break;
              }
            }}
            type="button"
          >
            <i className="icon-arrow-left" />
          </button>

          <button
            className={classnames(style.modal_action, style.close)}
            onClick={() => {
              this.props.history.push({ search: '?popup=signing' });
            }}
            type="button"
          >
            <i className="icon-close" />
          </button>

          <h3 className={style.title}>{t('title')}</h3>

          {requestState === '' && (
            <div>
              <p className={style.description}>{t('description')}</p>

              <InputGroup errorMessage={t(emailError)} fullWidth label={t('inputLabelEmail')}>
                <TextInput
                  hasError={!!emailError}
                  id="user_email"
                  name="email"
                  onChange={event => {
                    this.setState({
                      [event.target.name]: event.target.value,
                      submitDisabled: false,
                    });
                  }}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.submit();
                    }
                  }}
                  placeholder={t('inputPlaceholderEmail')}
                  type="email"
                  value={email}
                />
              </InputGroup>

              <Button
                className={style.submit}
                colorType="primary"
                disabled={submitDisabled || isSubmitting}
                fullWidth
                loading={isSubmitting}
                onClick={this.submit}
                style={{ height: '60px', margin: '1em 0 0 0' }}
              >
                {t('buttonTextSubmit')}
              </Button>
            </div>
          )}

          {requestState === 'done' && (
            <div>
              <p className={style.message}>{t('done_message_1')}</p>

              <p className={style.message}>
                <strong>{email}</strong>
              </p>

              {language !== 'ko' && language !== 'zh' && (
                <p className={style.message}>
                  {t('done_message_2')}

                  <a href="mailto:cs@theasia.com" style={{ margin: '0 0 0 .5em' }}>
                    cs@theasia.com
                  </a>
                </p>
              )}

              {(language === 'ko' || language === 'zh') && (
                <p className={style.message}>
                  {t('done_message_2')}

                  <a href="mailto:cs@theasia.com" style={{ margin: '0 0 0 .5em' }}>
                    cs@theasia.com
                  </a>

                  {t('done_message_3')}
                </p>
              )}
            </div>
          )}

          {requestState === 'error' && (
            <div>
              <p style={{ textAlign: 'center', margin: '0 0 2em 0' }}>{t('errorEmailNotFound')}</p>

              <Button
                colorType="primary"
                fullWidth
                onClick={() => {
                  this.setState({ requestState: '' });
                }}
                outlined
                style={{ height: '60px' }}
              >
                {t('buttonTextRetry')}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  t: PropTypes.func,
};

ForgetPassword.defaultProps = {
  i18n: {
    language: '',
  },
  history: {
    push() {},
  },
  t() {},
};

export default translate('forgottenPassword')(withRouter(ForgetPassword));
