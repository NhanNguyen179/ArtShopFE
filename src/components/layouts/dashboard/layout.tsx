import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
// import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import Auth from "../../Auth";
import { SideMenu } from "../../ui";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

// export const Layout = withAuthGuard((props) => {
export const DashBoardLayout = (props) => {
  const { children, isPublic } = props;
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <Auth isPublic={isPublic}>
        <TopNav onNavOpen={() => setOpenNav(true)} />
        <SideMenu />

        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>{children}</LayoutContainer>
        </LayoutRoot>
      </Auth>
    </>
  );
};
