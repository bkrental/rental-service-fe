import { Badge, Avatar, ListItemAvatar } from "@mui/material";

export default function AvatarWithStatus({ online, userId, src }) {
  return (
    <ListItemAvatar>
      <Badge
        sx={{
          "& .MuiBadge-dot": {
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: online.includes(userId) ? "limegreen" : "grey",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
        color="success"
        overlap="circular"
        invisible={!online.includes(userId)}
      >
        <Avatar src={src} />
      </Badge>
    </ListItemAvatar>
  );
}
