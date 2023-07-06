import React, { useState } from 'react';
import {TextField} from "@mui/material";

const AutocompleteInput = ({ onPlaceSelected }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePlaceSelected = (place) => {
    onPlaceSelected(place);
    setInputValue(place.name); // Set the input value to the selected place name
  };

  const autocompleteOptions = {
    types: ['geocode'], // Restrict to addresses
  };

  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete-input'),
    autocompleteOptions
  );

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place) {
      handlePlaceSelected(place);
    }
  });

  return (
      <TextField
        id="autocomplete-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter an address"
        required
        sx={{
          width: '100%',
        }}
      />
  );
};

export default AutocompleteInput;
