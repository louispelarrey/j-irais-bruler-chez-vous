import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';

declare module 'leaflet' {
  export function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: any
  ): any;
}

interface IHeatmap {
  heatmapData: Array<[number, number, number]>;
}

const HeatmapLayer = ({ heatmapData }: IHeatmap) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(heatmapData, { radius: 25 }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, heatmapData]);

  return null;
};

const HeatMap = ({ heatmapData }: IHeatmap) => (
  <MapContainer style={{height: '500px'}} center={[51.505, -0.09]} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <HeatmapLayer heatmapData={heatmapData} />
  </MapContainer>
);

export default HeatMap;
