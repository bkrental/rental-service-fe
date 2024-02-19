"use client";
import { useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import {
  BaseContainer,
  BaseLink,
  BaseGridContainer,
  TitleTypo,
  SubtTitleTypo,
  StyledPage,
  BaseButton,
} from "./BaseComponents";
import { changeBtnVar } from "@redux/features/header/headerSlice";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const HeaderContainer = styled(BaseGridContainer)`
  height: ${({ theme }) => theme.componentSize.header.height};
  background-color: ${({ theme }) => theme.palette.background.default};
  // background-color: yellow;

  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderItem = styled(BaseContainer)`
  grid-column: span 12;

  // background-color: red;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: space-between;
  align-items: center;

  .left-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // background-color: blue;
    gap: 32px;

    .tenant-landlord-option {
      display: flex;
      align-items: center;
      gap: 12px;

      .tenant-landlord-btn{
          color: ${({ theme }) => theme.palette.text.secondary};
        &:hover, &.active{
          background-color: ${({ theme }) => theme.palette.primary.main};
          color: ${({ theme }) => theme.palette.text.active};
        } 
      }
    }
  }

  .right-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: green;
`;

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const curBtnVar = useSelector((state) => state.header.curBtnVar);
  console.log("curBtnVar", curBtnVar);

  const handleBtnOnClick = (e) => {
    const handleRedirectRouteLandlord = () => {
      // get accToken from local storage
      const accToken = localStorage.getItem("accessToken");
      console.log("accToken", accToken);
      if (accToken) {
        router.push("/landlord/");
        dispatch(changeBtnVar({ btnClicked }));
      } else {
        alert("Please login first");
      }
    };

    const btnClicked = e.currentTarget.getAttribute("data-value");
    if (btnClicked == "landlord") {
      handleRedirectRouteLandlord();
    } else {
      dispatch(changeBtnVar({ btnClicked }));
    }
  };

  return (
    <HeaderContainer container className="nav-bar container">
      <HeaderItem>
        <Box className="left-section">
          <TitleTypo variant="h1">
            <BaseLink href="/">BKrental</BaseLink>
          </TitleTypo>
          <TenantLandlordOption
            handleBtnOnClick={handleBtnOnClick}
            curBtnVar={curBtnVar}
          />
        </Box>

        <Box className="right-section">
          <BaseLink href="/auth/login">
            <BaseButton variant="contained" color="primary">
              <SubtTitleTypo variant="h2">Login</SubtTitleTypo>
            </BaseButton>
          </BaseLink>
          <BaseLink href="/auth/signup">
            <BaseButton variant="contained" color="primary">
              <SubtTitleTypo variant="h2">Signup</SubtTitleTypo>
            </BaseButton>
          </BaseLink>
        </Box>
      </HeaderItem>
    </HeaderContainer>
  );
}

const TenantLandlordOption = ({ handleBtnOnClick, curBtnVar }) => {
  return (
    <BaseContainer className="tenant-landlord-option">
      <BaseLink href="/">
        <BaseButton
          variant={curBtnVar.tenant.type}
          className={`tenant-landlord-btn ${curBtnVar.tenant.status}`}
          color="primary"
          data-value="tenant"
          onClick={handleBtnOnClick}
        >
          <SubtTitleTypo variant="h2">Tenant</SubtTitleTypo>
        </BaseButton>
      </BaseLink>
      <BaseButton
        variant={curBtnVar.landlord.type}
        className={`tenant-landlord-btn ${curBtnVar.landlord.status}`}
        color="primary"
        data-value="landlord"
        onClick={handleBtnOnClick}
        // onClick={() => {
        //   handleBtnOnClick();
        //   handleRedirectRouteLandlord();
        // }}
      >
        <SubtTitleTypo variant="h2">Landlord</SubtTitleTypo>
      </BaseButton>
    </BaseContainer>
  );
};

export default Header;
