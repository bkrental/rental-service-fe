import {
  Box,
  Drawer,
  Stack,
  Avatar,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RentIcon from "@mui/icons-material/VpnKey";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "@/redux/features/auth/authSlice";

export default function AccountDrawer({ open, toggleDrawer, user, userName }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    router.push("/");
    dispatch(removeUserInfo());
  };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {user ? (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ padding: 2 }}>
            <Avatar sx={{ width: 30, height: 30 }}>{userName[0].toUpperCase()}</Avatar>
            <Typography sx={{ fontWeight: 700 }}>{userName}</Typography>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} sx={{ padding: 2 }}>
            <Button variant="outlined" sx={{ flexGrow: 1 }} onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="contained" sx={{ flexGrow: 1 }} onClick={() => router.push("/signup")}>
              Sign-up
            </Button>
          </Stack>
        )}
        {user ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" sx={{ width: "90%" }}>
              <Typography>Manage my properties</Typography>
            </Button>
          </Box>
        ) : (
          <Divider />
        )}
        <List>
          <ListItem onClick={() => router.push("/rent")}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Rent" />
          </ListItem>
          <ListItem onClick={() => router.push("/buy")}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <RentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Buy" />
          </ListItem>
        </List>
      </Box>
      {user && (
        <>
          <Divider />
          <List>
            <ListItem onClick={logout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </List>
        </>
      )}
    </Drawer>
  );
}
