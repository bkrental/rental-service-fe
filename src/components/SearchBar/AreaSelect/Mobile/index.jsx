import { Box, Stack, TextField, Typography, Slider, Button, useTheme } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { useEffect, useMemo, useState } from "react";
import { grey } from "@mui/material/colors";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { setAreaRange as ASetAreaRange } from "@/redux/features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MobileAreaSelect() {
  const areaRange = useSelector((s) => s.filter.areaRange);
  const areaConfig = { min: 0, max: 500, step: 1 };

  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSliderChange = (event, newAreaRange) => {
    dispatch(ASetAreaRange(newAreaRange));
  };

  useEffect(() => {
    console.log("area:", areaRange);
  }, [areaRange]);

  return (
    <Box width={"100%"}>
      <Box px={2}>
        <Typography variant="body1" color={grey[1000]} sx={{ fontWeight: 700 }} gutterBottom>
          Area (m<sup>2</sup>)
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={areaRange[0]}
            inputProps={{ type: "number", ...areaConfig }}
            onChange={(e) => dispatch(ASetAreaRange([e.target.value, areaRange[1]]))}
          />
          <ArrowRight fontSize="large" />
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={areaRange[1]}
            inputProps={{ type: "number", ...areaConfig }}
            onChange={(e) => dispatch(ASetAreaRange([areaRange[0], e.target.value]))}
          />
        </Stack>
        <Slider {...areaConfig} value={areaRange} onChange={handleSliderChange} valueLabelDisplay="auto" />
      </Box>
    </Box>
  );
}
