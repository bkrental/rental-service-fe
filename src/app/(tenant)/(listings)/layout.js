"use client";
import SearchBar from "@/components/SearchBar";
import MobileSearchBar from "@/components/SearchBar/MobileSearchBar";
import { Box, Container } from "@mui/material";

export default function PropertyLayout({ children }) {
  return (
    <Container maxWidth="xl" sx={{ position: "relative", mt: 2 }}>
      <SearchBar />
      <MobileSearchBar />
      <Box height={60} ></Box>

      {children}
    </Container>
  );
}
