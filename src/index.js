import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState = {
  lng: 26.2,
  lat: 62.1,
  zoom: 4.9
}

function Application() {
  const mapRef = useRef(null)
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { lng, lat, zoom } = initialState;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }, [])

  return (
    <div>
      <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        <div>{`Longitude: ${state.lng} Latitude: ${state.lat} Zoom: ${state.zoom}`}</div>
      </div>
      <div ref={mapRef} className="absolute top right left bottom" />
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById('app'));
