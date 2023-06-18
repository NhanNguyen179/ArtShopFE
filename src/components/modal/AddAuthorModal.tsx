import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  TextField,
  Dialog,
} from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import authorAPI from "../../pages/api/author";
import { toast } from "react-toastify";
const style = {
  border: "2px solid #000",
  maxHeight: "600px",
  overflow: "scroll",
  width: '100%',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AddAuthorModal = ({ open, close }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      origin: "",
      birthday: new Date(),
    },
    onSubmit: async (values, helpers) => {
      try {
        await authorAPI.addAuthor(values);
        toast.success("Thêm tác giả thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        close();
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Dialog
      style={{ zIndex: 1800 }}
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Box sx={style}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <div>
                    <Typography variant="h4">Thêm tác giả</Typography>
                  </div>
                </Grid>

                <Grid item xs={12} md={6} lg={12}>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        error={!!(formik.touched.name && formik.errors.name)}
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        label="Tên tác giả"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name}
                      />
                      <TextField
                        error={
                          !!(formik.touched.origin && formik.errors.origin)
                        }
                        fullWidth
                        label="Nơi sinh"
                        name="origin"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.origin}
                      />
                      <TextField
                        error={
                          !!(formik.touched.birthday && formik.errors.birthday)
                        }
                        fullWidth
                        label="Ngày sinh"
                        name="birthday"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="date"
                        value={formik.values.birthday}
                      />
                      {/* <TextField
                        error={!!(formik.touched.sold && formik.errors.sold)}
                        fullWidth
                        helperText={formik.touched.sold && formik.errors.sold}
                        label="Đã bán "
                        name="sold"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="checkbox"
                        value={formik.values.sold}
                      /> */}
                    </Stack>

                    {/* {formik.errors.submit && (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                      {formik.errors.submit}
                    </Typography>
                  )} */}
                    <Button
                      fullWidth
                      size="medium"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="outlined"
                      color="primary"
                    >
                      Thêm tác giả
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </Dialog>
  );
};

export default AddAuthorModal;
