import {
  Box,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { PROPERTY_TYPES } from "@/constants/propertyTypes";
import { useMemo } from "react";
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

export default function MobilePropertyTypeSelect() {
  const [propertyTypesQuery, setPropertyTypesQuery] = useQueryParam("pt", withDefault(ArrayParam, []));
  const propertyTypes = useMemo(() =>
    propertyTypesQuery ? _.intersection(Object.keys(PROPERTY_TYPES), propertyTypesQuery) : []
  );

  const handleChange = (e) => {
    const propertyTypes = e.target.value;

    setPropertyTypesQuery(typeof propertyTypes == "string" ? propertyTypes : propertyTypes);
  };

  return (
    <Box width={"100%"}>
      <Box px={2}>
        <Typography variant="body1" color={grey[1000]} sx={{ fontWeight: 700 }} gutterBottom>
          Property Type
        </Typography>
      </Box>
      <FormControl sx={{ width: "100%", paddingLeft: 2, paddingRight: 2 }}>
        <Select
          multiple
          displayEmpty
          size="small"
          renderValue={(selected) => {
            return selected.length === 0
              ? "Any Property Type"
              : selected.length === 1
              ? PROPERTY_TYPES[selected[0]]?.viLabel
              : `Property Types (${selected.length})`;
          }}
          value={propertyTypes}
          onChange={handleChange}
          input={<OutlinedInput />}
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={MenuProps}
        >
          {Object.values(PROPERTY_TYPES).map(({ value, viLabel }) => (
            <MenuItem sx={{ py: 0, pl: 1 }} key={value} value={value}>
              <Checkbox checked={propertyTypes.indexOf(value) > -1} />
              <ListItemText primary={viLabel} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
