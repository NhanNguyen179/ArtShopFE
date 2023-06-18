import { useContext, useState } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { UiContext } from "../../context/ui/UiContext";

export const Navbar = ({ myProfile }: any) => {
  const router = useRouter();
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchTerm = () => {
    if (searchTerm.trim().length == 0) return;
    push(`/search/${searchTerm}`);
  };
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Art</Typography>
            <Typography
              sx={{
                ml: 0.5,
              }}
            >
              Auction
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/" passHref>
            <Link>
              <Typography
                variant="h2"
                sx={{
                  textDecoration: asPath === "/" ? "underline" : "none",
                  display: "inline",
                  marginRight: "50px",
                }}
              >
                Auction
              </Typography>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        {isSearchVisible ? (
          <Input
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Tìm kiếm..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        {/* <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink> */}
        <Button
          onClick={
            myProfile?.name ?  toggleSideMenu : () => router.push("/auth/login")
          }
        >
          {myProfile?.name ? "Menu" : "Login"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
