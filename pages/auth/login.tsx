// import {
//   Box,
//   Button,
//   FormControl,
//   Grid,
//   Link,
//   TextField,
//   Typography,
// } from "@mui/material";
import React from "react";
import { AuthLayout } from "../../components/layouts/AuthLayout";

import NextLink from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
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

export interface ILoginFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123!",
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
        console.log(requestData);
        const authData = await authAPI.login(requestData);
        localStorage.setItem("token", authData.access_token);
        if (authData.role === "admin") {
          router.push("/admin/product");
        } else {
          router.push("/");
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title={"Art Auction - Auth Page"}>
      <Head>
        <title>Login | Devias Kit</title>
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
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs sx={{ mb: 3 }}>
              <Tab label="Email" value="email" />
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
              </Stack>
              <FormHelperText sx={{ mt: 1 }}>
                Optionally you can skip.
              </FormHelperText>
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
                variant="contained"
              >
                Continue
              </Button>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                // onClick={handleSkip}
              >
                Skip authentication
              </Button>
              <Alert severity="info" sx={{ mt: 3 }}>
                <div>
                  You can use <b>demo@devias.io</b> and password{" "}
                  <b>Password123!</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};
export default LoginPage;
