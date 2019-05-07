import React from 'react';
import { graphql } from 'react-apollo';

import weatherQuery from '../../queries/common/weather.gql';

const Weather = ({ children, data: { weather = {}, loading, error } = {} }) => {
  if (error) {
    return children;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const { temperature = '' } = weather;
  if (temperature) return React.cloneElement(children, { weather });
  return children;
};

export default graphql(weatherQuery, {
  withRef: true,
  options: ({ city, timezone }) => ({
    variables: {
      city,
      timezone,
    },
    fetchPolicy: 'cache-and-network',
  }),
})(Weather);
