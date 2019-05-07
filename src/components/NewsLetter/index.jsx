import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import subscribeNewsLetter from '../../queries/newsletter/subscribeNewsLetter.gql';

import Input from './Input';

class Subscription extends Component {
  state = {
    loading: false,
    success: false,
    error: false,
  };

  onSubscribe = email => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.props
          .subscribeNewsLetter({ variables: { input: { email } } })
          .then(data => {
            const {
              data: {
                subscribeNewsLetter: { error, status },
              },
            } = data;

            this.setState(
              {
                loading: false,
                success: !!(status && !error),
                error,
              },
              () => {
                this.setState({
                  success: false,
                });
              },
            );
          })
          .catch(() => {
            this.setState({
              loading: false,
              error: true,
            });
          });
      },
    );
  };

  render() {
    return (
      <Input
        error={this.state.error}
        loading={this.state.loading}
        onSubscribe={this.onSubscribe}
        success={this.state.success}
      />
    );
  }
}

Subscription.propTypes = {
  subscribeNewsLetter: PropTypes.func,
};

Subscription.defaultProps = {
  subscribeNewsLetter: () => {},
};

const subscription = graphql(subscribeNewsLetter, {
  name: 'subscribeNewsLetter',
});

const HOCs = [subscription, withApollo, withRouter];

export default HOCs.reduce((a, b) => b(a), Subscription);
