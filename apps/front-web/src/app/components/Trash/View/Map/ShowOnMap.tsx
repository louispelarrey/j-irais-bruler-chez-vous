import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LoadingButton } from '@mui/lab';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { StyledMapComponent } from '../../../Map/StyledMapComponent';

interface ShowOnMapProps {
  latitude: number;
  longitude: number;
  title?: string;
}

export const ShowOnMap = ({ latitude, longitude, title }: ShowOnMapProps) => {
  return (
      <StyledMapComponent
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '300px' }}
      >
        <ReactLeafletGoogleLayer apiKey="AIzaSyDbOPJzULaNcIuBSEhnNV1TDSmIATqEtGI" />
        <Marker position={[latitude, longitude]}>
          <Popup>
            {title ? title : 'La poubelle est située ici'}
          </Popup>
        </Marker>
      </StyledMapComponent>

  );
};
