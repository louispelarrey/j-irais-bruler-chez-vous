import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { StyledMapComponent } from '../Map/StyledMapComponent';
import { HeatmapLayerComponent, IHeatmap } from './HeatmapLayer/HeatmapLayerComponent';
import 'leaflet.heat/dist/leaflet-heat.js';

export const HeatMapComponent = ({ heatmapData, heatmapDate, setHeatmapDate }: IHeatmap) => (
  <StyledMapComponent
    style={{height: '600px'}}
    center={[48.857, 2.333333]}
    zoom={12}
    scrollWheelZoom={true}
    minZoom={12}
    maxZoom={15}
  >
    <ReactLeafletGoogleLayer apiKey="AIzaSyDbOPJzULaNcIuBSEhnNV1TDSmIATqEtGI" />
    <HeatmapLayerComponent heatmapData={heatmapData} />
  </StyledMapComponent>
);
