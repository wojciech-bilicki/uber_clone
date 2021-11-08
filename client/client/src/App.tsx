import styled from 'styled-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import socketIOClient from 'socket.io-client';

import logo from './logo.svg';
import './App.css';
import { Vehicle, VehicleResponse } from './types';
import MapView from './MapView';
import SearchList from './Search/SearchList';
import { debounce } from './Search/saerch.utils';

const ENDPOINT = 'http://localhost:8080';

// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js');
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css');
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css');

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`;

function App() {
  const [vehicles, setVehicles] = useState<VehicleResponse>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [carSearchTerm, setCarSearchTerm] = useState('');

  const debouncedSetSearchTerm = useCallback(
    debounce((searchTerm) => setCarSearchTerm(searchTerm), 2000),
    []
  );

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    debouncedSetSearchTerm(newSearchTerm);
  };

  const vehicleArray = useMemo(() => {
    console.log(carSearchTerm);
    return Object.keys(vehicles)
      .map((id) => vehicles[id])
      .filter((v) =>
        v.name.toLowerCase().includes(carSearchTerm.toLowerCase())
      );
  }, [vehicles, carSearchTerm]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('initialData', (data) => setVehicles(data));

    socket.on('positionUpdates', (updates: VehicleResponse) => {
      setVehicles((vehiclesInState) => {
        if (!vehiclesInState) {
          return {};
        }

        Object.keys(updates).forEach((vehicleId) => {
          vehiclesInState[vehicleId] = updates[vehicleId];
        });

        return { ...vehiclesInState };
      });
    });
  }, []);

  console.log({ searchTerm });
  console.log({ carSearchTerm });
  return (
    <Container>
      <MapView vehicles={vehicleArray} />
      <SearchList
        vehicleArray={vehicleArray}
        searchTerm={searchTerm}
        onSearchTermChanged={onSearchTermChanged}
      />
    </Container>
  );
}

export default App;
