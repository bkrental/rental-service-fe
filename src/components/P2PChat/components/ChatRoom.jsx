import {
  useGetP2PMessagesQuery,
  useLazyGetP2PMessagesQuery,
  useSendP2PMessageMutation,
} from "@/redux/features/landlord/api";
import Send from "@mui/icons-material/Send";
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { Box, Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoUserSelected from "./NoUserSelected";
import { sendMessage } from "@/app/socketio";

export default function ChatRoom() {
  const [input, setInput] = useState("");
  const user = useSelector((s) => s.auth.user);
  const targetingUser = useSelector((s) => s.system.chatTargetingUser);
  const [getP2PMessages, { data, isLoading, isError }] = useLazyGetP2PMessagesQuery();

  const isSent = useCallback((message) => message.sender === user.id);

  const fetchMessages = useCallback(() => {
    if (targetingUser?.id && user?.id) {
      getP2PMessages({ senderId: user.id, receiverId: targetingUser.id });
    }
  }, [targetingUser]);

  const handleSendMessage = useCallback(
    async (message) => {
      try {
        // const response = await sendMessage({ receiverId: targetingUser.id, text: message }).unwrap();
        sendMessage({ message, receiverId: targetingUser.id });

        setInput("");
        fetchMessages();
      } catch (error) {
        console.error("Error sending message", error);
      }
    },
    [targetingUser]
  );

  // Handle fetching messages
  useEffect(() => {
    fetchMessages();
    if (!targetingUser) {
      return;
    }

    const getNewMessage = (e) => {
      const { text, senderId, receiverId } = e.detail;
      console.log("new message", e.detail);
      if (senderId !== targetingUser.id) {
        console.log(senderId, targetingUser.id);
        return;
      }

      fetchMessages();
    };

    window.addEventListener("new-message", getNewMessage);

    return () => {
      window.removeEventListener("new-message", getNewMessage);
    };
  }, [targetingUser]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error when fetching the messages</Typography>;
  }

  if (!targetingUser) {
    return <NoUserSelected />;
  }

  return (
    <Stack direction="column" sx={{ height: "calc(100vh - 60px)", pb: 1, overflowY: "scroll" }}>
      <ListItem sx={{ backgroundColor: grey[100], boxShadow: 1 }}>
        <ListItemAvatar>
          <Avatar sizes="small" src={targetingUser?.avatar} />
        </ListItemAvatar>
        <ListItemText primary={targetingUser?.name} />
      </ListItem>
      <Stack spacing={1} sx={{ overflowY: "scroll", position: "relative", flexGrow: 1 }}>
        {(data ?? []).map((message, index) => (
          <Box
            key={message._id}
            sx={{ display: "flex", justifyContent: isSent(message) ? "flex-end" : "flex-start", p: 1 }}
          >
            <Typography
              sx={{
                border: 1,
                color: isSent(message) ? "#fff" : "inherit",
                bgcolor: isSent(message) ? "rgba(239,108,0, 0.8)" : grey[200],
                borderRadius: 2,
                p: 1,
              }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} px={1}>
        <TextField
          size="small"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleSendMessage(e.target.value)}
          sx={{ borderRadius: 2 }}
        />
        <IconButton color="primary">
          <Send />
        </IconButton>
      </Stack>
    </Stack>
  );
}
