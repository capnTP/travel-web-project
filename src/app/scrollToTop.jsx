import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import React from 'react';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location && typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(ScrollToTop);
