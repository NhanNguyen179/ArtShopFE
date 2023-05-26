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

export const SideMenu = () => {
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

          <ListItem button>
            <ListItemIcon onClick={() => navigateTo("/")}>
              <HomeMax />
            </ListItemIcon>
            <ListItemText primary={"Trang chủ"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon onClick={() => navigateTo("/profile/profile")}>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hồ sơ"} />
          </ListItem>

          <ListItem>
            <ListItemIcon onClick={() => navigateTo("/")}>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Sản phẩm đang đấu giá"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/men")}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/women")}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItem>

          <ListItem
            button
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigateTo("/category/kid")}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Đăng nhập"} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Đăng xuất"} />
          </ListItem>

          {/* Admin */}
          <Divider />
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
        </List>
      </Box>
    </Drawer>
  );
};
