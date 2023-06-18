import { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  ArrowCircleRightOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  HomeMax,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../context";
import { User } from "../Type";

const userMenu = [
  {
    link: "/",
    label: "Trang chủ",
  },
  {
    link: "/profile",
    label: "Hồ sơ",
  },
  {
    link: "/auction_user",
    label: "Sản phẩm đang đấu giá",
  },
];
const adminMenu = [
  {
    link: "/admin/product",
    label: "Sản phẩm",
  },
];
export const SideMenu = ({ myProfile }: User) => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const onSearchTerm = () => {
    if (searchTerm.trim().length == 0) return;
    navigateTo(`/search/${searchTerm}`);
  };
  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigateTo("/auth/login");
  };
  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      onClose={toggleSideMenu}
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Tìm kiếm.."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {userMenu.map((item) => (
            <>
              <ListItem button>
                <ListItemIcon onClick={() => navigateTo(item.link)}>
                  <ArrowCircleRightOutlined />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </>
          ))}

          <ListItem button>
            <ListItemIcon onClick={() => logOut()}>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Đăng xuất"} />
          </ListItem>
          <Divider />

          {/* Admin */}
          {myProfile?.role.name === "admin" && (
            <>
              <ListSubheader>Bảng quản trị</ListSubheader>
              <ListItem button>
                <ListItemIcon onClick={() => navigateTo("/admin/product")}>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Sản phẩm"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon onClick={() => navigateTo("/admin/user")}>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Người dùng"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
