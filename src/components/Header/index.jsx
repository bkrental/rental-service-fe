"use client";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import useMenu from "@/hooks/useMenu";
import { FavoriteBorderOutlined, NotificationsOutlined } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Box,
  Button,
  Container,
  Link,
  Stack,
  styled,
  Tooltip,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import FavouritePostMenu from "../GetPropertiesPage/components/FavouritePostMenu";
import AccountMenu from "./components/AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import RentIcon from "@mui/icons-material/VpnKey";
import AccountDrawer from "./components/Drawer";
import { AddOutlined } from "@mui/icons-material";
import AddressInput from "../SearchBar/AddressInput";

const HeaderLink = ({ children, ...props }) => (
  <Link component={NextLink} underline="none" {...props}>
    {children}
  </Link>
);

const HeaderWrapper = styled((props) => <Container maxWidth="xl" {...props} />)(({ theme }) => ({
  height: "60px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  position: "fixed",
  zIndex: 1000,
  backgroundColor: "white",
  boxShadow: "rgba(239, 108, 0, 0.1) 0px 0px 10px 0px",
}));

function Header() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const userName = useMemo(() => user?.name || "User", [user]);

  const [open, anchorEl, handleClick, handleClose] = useMenu();
  const [isFavouriteMenuOpen, favouriteBtn, handleOpenFavouriteMenu, handleCloseFavouriteMenu] = useMenu();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <HeaderWrapper>
        <Stack direction="row" spacing={3} alignItems="center">
          <HeaderLink href="/" sx={{ fontSize: 28, fontWeight: 600, width: 120 }}>
            BKRental
          </HeaderLink>
          <HeaderLink
            fontSize={20}
            href="/rent"
            color="inherit"
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          >
            Rent
          </HeaderLink>
          <HeaderLink
            fontSize={20}
            href="/buy"
            color="inherit"
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          >
            Buy
          </HeaderLink>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            flex: { sx: 1, sm: 1, md: "unset" },
            display: { xs: "flex", sm: "flex", md: "none" },
            width: "50%",
          }}
        >
          <AddressInput />
        </Stack>

        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
          <Button onClick={() => router.push("/landlord")} size="large" color="inherit">
            Post a property
          </Button>

          {user ? (
            <>
              <Tooltip title="List of saved post">
                <IconButton onClick={handleOpenFavouriteMenu}>
                  <FavoriteBorderOutlined />
                </IconButton>
              </Tooltip>

              <IconButton>
                <NotificationsOutlined />
              </IconButton>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: 1,
                  borderColor: grey[300],
                  px: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <Avatar sx={{ width: 30, height: 30 }}>{userName[0].toUpperCase()}</Avatar>
                <Typography>{userName}</Typography>
              </Stack>
            </>
          ) : (
            <Button onClick={() => router.push("/login")} variant="outlined">
              Sign Up or Login
            </Button>
          )}
        </Stack>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <AccountDrawer open={drawerOpen} toggleDrawer={toggleDrawer} user={user} userName={userName} />

        <AccountMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
      </HeaderWrapper>

      <FavouritePostMenu anchorEl={favouriteBtn} open={isFavouriteMenuOpen} onCancel={handleCloseFavouriteMenu} />
      <Box sx={{ width: "100%", height: "60px" }}></Box>
    </>
  );
}

export default Header;
