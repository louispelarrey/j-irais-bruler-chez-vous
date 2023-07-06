import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet.heat/dist/leaflet-heat.js';

export interface IHeatmap {
  heatmapData: Array<[number, number, number]>;
  heatmapDate?: Date;
  setHeatmapDate?: (date: Date) => void;
}

declare module 'leaflet' {
  export function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: any
  ): any;
}

export const HeatmapLayerComponent = ({ heatmapData }: IHeatmap) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(heatmapData, {
      minZoom: 12,
      maxZoom: 15,
      radius: 25,
      blur: 30,
      gradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red',
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, heatmapData]);

  return null;
};
