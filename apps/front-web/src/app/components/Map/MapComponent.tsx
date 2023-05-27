import { StyledMapComponent } from './StyledMapComponent';
import { LocationMarker } from './LocationMarker/LocationMarker';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

export interface IMapProps {
  setAddress: (address: string) => void;
};

export const MapComponent = ({setAddress}: IMapProps) => {
  const [locationLoading, setLocationLoading] = useState(false);

  return (
    <StyledMapComponent center={[48.866667, 2.333333]} zoom={10} scrollWheelZoom={true}>
      <ReactLeafletGoogleLayer apiKey='AIzaSyDbOPJzULaNcIuBSEhnNV1TDSmIATqEtGI' />
      <LoadingButton
        style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 400 }}
        type='button'
        variant='contained'
        loading={locationLoading}
      >
        Localiser la poubelle
      </LoadingButton>
      <LocationMarker
        setLocationLoading={setLocationLoading}
        setAddress={setAddress}
      />
    </StyledMapComponent>
  )
}
