"use client";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { Button, Box, Link, useTheme, useMediaQuery } from "@mui/material";
import "@scss/homepage.scss";
import NextLink from "next/link";


const LandingLink = ({ children, ...props }) => (
  <Link component={NextLink} underline="none" {...props}>
    {children}
  </Link>
);

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="home_container">
      <div className="home_hero">
        <h1>
          Experience the ease of{" "}
          <span className="home_highlight">BKRental</span> for seamless home
          discovery.
        </h1>

        <h4 className="home_subtitle">
          Discover houses and apartments for rent tailored to your needs and
          budget.
        </h4>

        {!isMobile ? (<div className="home_search">
          <input
            placeholder="Search for City, Address, Neighbourhood..."
            className="home_search-input"
          />
          <button className="home_searchBtn">
            <SearchIcon sx={{ fontSize: 24, color: "hsl(60, 9.1%, 97.8%)" }} />
          </button>
        </div>) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}>
            <LandingLink href="/rent">
              <Button variant="contained" color="primary" sx={{ width: "200px" }}>
                Explore Rentals
              </Button>
            </LandingLink>
          </Box>)}


      </div>
      {!isMobile && (<div className="home_banner">
        <Image
          priority={true}
          src="/banner.png"
          className="home_bannerImage"
          alt="The BKRental banner image"
          width={300}
          height={300}
        />
      </div>)}
    </div >
  );
}

export default HomePage;
