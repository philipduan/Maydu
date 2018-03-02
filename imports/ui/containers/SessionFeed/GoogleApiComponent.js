import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

export const Location = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    )}
  </GoogleMap>
));
