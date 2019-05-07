import { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { translate } from 'react-i18next';

import policiesQuery from '../../queries/common/cancellationPolicies.gql';

import template from './template';

class Policies extends Component {
  render() {
    return !this.props.policiesQuery.loading && template(this);
  }
}

Policies.propTypes = {
  policiesQuery: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    cancellationPolicies: PropTypes.arrayOf(PropTypes.object),
  }),
};

Policies.defaultProps = {
  policiesQuery: {
    loading: true,
    error: {},
    cancellationPolicies: [],
  },
};

Policies.translationKeys = {
  title: 'title',
  details: 'details',
  example: 'example',
  seo: {
    title: 'seo.title',
    description: 'seo.description',
  },
  1: {
    description: '1.description',
    infoGraphic: '1.infoGraphic',
  },
  2: {
    description: '2.description',
    infoGraphic: '2.infoGraphic',
  },
  3: {
    description: '3.description',
    infoGraphic: '3.infoGraphic',
  },
  4: {
    description: '4.description',
    infoGraphic: '4.infoGraphic',
  },
};

export default graphql(policiesQuery, {
  name: 'policiesQuery',
  options: { fetchPolicy: 'cache-and-network' },
})(translate('cancellation-policy')(Policies));
