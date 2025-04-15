"use client";
import { setChatTargetingUser } from "@/redux/features/system/systemSlice";
import {
  Autocomplete,
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserSearch() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const targetingUser = useSelector((s) => s.system.setChatTargetingUser);

  const handleInputChange = async (event, value) => {
    setInputValue(value);
    if (value.length < 2) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RENTAL_SERVICE_BACKEND_ENDPOINT}/users/search?q=${value}`
      );
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  const onUserSelect = (user) => {
    dispatch(setChatTargetingUser({ ...user, id: user?._id }));
  };

  return (
    <Autocomplete
      size="small"
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) => option.name}
      loading={loading}
      onChange={(event, newValue) => {
        onUserSelect(newValue);
      }}
      isOptionEqualToValue={(option, value) => option._id == value._id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Users"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option._id}>
          <ListItemAvatar>
            <Avatar alt={option.name} src={option.avatar} />
          </ListItemAvatar>
          <ListItemText primary={option.name} />
        </ListItem>
      )}
    />
  );
}
