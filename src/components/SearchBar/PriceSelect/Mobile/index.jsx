import { PRICE_SUGGESTIONS } from "@/constants/price";
import { getPriceOptionLabel, getPriceSelectLabel } from "@/utils/getPriceLabel";
import { ArrowDropDown, ArrowRight, CachedOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
  Checkbox,
  FormControl,
  Select,
  styled,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { setPriceRange } from "@/redux/features/filter/filterSlice";
import { useSelector, useDispatch } from "react-redux";

const StyledButton = styled((props) => <Button size="small" variant="outlined" color="inherit" {...props} />)(
  ({ theme }) => ({
    borderColor: theme.palette.grey[400],
    fontSize: theme.typography.body1.fontSize,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 4px 6px 12px",
  })
);

export default function MobilePriceSelect() {
  const priceRange = useSelector((s) => s.filter.priceRange);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const priceConfig = { min: 0, max: 100, step: 0.5 };

  const theme = useTheme();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSliderChange = (event, newPriceRange) => {
    dispatch(setPriceRange(newPriceRange));
  };

  const handlePriceSelect = (newPriceRange) => {
    dispatch(setPriceRange(newPriceRange));
  };

  return (
    <Box width={"100%"}>
      <Box px={2}>
        <Typography variant="body1" color={grey[500]} gutterBottom>
          Price range
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={priceRange[0]}
            inputProps={{ type: "number", ...priceConfig }}
            onChange={(e) => dispatch(setPriceRange([e.target.value * 1, priceRange[1]]))}
          />
          <ArrowRight fontSize="large" />
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={priceRange[1]}
            inputProps={{ type: "number", ...priceConfig }}
            onChange={(e) => dispatch(setPriceRange([priceRange[0], e.target.value * 1]))}
          />
        </Stack>

        <Slider {...priceConfig} value={priceRange} onChange={handleSliderChange} valueLabelDisplay="auto" />

        <StyledButton
          onClick={handleClick}
          aria-controls={open ? "price-select-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{ borderColor: open ? theme.palette.primary.main : grey[400] }}
        >
          {getPriceSelectLabel(priceRange ? priceRange : [0, 0])} <ArrowDropDown color={grey[500]} />
        </StyledButton>
        <Menu onClose={handleClose} anchorEl={anchorEl} open={open} sx={{ "& .MuiPaper-root": { width: "100%" } }}>
          <Box height={170} sx={{ overflowY: "scroll", width: "100%" }}>
            {PRICE_SUGGESTIONS.map((range) => (
              <MenuItem key={range.toString()} sx={{ width: "100%" }} onClick={() => handlePriceSelect(range)}>
                {getPriceOptionLabel(range)}
              </MenuItem>
            ))}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
}
