import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LOGIN_TYPES = ['facebook', 'google'];

class Button extends Component {
  constructor(props) {
    super(props);

    this.facebookInit = this.facebookInit.bind(this);
    this.googleInit = this.googleInit.bind(this);

    this.google = this.google.bind(this);
    this.facebook = this.facebook.bind(this);

    this.facebookLoginDialog = this.facebookLoginDialog.bind(this);
    this.facebookGetUser = this.facebookGetUser.bind(this);
    this.googleSuccess = this.googleSuccess.bind(this);

    this.normalizeResponse = this.normalizeResponse.bind(this);

    this.state = {
      accessToken: '',
      // Now only in use for Facebook events
      selectedProviderCall: '',
    };
  }

  componentDidMount() {
    const { provider } = this.props;

    // Calling init function's for available provider
    this[`${provider}Init`](this[provider]);
  }

  // Callback's after initialization
  facebook() {
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        // Already logged into Facebook.
        this.setState({
          accessToken: response.authResponse.accessToken,
          selectedProviderCall: this.facebookGetUser,
        });
      } else {
        // User is not logged in, open Facebook login prompt
        this.setState({ selectedProviderCall: this.facebookLoginDialog });
      }
    });
  }

  google() {
    window.auth2.attachClickHandler(
      this.socialElement,
      {},
      this.googleSuccess,
      this.normalizeResponse,
    );
  }

  // Google SDK Events
  googleInit(cb) {
    window.gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      window.auth2 = window.gapi.auth2.init({
        client_id: this.props.appId,
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        scope: 'profile',
      });
      cb();
    });
  }

  googleSuccess(googleUser) {
    const { access_token = '' } = googleUser.getAuthResponse();
    console.log('test : ', googleUser.getAuthResponse());
    this.setState({
      accessToken: access_token,
    });
    this.normalizeResponse(googleUser.getBasicProfile());
  }

  // Facebook SDK Events
  facebookInit(cb) {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: this.props.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12',
      });
      cb();
    }.bind(this);

    // Dynamic script for facebook SDK
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  facebookGetUser() {
    window.FB.api(
      '/me',
      {
        fields: 'first_name,last_name,email',
      },
      response => {
        this.normalizeResponse(response);
      },
    );
  }

  facebookLoginDialog() {
    window.FB.login(
      response => {
        if (response.status === 'connected') {
          this.setState({
            accessToken: response.authResponse.accessToken,
          });
          this.facebookGetUser();
        } else {
          this.normalizeResponse(response);
        }
      },
      { scope: 'public_profile,email', return_scopes: true },
    );
  }

  normalizeResponse(response) {
    const accessToken = this.state.accessToken;
    const providers = {
      facebook() {
        console.log('response facebook : ', response);
        return {
          accessToken,
          id: response.id,
          firstName: response.first_name,
          lastName: response.last_name,
          email: response.email,
          loginType: providers.facebook.name.toUpperCase(),
        };
      },
      google() {
        console.log('response google : ', response);
        if (!response) console.error('Google signing error.');
        if (response && response.error) console.error('Google: ', response.error);
        return {
          accessToken,
          id: response.getId(),
          firstName: response.getGivenName(),
          lastName: response.getFamilyName(),
          email: response.getEmail(),
          loginType: providers.google.name.toUpperCase(),
        };
      },
    };
    this.props.onResponse(providers[this.props.provider]());
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={e => {
          this.socialElement = e;
        }}
        className={this.props.className}
        onClick={this.props.provider === 'facebook' ? this.state.selectedProviderCall : ''}
        role="presentation"
      >
        {children}
      </div>
    );
  }
}

Button.propTypes = {
  appId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  provider: PropTypes.oneOf(LOGIN_TYPES).isRequired,
  onResponse: PropTypes.func,
  className: PropTypes.string,
};
//
Button.defaultProps = {
  children: '',
  onResponse() {},
  className: '',
};

export default Button;
