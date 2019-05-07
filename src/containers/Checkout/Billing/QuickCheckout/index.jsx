import React from 'react';
import PropTypes from 'prop-types';

import LoginButton from '../../../../components/Signing';

import style from './style.less';

const QuickCheckout = ({ onLoginSuccess, t }) => (
  <div className={style.instruction}>
    <span className="txt_bold">
      <LoginButton className={style.user_account} from="checkout">
        {res => {
          const { user: { email = '', firstName = '', lastName, phone, countryId } = {} } = res;

          if (!email) {
            return (
              <span
                className="txt_bold"
                dangerouslySetInnerHTML={{
                  __html: t('Login to your account to use our Quick checkout service'),
                }}
              />
            );
          }

          return (
            <span>
              {onLoginSuccess({
                email,
                firstName,
                lastName,
                phone,
                countryId,
              }) &&
                (firstName || email.split('@')[0])}
            </span>
          );
        }}
      </LoginButton>
    </span>
  </div>
);

QuickCheckout.propTypes = {
  onLoginSuccess: PropTypes.func,
  t: PropTypes.func,
};

QuickCheckout.defaultProps = {
  onLoginSuccess() {},
  t() {},
};

export default QuickCheckout;
