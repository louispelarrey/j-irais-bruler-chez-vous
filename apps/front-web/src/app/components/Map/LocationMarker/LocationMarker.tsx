import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { IMapProps } from '../MapComponent';
import getAdressBasedOnLatLong from '../../../utils/map/getAdressBasedOnLatLong';

interface ILocationMarkerProps extends IMapProps {
  setLocationLoading: (loading: boolean) => void;
}

export const LocationMarker = ({setLocationLoading, setAddress}: ILocationMarkerProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
      setLocationLoading(true);
    },
    async locationfound(e: any) {
      setAddress(await getAdressBasedOnLatLong(e.latlng.lat, e.latlng.lng));
      setPosition(e.latlng);
      map.flyTo(e.latlng, 16);
      setLocationLoading(false);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>La poubelle est située sur votre position</Popup>
    </Marker>
  );
};
