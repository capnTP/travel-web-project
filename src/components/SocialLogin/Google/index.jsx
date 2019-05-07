import React from 'react';
import PropTypes from 'prop-types';

import SocialButton from '../SocialButton';

const CLIENT_ID = '919608037794-abnt0hh9cs1b1uiu73lohm4r0qun4stl.apps.googleusercontent.com';

const GoogleLogin = ({ children, onClick }) => (
  <SocialButton appId={CLIENT_ID} onResponse={onClick} provider="google">
    {children}
  </SocialButton>
);

GoogleLogin.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

GoogleLogin.defaultProps = {
  children: null,
};

export default GoogleLogin;
