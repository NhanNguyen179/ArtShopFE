import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import authAPI from "../../pages/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const AccountProfileDetails = ({ myProfile }: any) => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: myProfile.name,
    email: myProfile.email,
    phone_number: myProfile.phone_number,
    visa_card: myProfile.visa_card,
    address: myProfile.address,
  });

  const handleChange = useCallback((event: any) => {
    console.log({values})
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, [values]);

  const handleSubmit = useCallback((event: any) => {
    authAPI.updateProfile(values).then((rs) => {
      toast.success("Cập nhập thông tin cá nhân thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace(router.asPath);
    }).catch((rs) => {
      toast.error("Cập nhập thông tin cá nhân thất bại!", {
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
    event.preventDefault();
  }, [values]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="*Vui lòng kiểm tra lại khi lưu thông tin, thông tin này sẽ dùng khi đấu giá"
          title="Thông tin cá nhân"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} item>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Tên người dùng"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone_number"
                  onChange={handleChange}
                  required
                  value={values.phone_number}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  fullWidth
                  label="Thẻ Visa"
                  name="visa_card"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.visa_card}
                />
              </Grid>
              <Grid xs={12} md={6} item>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "center", padding: "10px" }}>
          <Button variant="contained" type="submit">
            Cập nhập thông tin
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
