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

const RegisterPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      phoneNumber: Yup.string().max(255).required("phoneNumber is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const requestData = {
          email: values.email,
          password: values.password,
          phone_number: `0${values.phoneNumber}`,
        };
        await authAPI.register(requestData);
        toast.success("Đăng kí thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/auth/login");
      } catch (err) {
        toast.error("Đăng kí thất bại!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title={"Art Auction - Register Page"}>
      <Head>
        <title>Register | Art Auction</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
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
            <Tabs sx={{ mb: 3 }}>
              <Tab label="Đăng kí tài khoản" />
            </Tabs>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
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
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                  fullWidth
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  label="Số điện thoại"
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phoneNumber}
                />
              </Stack>

              {/* {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )} */}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Đăng kí tài khoản
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};
export default RegisterPage;
