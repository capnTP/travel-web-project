import React from 'react';
import PropTypes from 'prop-types';
import { Marker as GoogleMarker } from 'google-maps-react';

import markerBlue from '../../../assets/images/marker/marker-blue.png';
import markerYellow from '../../../assets/images/marker/marker-yellow.png';
import markerGreen from '../../../assets/images/marker/marker-green.png';

class Marker extends React.Component {
  static ANCHOR_POINT = [12, 40];

  static MARKER_SIZE = [40, 60];

  static propTypes = {
    google: PropTypes.object,
    lat: PropTypes.number,
    lng: PropTypes.number,
    index: PropTypes.number,
  };

  static defaultProps = {
    google: null,
    lat: 0,
    lng: 0,
    index: 0,
  };

  render() {
    if (!this.props.google || !this.props.google.maps) {
      return null;
    }

    const { Point, Size, Animation } = this.props.google.maps;

    const marker = {
      0: markerBlue,
      1: markerYellow,
      2: markerGreen,
    };

    return (
      <GoogleMarker
        {...this.props}
        animation={Animation.DROP}
        icon={{
          url: marker[this.props.index],
          anchor: new Point(...Marker.ANCHOR_POINT),
          scaledSize: new Size(...Marker.MARKER_SIZE),
        }}
        position={{ lat: this.props.lat, lng: this.props.lng }}
      />
    );
  }
}

export default Marker;
