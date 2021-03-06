import React, { useState, useRef } from 'react';
import './App.css';
import MapGL from 'react-map-gl';
import CustomMarker from './components/CustomMarker';
import AutosuggestWrapper from './components/AutosuggestWrapper';

import MARKERDATA from './sample-data.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const [viewport, setViewport] = useState({
    longitude: 26.2,
    latitude: 62.1,
    zoom: 4.9,
    bearing: 0,
    pitch: 0
  });
  const [showLayers, setShowLayers] = useState(true);
  const inputLat = useRef(null);
  const inputLon = useRef(null);

  function handleGoTo(e) {
    e.preventDefault()
    setViewport({
      ...viewport,
      latitude: Number(inputLat.current.value),
      longitude: Number(inputLon.current.value)
    })
  }

  return (
    <div className="App">

      <div className="search-box">
        <AutosuggestWrapper viewport={viewport} setViewport={setViewport} />
      </div>

      <button className="extras-toggle-button" onClick={() => setShowLayers(!showLayers)}>{showLayers ? "Hide extras" : "Show extras"}</button>

      {/* Extra layers: Stats & GoTo */}
      {showLayers
        ? <>
          <div className="stat-box">
            <p>Latitude: {viewport.latitude.toFixed(4)}</p>
            <p>Longitude: {viewport.longitude.toFixed(4)}</p>
            <p>Zoom: {viewport.zoom.toFixed(2)}</p>
          </div>
          <div className="goto-box">
            <form onSubmit={handleGoTo}>
              <input ref={inputLat} type="number" placeholder="Latitude" min="-90" max="90" step="any" required />
              <input ref={inputLon} type="number" placeholder="Longitude" min="-180" max="180" step="any" required />
              <input type="submit" value="GO" />
            </form>
          </div>
        </>
        : null
      }

      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {MARKERDATA.features.map((p, i) => (
          <CustomMarker
            key={"mark-" + i}
            longitude={p.geometry.coordinates[0]}
            latitude={p.geometry.coordinates[1]}
            text={p.properties.text}
            description={p.properties.description}
            color="purple"
            offsetTop={-24}
            offsetLeft={-12}
          />
        ))}
      </MapGL>

    </div>
  );
}

export default App;
