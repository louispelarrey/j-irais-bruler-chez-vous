import styled from "styled-components";
import { MapContainer } from "react-leaflet";

export const StyledMapComponent = styled(MapContainer)`
  height: 200px;
  border-radius: 5px;
  margin-top: 20px;

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
