import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import ApolloClient from 'apollo-client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import user from '../../helpers/user';
import compose from '../../helpers/compose';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    // Event for auto login in another tab.
    this.userActivity = new user.Event(state => {
      if (state === 'login') {
        this.props.client.resetStore();
      } else if (state === 'logout') {
        this.logout();
      }
    });
  }

  componentDidMount() {
    this.userActivity();
  }

  logout = () => {
    user.clear();
    this.props.client.resetStore().then(() => {
      window.location = '/';
    });
  };

  callSigning = () => {
    const { history, from } = this.props;
    history.push(`?popup=signing${from ? `&from=${from}` : ''}`, history.location.state);
  };

  render() {
    const { data: { profile, error } = {}, children: Children } = this.props;

    if (error) {
      console.error('error: ', error);
    }

    if (profile) {
      return <Children logout={this.logout} user={profile} />;
    }

    return (
      <span aria-hidden onClick={this.callSigning} role="presentation">
        <Children />
      </span>
    );
  }
}

LoginButton.propTypes = {
  from: PropTypes.string,
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  data: PropTypes.shape({
    profile: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.object,
    }),
  }),
};

LoginButton.defaultProps = {
  from: '',
  data: {
    profile: {},
  },
  history: {
    push() {},
    location: {
      state: {},
    },
  },
};

export default compose(
  withRouter,
  graphql(
    gql`
      query {
        profile {
          id

          birthday
          countryId
          email
          firstName
          languageId
          lastName
          passport_number
          phone
        }
      }
    `,
    {
      withRef: true,
      options: () => ({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
      }),
    },
  ),
  LoginButton,
);
