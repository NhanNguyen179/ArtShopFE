import { Label } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";
import { useEffect, useState } from "react";
import { User } from "../../components/Type";
import userApi from "../api/user";
import { FullScreenLoading } from "../../components/ui";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/modal/ConfirmModal";

const UserPage = () => {
  const [listUser, setListUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const fetchData = async () => {
    const listUser = await userApi.getListUser();
    setListUser(listUser);
  };
  const changeActive = () => {
    userApi
      .changeStatusUser(selectedUser ?? "")
      .then((rs) => {
        toast.success("Đổi trạng thái thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((rs) => {
        toast.error("Đổi trạng thái thất bại!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  useEffect(() => {
    !openConfirmModal && fetchData();
  }, [openConfirmModal]);
  return (
    <>
      {listUser ? (
        <DashBoardLayout isPublic={false}>
          <ConfirmDialog
            title="Bạn có chắc muốn thay đổi trạng thái tài khoản này"
            open={openConfirmModal}
            setOpen={setOpenConfirmModal}
            onConfirm={changeActive}
          ></ConfirmDialog>
          <Container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4" gutterBottom>
                Tài khoản
              </Typography>
              <Button variant="contained">Thêm tài khoản</Button>
            </Stack>

            <Card>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Số điện thoại</TableCell>
                      <TableCell align="left">
                        Tổng số tiền đã đấu giá
                      </TableCell>
                      <TableCell align="left">Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listUser.map((item: User) => {
                      const { id, email, is_active, phone_number } = item;

                      return (
                        <TableRow hover key={id}>
                          <TableCell align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {email}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{phone_number}</TableCell>

                          <TableCell align="left">$1000</TableCell>

                          <TableCell align="left">
                            <Chip
                              variant="outlined"
                              color={is_active ? "success" : "warning"}
                              label={is_active ? "Đã kích hoạt" : "Vô hiệu hóa"}
                            ></Chip>
                          </TableCell>
                          <TableCell align="left">
                            <Switch
                              checked={is_active}
                              color="success"
                              onChange={() => {
                                setSelectedUser(id);
                                setOpenConfirmModal(true);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Container>
        </DashBoardLayout>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};

export default UserPage;
