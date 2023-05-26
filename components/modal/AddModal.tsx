import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  TextField,
  Modal,
  MenuItem,
  Dialog,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useEffect, useState } from "react";
import authorAPI from "../../pages/api/author";
import categoryAPI from "../../pages/api/cateogory";
import productAPI from "../../pages/api/productApiFunction";
import AddAuthorModal from "./AddAuthorModal";
import { AddCircleRounded, ImportContacts } from "@mui/icons-material";
import { toast } from "react-toastify";
import { SeedProduct } from "../../database/seed-data";
import { FullScreenLoading } from "../ui";

const style = {
  border: "2px solid #000",
  maxHeight: "600px",
  overflow: "scroll",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  productDetail?: SeedProduct;
}
const AddModal: FC<Props> = ({ productDetail }) => {
  const [file, setFile] = useState<File>();
  const [listAuthor, setListAuthor] = useState();
  const [listCategories, setListCategories] = useState();
  const [openAuthorModal, setOpenAuthorModal] = useState(false);

  const fetchData = async () => {
    Promise.all([authorAPI.getAuthor(), categoryAPI.getCategories()]).then(
      (values) => {
        setListAuthor(values[0]);
        setListCategories(values[1]);
      }
    );
  };
  const handleChange = (e) => {
    const data = e.target.files[0];
    setFile(data);
  };

  useEffect(() => {
    !openAuthorModal && fetchData();
  }, [openAuthorModal]);
  const formik = useFormik({
    initialValues: {
      name: productDetail?.name || "",
      category: productDetail?.category.id ?? "",
      author: productDetail?.author.id ?? "",
      sold: false,
      description: productDetail?.description ?? "",
      price: productDetail?.price ?? "",
      start_auction: productDetail?.start_auction ?? "",
      end_auction: productDetail?.end_auction ?? "",
    },
    validationSchema: Yup.object({
      start_auction: Yup.date()
        .required("Start date is required")
        .min(new Date(), "Start datetime cannot be in the past"),
      name: Yup.string().required("Name is required"),
      category: Yup.string().required("Category is required"),
      author: Yup.string().required("Author is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (productDetail) {
          productAPI
            .updateProduct(productDetail.id, values)
            .then(async (rs) => {
              await productAPI.addPicture(rs.id, file);
              toast.success("Cập nhập sản phẩm thành công!", {
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
        } else {
          productAPI.addProduct(values).then(async (rs) => {
            await productAPI.addPicture(rs.id, file);
            toast.success("Thêm sản phẩm thành công!", {
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
        }
      } catch (err) {
        console.log(err);

        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <>
      {listAuthor && listCategories ? (
        <Box sx={style}>
          <AddAuthorModal
            open={openAuthorModal}
            close={() => setOpenAuthorModal(false)}
          ></AddAuthorModal>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={12}>
                    <div>
                      <Typography variant="h4">
                        {productDetail ? "Thêm sản phẩm" : "Cập nhập sản phẩm"}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input type="file" onChange={handleChange} />
                    {file && (
                      <div>
                        <span>{file.name}</span>
                        <img src={URL.createObjectURL(file)} className="mb-5" />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <form noValidate onSubmit={formik.handleSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          error={!!(formik.touched.name && formik.errors.name)}
                          fullWidth
                          helperText={formik.touched.name && formik.errors.name}
                          label="Tên sản phẩm"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.name}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.category && formik.errors.category
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.category && formik.errors.category
                          }
                          label="Thể loại tranh"
                          name="category"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          select
                          value={formik.values.category}
                        >
                          {listCategories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          error={
                            !!(formik.touched.author && formik.errors.author)
                          }
                          fullWidth
                          helperText={
                            formik.touched.author && formik.errors.author
                          }
                          label="Tác giả"
                          select
                          name="author"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.author}
                        >
                          {listAuthor.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                          <MenuItem>
                            <IconButton
                              onClick={() => setOpenAuthorModal(true)}
                            >
                              <AddCircleRounded>Thêm tác giả</AddCircleRounded>
                            </IconButton>
                          </MenuItem>
                        </TextField>
                        <TextField
                          error={
                            !!(
                              formik.touched.description &&
                              formik.errors.description
                            )
                          }
                          fullWidth
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          label="Mô tả"
                          name="description"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="text"
                          value={formik.values.description}
                        />
                        <TextField
                          error={
                            !!(formik.touched.price && formik.errors.price)
                          }
                          fullWidth
                          helperText={
                            formik.touched.price && formik.errors.price
                          }
                          label="Giá sản phẩm"
                          name="price"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="number"
                          value={formik.values.price}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.start_auction &&
                              formik.errors.start_auction
                            )
                          }
                          fullWidth
                          label="Ngày bắt đầu"
                          name="start_auction"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="date"
                          value={formik.values.start_auction}
                        />
                        <TextField
                          error={
                            !!(
                              formik.touched.end_auction &&
                              formik.errors.end_auction
                            )
                          }
                          fullWidth
                          label="Ngày kết thúc"
                          name="end_auction"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="date"
                          value={formik.values.end_auction}
                        />
                      </Stack>

                      {formik.errors.submit && (
                        <Typography
                          color="error"
                          sx={{ mt: 3 }}
                          variant="body2"
                        >
                          {formik.errors.submit}
                        </Typography>
                      )}
                      <Button
                        fullWidth
                        size="medium"
                        sx={{ mt: 3 }}
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        {!productDetail ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};

export default AddModal;
