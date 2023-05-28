const getAdressBasedOnLatLong = async (lat: number, long: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
  );
  const data = await response.json();
  return `${data.address.house_number} ${data.address.road}, ${data.address.postcode} ${data.address.city}`;
};

export default getAdressBasedOnLatLong;
