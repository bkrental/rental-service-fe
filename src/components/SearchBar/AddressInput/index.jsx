import usePlaceAutocomplete from "@/hooks/usePlaceAutocomplete";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";

export default function AddressInput() {
  const [addressInput, setAddressInput, suggestions] = usePlaceAutocomplete();
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useQueryParam("center", StringParam);
  const [boundary, setBoundary] = useQueryParam("boundary", StringParam);

  const handleAddressChange = (_, address) => {
    setAddress(address);
  };

  useEffect(() => {
    const getGeoData = async (address) => {
      const url = `/api/geocoding?address=${address}`;
      const response = await fetch(url.toString());
      const data = await response.json();
      return data.results[0].geometry;
    };

    if (address?.place_id) {
      getGeoData(address.description)
        .then((geometry) => {
          const { location, boundary } = geometry;
          const { lng, lat } = location;
          setLocation(`${lng},${lat}`);

          if (boundary) {
            setBoundary(boundary);
          } else {
            setBoundary(null);
          }
        })
        .catch((e) => {
          dispatch(setLocation(null));
          dispatch(setBoundary(null));
        });
    } else {
      setLocation(null);
      setBoundary(null);
    }
  }, [address]);

  return (
    <Autocomplete
      size="small"
      id="address-autocomplete"
      filterOptions={(x) => x}
      noOptionsText="No address found"
      onChange={handleAddressChange}
      value={address}
      inputValue={addressInput}
      onInputChange={(_, newInputValue) => {
        setAddressInput(newInputValue);
      }}
      options={suggestions}
      getOptionLabel={(option) => option.description}
      isOptionEqualToValue={(option, value) => option.place_id === value.place_id}
      sx={{
        width: {
          xs: 100,
          sm: 100,
          md: 300,
        },
        flex: {
          xs: 1,
          sm: 1,
          md: "unset",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // sx={{ flex: 1}}
          variant="outlined"
          label="Search for city, neighborhood or location"
        />
      )}
    />
  );
}
