import {Marker, Popup} from 'react-leaflet';
import {useEffect, useState} from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import {StyledMapComponent} from '../../../Map/StyledMapComponent';
import {StyledMapComponentManifestation} from '../../../Map/StyledMapComponentManifestation';

interface ShowOnMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address: string;
  disableMarginTop?: boolean;
}

export const ShowOnMap = ({ address, latitude, longitude, title, disableMarginTop = false }: ShowOnMapProps) => {

  const [position, setPosition] = useState<[number, number] | undefined>(latitude ? [latitude, longitude] : undefined);

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      }
    };

    fetchAddress();
  }, [address]);

  if(!position) return null;

  return (
    disableMarginTop ?
      <StyledMapComponentManifestation
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '300px' }}
      >
        <ReactLeafletGoogleLayer apiKey="AIzaSyDbOPJzULaNcIuBSEhnNV1TDSmIATqEtGI" />
        <Marker position={position}>
          <Popup>
            {title ? title : 'La poubelle est située ici'}
          </Popup>
        </Marker>
      </StyledMapComponentManifestation>
      :
      <StyledMapComponent
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '300px' }}
      >
        <ReactLeafletGoogleLayer apiKey="AIzaSyDbOPJzULaNcIuBSEhnNV1TDSmIATqEtGI" />
        <Marker position={position}>
          <Popup>
            {title ? title : 'La poubelle est située ici'}
          </Popup>
        </Marker>
      </StyledMapComponent>
  );
};
