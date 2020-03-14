import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const [viewport, setViewport] = useState({
    latitude: 62.1,
    longitude: 26.2,
    zoom: 4.9,
    bearing: 0,
    pitch: 0
  });
  const inputLat = useRef(null);
  const inputLon = useRef(null);
  const inputZoom = useRef(null);

  return (
    <div className="App">
      <div className="stat-box">
        <p>Latitude: {viewport.latitude.toFixed(4)}</p>
        <p>Longitude: {viewport.longitude.toFixed(4)}</p>
        <p>Zoom: {viewport.zoom.toFixed(2)}</p>
      </div>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
}

export default App;
