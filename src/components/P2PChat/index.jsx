"use client";
import SocketProvider from "@/app/socketio";
import ChatPreview from "@/components/P2PChat/components/ChatPreview";
import ChatRoom from "@/components/P2PChat/components/ChatRoom";
import UserSearch from "@/components/P2PChat/components/UserSearch";
import { useGetPreviewMessagesQuery } from "@/redux/features/landlord/api";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function P2PChat() {
  const { data } = useGetPreviewMessagesQuery();
  const [chatPreviews, setChatPreviews] = useState([]);
  const targetingUser = useSelector((s) => s.system.chatTargetingUser);

  useEffect(() => {
    setChatPreviews(data ?? []);
  }, [data]);

  return (
    <SocketProvider>
      <Grid container columns={10} height="calc(100vh - 60px)" width="100%">
        <Grid xs={3} sx={{ p: 1, boxShadow: 1, height: "100%" }}>
          <UserSearch />

          <ChatPreview previews={chatPreviews} setPreviews={setChatPreviews} />
        </Grid>
        <Grid xs={7}>
          <ChatRoom />
        </Grid>
      </Grid>
    </SocketProvider>
  );
}
