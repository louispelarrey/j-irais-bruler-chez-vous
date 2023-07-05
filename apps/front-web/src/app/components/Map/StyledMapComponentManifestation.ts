import styled from "styled-components";
import { MapContainer } from "react-leaflet";

export const StyledMapComponentManifestation = styled(MapContainer)`
  height: 200px;
  border-radius: 5px;

  .leaflet-control-attribution {
    display: none;
  }

  .leaflet-control-zoom {
    display: none;
  }

  .leaflet-bottom {
    display: none;
  }
`;
