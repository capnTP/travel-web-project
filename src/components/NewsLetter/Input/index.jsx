import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import classnames from 'classnames';

import TextInput from '../../TextInput';
import SocialButtons from '../../SocialButtons';
import Button from '../../Button';
import validateEmail from '../../../helpers/validateEmail';
import locale from '../../../helpers/locale';

import style from './style.less';

class SubscriptionInput extends Component {
  state = {
    email: '',
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.success && state.email) {
      return {
        ...state,
        email: '',
      };
    }
    return null;
  };

  onChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSignUp = event => {
    event.preventDefault();
    const { email } = this.state;
    const isValid = validateEmail(email);
    if (isValid) {
      this.props.onSubscribe(email);
    }
  };

  render() {
    const lang = locale.get() || 'en';
    const { loading, error } = this.props;
    return (
      <I18n ns="common">
        {(t, { i18n }) => (
          <div className={style.newsletter_container}>
            <div className={style.content}>
              <div className={style.info}>
                <span>{i18n.t('stay updated')}</span>
                <span>{i18n.t('about our latest')}</span>
                <span>{i18n.t('or follow')}</span>
              </div>
              <div className={style.input_info}>
                <div>
                  {error ? <span className={style.error}>{i18n.t('emailExist')}</span> : null}
                  <form
                    className={classnames('CTA_newsletter', style.form_group)}
                    onSubmit={this.onSignUp}
                  >
                    <TextInput
                      name="email"
                      onChange={this.onChange}
                      placeholder={i18n.t('email')}
                      required
                      type="email"
                      value={this.state.email}
                    />
                    <Button
                      className="CTA_newsletter"
                      colorType="warning"
                      disabled={loading}
                      loading={loading}
                      type="submit"
                    >
                      <span>{i18n.t('signUp')}</span>
                    </Button>
                  </form>
                </div>
                <div className={style.social_icons}>
                  <SocialButtons language={lang} />
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

SubscriptionInput.propTypes = {
  onSubscribe: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

SubscriptionInput.defaultProps = {
  onSubscribe: () => {},
  loading: false,
  error: false,
};

export default SubscriptionInput;
