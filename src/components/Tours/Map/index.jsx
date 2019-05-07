import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';

import ProductMarker from './marker';
import theAsiaMapTheme from './theasiaMapTheme';

const GOOGLE_API = 'AIzaSyAlnXyRL0hYdKYZ-5nehTQ2ziU15rZtmww';

class Map extends Component {
  render() {
    if (typeof window === 'undefined') {
      return null;
    }
    const wrapperStyle = {
      position: 'static',
    };
    const style = {
      position: 'relative',
      width: this.props.mapWidth,
      height: '50vh',
    };

    const GoogleMapReact = require('google-maps-react'); // eslint-disable-line global-require

    // Map component will throw an error when there's no google object
    if (!this.props.google || !this.props.google.maps) {
      return null;
    }

    if (this.props.latlng.length) {
      return (
        <GoogleMapReact.Map
          {...this.props}
          clickableIcons={false}
          containerStyle={wrapperStyle}
          google={this.props.google}
          initialCenter={{
            lat: parseFloat(this.props.latlng[0][0]),
            lng: parseFloat(this.props.latlng[0][1]),
          }}
          mapTypeControl
          scrollwheel={false}
          streetViewControl={false}
          style={style}
          styles={theAsiaMapTheme}
          zoom={this.props.zoom}
        >
          {this.props.latlng.map((item, index) => (
            <ProductMarker
              key={`${item[0]}${item[1]}`}
              index={index}
              lat={parseFloat(item[0])}
              lng={parseFloat(item[1])}
              position={{ lat: parseFloat(item[0]), lng: parseFloat(item[1]) }}
            />
          ))}
        </GoogleMapReact.Map>
      );
    }
  }
}

Map.propTypes = {
  latlng: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number.isRequired,
  mapWidth: PropTypes.string,
  heatmap: PropTypes.bool,
  google: PropTypes.object,
};

Map.defaultProps = {
  mapWidth: '100%',
  heatmap: true,
  latlng: [],
  google: {},
};

let Container; // eslint-disable-line import/no-mutable-exports

if (typeof window === 'undefined') {
  Container = Map;
} else {
  Container = GoogleApiWrapper({
    apiKey: GOOGLE_API,
    version: 3,
    libraries: ['places'],
  })(Map);
}

export default Container;
