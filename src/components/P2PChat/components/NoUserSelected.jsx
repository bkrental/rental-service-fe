import { Stack, Typography } from "@mui/material";

export default function NoUserSelected() {
  return (
    <Stack direction="column" sx={{ p: 2 }}>
      <Typography variant="h6">No user selected</Typography>
      <Typography variant="body2">Please select a user to chat with</Typography>
    </Stack>
  );
}
