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
import expertApi from "../../pages/api/expertApi";
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

const AddExpertModal = ({ open, close }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      workFrom: "",
      birthday: new Date(),
    },
    onSubmit: async (values, helpers) => {
      try {
        const requestData = {
          name: values.name,
          work_from: values.workFrom,
          birthday: values.birthday,
        };
        await expertApi.addExpert(values);
        toast.success("Thêm chuyên gia thành công!", {
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
                    <Typography variant="h4">Thêm chuyên gia</Typography>
                  </div>
                </Grid>

                <Grid item xs={12} md={6} lg={12}>
                  <form noValidate onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        error={!!(formik.touched.name && formik.errors.name)}
                        fullWidth
                        helperText={formik.touched.name && formik.errors.name}
                        label="Tên chuyên gia"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name}
                      />
                      <TextField
                        error={
                          !!(formik.touched.workFrom && formik.errors.workFrom)
                        }
                        fullWidth
                        label="Nơi làm việc"
                        name="workFrom"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.workFrom}
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
                    </Stack>

                    <Button
                      fullWidth
                      size="medium"
                      sx={{ mt: 3 }}
                      type="submit"
                      variant="outlined"
                      color="primary"
                    >
                      Thêm chuyên gia
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

export default AddExpertModal;
