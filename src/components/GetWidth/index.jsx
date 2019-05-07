import React from 'react';
import PropTypes from 'prop-types';

class GetWidth extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.setWidth);
    }

    this.setWidth();
  }

  setWidth = () => {
    if (this.componentRef.current) {
      this.setState({ width: this.componentRef.current.offsetWidth });
    }
  };

  render() {
    return <div ref={this.componentRef}>{this.props.children(this.state)}</div>;
  }
}

GetWidth.propTypes = {
  children: PropTypes.func,
};

GetWidth.defaultProps = {
  children() {},
};

export default GetWidth;
