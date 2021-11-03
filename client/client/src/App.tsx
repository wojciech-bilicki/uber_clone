import React, { useEffect, useMemo, useState } from 'react';
import socketIOClient from 'socket.io-client';

import logo from './logo.svg';
import './App.css';
import { Vehicle, VehicleResponse } from './types';
import MapView from './MapView';

const ENDPOINT = 'http://localhost:8080';

// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js');
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css');
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css');

function App() {
  const [vehicles, setVehicles] = useState<VehicleResponse>({});
  const vehicleArray = useMemo(
    () => Object.keys(vehicles).map((id) => vehicles[id]),
    [vehicles]
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('initialData', (data) => setVehicles(data));
  }, []);

  return (
    <div className="App container">
      <MapView vehicles={vehicleArray} />
    </div>
  );
}

export default App;
