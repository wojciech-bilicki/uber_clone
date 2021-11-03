import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';

import { Vehicle } from './types';

interface MapViewProps {
  vehicles: Vehicle[];
}

const MapView: React.FC<MapViewProps> = ({ vehicles }) => {
  const map = useRef<L.Map>();
  const clusterLayer = useRef<L.MarkerClusterGroup>();

  useEffect(() => {
    clusterLayer.current?.remove();

    if (!map.current) {
      return;
    }

    if (clusterLayer && clusterLayer.current) {
      map.current.removeLayer(clusterLayer.current);
      clusterLayer.current?.remove();
    }

    clusterLayer.current = L.markerClusterGroup();

    vehicles.forEach((v) =>
      L.circleMarker(L.latLng(v.lat, v.long), { radius: 5 })
        .bindTooltip(`Vehicle name is ${v.name}`)
        .addTo(clusterLayer.current!)
    );

    map.current.addLayer(clusterLayer.current);
  }, [vehicles]);

  useEffect(() => {
    const mapNode = ReactDOM.findDOMNode(
      document.getElementById('mapId')
    ) as HTMLDivElement;
    if (!mapNode || map.current) {
      return;
    }
    map.current = L.map(mapNode).setZoom(11).setView(L.latLng(54.44, 18.41));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
    }).addTo(map.current);
  }, []);

  return <div style={{ width: '100vh', height: '100vh' }} id="mapId" />;
};

export default MapView;
