import React from 'react';
import PropTypes from 'prop-types';

import SocialButton from '../SocialButton';

const APP_ID = '182479572492850';

const FacebookLogin = ({ children, onClick }) => (
  <SocialButton appId={APP_ID} onResponse={onClick} provider="facebook">
    {children}
  </SocialButton>
);

FacebookLogin.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

FacebookLogin.defaultProps = {
  children: null,
};

export default FacebookLogin;
