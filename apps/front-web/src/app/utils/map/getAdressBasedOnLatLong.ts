const getAdressBasedOnLatLong = async (lat: number, long: number) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
  );
  const data = await response.json();

  if (
    data.address &&
    data.address.house_number &&
    data.address.road &&
    data.address.postcode &&
    data.address.city
  ) {
    return `${data.address.house_number} ${data.address.road}, ${data.address.postcode} ${data.address.city}`;
  } else {
    return data.display_name;
  }
};

export default getAdressBasedOnLatLong;
