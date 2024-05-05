import React, { useCallback } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { ArrayParam, useQueryParam, withDefault } from "use-query-params";

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 40;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PropertyTypeSelect = () => {
  const [propertyTypes, setPropertyTypes] = useQueryParam(
    "pt",
    withDefault(ArrayParam, [])
  );

  const handleChange = (e) => {
    const propertyTypes = e.target.value;

    setPropertyTypes(
      typeof propertyTypes === "string" ? value.split(",") : propertyTypes
    );
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        multiple
        displayEmpty
        size="small"
        renderValue={(selected) =>
          selected.length === 0
            ? "Any Property Type"
            : selected.length === 1
            ? PROPERTY_TYPES[selected[0]].label
            : `Property Types (${selected.length})`
        }
        value={propertyTypes}
        onChange={handleChange}
        input={<OutlinedInput />}
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          Property Type
        </MenuItem>
        {Object.values(PROPERTY_TYPES).map(({ value, label }) => (
          <MenuItem sx={{ py: 0, pl: 1 }} key={value} value={value}>
            <Checkbox checked={propertyTypes.indexOf(value) > -1} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PropertyTypeSelect;
