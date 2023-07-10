import React from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";

import NextLink from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import authAPI from "../api/auth";
import { toast } from "react-toastify";

export interface ILoginFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const requestData = {
          email: values.email,
          password: values.password,
        };
        const authData: any = await authAPI.login(requestData);
        localStorage.setItem("token", authData.access_token);
        if (authData.role === "admin") {
          router.push("/admin/product");
        } else {
          router.push("/");
        }
      } catch (err: any) {
        toast.error(err.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  return (
    <AuthLayout title={"Art Auction - Auth Page"}>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Đăng nhập</Typography>
              <Typography color="text.secondary" variant="body2">
                Chưa có tài khoản? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Đăng kí
                </Link>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Mật khẩu"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Tiếp tục
              </Button>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => router.push("/")}
              >
                Bỏ qua đăng nhập
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};
export default LoginPage;
