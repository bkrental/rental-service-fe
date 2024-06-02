import { Stack, styled, Button, SwipeableDrawer, Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import MobileAreaSelect from "../AreaSelect/Mobile";
import MobilePropertyTypeSelect from "../PropertyTypeSelect/Mobile";
import MobilePriceSelect from "../PriceSelect/Mobile";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapIcon from "@mui/icons-material/Map";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, setAreaRange } from "@/redux/features/filter/filterSlice";
import { toggleMapWidget } from "@/redux/features/system/systemSlice";

const SearchBarContainer = styled(Stack)(({ theme }) => ({
  position: "fixed",
  paddingTop: 20,
  top: 60,
  flexDirection: "row",
  paddingBottom: theme.spacing(2),
  zIndex: 100,
  backgroundColor: "#fff",
  width: `calc(100% - ${theme.spacing(4)})`,
  gap: theme.spacing(2),
}));

export default function MobileSearchBar() {
  const [bottomPrice, setBottomPrice] = useQueryParam("bp", withDefault(NumberParam, 0));
  const [topPrice, setTopPrice] = useQueryParam("tp", withDefault(NumberParam, 0));
  const [bottomArea, setBottomArea] = useQueryParam("ba", withDefault(NumberParam, 0));
  const [topArea, setTopArea] = useQueryParam("ta", withDefault(NumberParam, 0));
  const [propertyType, setPropertyType] = useQueryParam("pt", withDefault(NumberParam, 0));

  const areaRange = useSelector((s) => s.filter.areaRange);
  const priceRange = useSelector((s) => s.filter.priceRange);
  const isMapOpened = useSelector((s) => s.system.isMapOpened);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (event && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked");
    const newBottomArea = Math.min(...areaRange);
    const newTopArea = Math.max(...areaRange);
    const newBottomPrice = Math.min(...priceRange);
    const newTopPrice = Math.max(...priceRange);

    setTopPrice(newTopPrice === 0 ? undefined : newTopPrice);
    setBottomPrice(newBottomPrice === 0 ? undefined : newBottomPrice);
    setTopArea(newTopArea === 0 ? undefined : newTopArea);
    setBottomArea(newBottomArea === 0 ? undefined : newBottomArea);
    setDrawerOpen(false);
  };

  const handleReset = () => {
    setBottomPrice(undefined);
    setTopPrice(undefined);
    setBottomArea(undefined);
    setTopArea(undefined);
    setPropertyType(undefined);
    dispatch(setPriceRange([0, 0]));
    dispatch(setAreaRange([0, 0]));
  };

  const handleMapClick = () => {
    dispatch(toggleMapWidget(!isMapOpened));
  };

  console.log("isMapOpened", isMapOpened);
  return (
    <SearchBarContainer
      sx={{
        display: {
          xs: "flex",
          sm: "flex",
          md: "none",
        },
      }}
    >
      {!isMapOpened ? (
        <Button variant="contained" onClick={handleMapClick} sx={{ flex: 1 }} startIcon={<MapIcon />}>
          <Typography>Map</Typography>
        </Button>
      ) : (
        <Button variant="contained" onClick={handleMapClick} sx={{ flex: 1 }} startIcon={<FormatListBulletedIcon />}>
          <Typography>List</Typography>
        </Button>
      )}
      <Button variant="contained" sx={{ flex: 1 }} startIcon={<FavoriteBorderIcon />}>
        <Typography>Favorites</Typography>
      </Button>
      <Button variant="contained" onClick={toggleDrawer(true)} sx={{ flex: 1 }} startIcon={<TuneIcon />}>
        <Typography>Filter</Typography>
      </Button>
      <SwipeableDrawer
        disableSwipeToOpen={true}
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px 16px 0 0",
            border: "1px solid #ddd",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            height: "70vh",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
          }}
          role="presentation"
        >
          <MobilePropertyTypeSelect />
          <MobilePriceSelect />
          <MobileAreaSelect />
          <Button variant="text" color="primary" onClick={handleReset}>
            Reset Filter
          </Button>
        </Box>
        <Box sx={{ padding: 2, borderTop: "1px solid #ddd" }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleFilterClick}>
            View Rentals
          </Button>
        </Box>
      </SwipeableDrawer>
    </SearchBarContainer>
  );
}
