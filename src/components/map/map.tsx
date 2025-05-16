import React from 'react';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';

function Map({ city }) {
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  return (
    <div
      style={{ height: '800px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
