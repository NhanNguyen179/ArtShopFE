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
import { compareAsc, format } from "date-fns";
import AddExpertModal from "./AddExpertModal";
import expertApi from "../../pages/api/expertApi";

const style = {
  maxHeight: "600px",
  overflow: "scroll",
  minWidth: "300px",
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
  const [listAuthor, setListAuthor] = useState([]);
  const [listExpert, setListExpert] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [openAuthorModal, setOpenAuthorModal] = useState(false);
  const [openExpertModal, setOpenExpertModal] = useState(false);

  const fetchData = async () => {
    Promise.all([
      authorAPI.getAuthor(),
      categoryAPI.getCategories(),
      expertApi.getListExpert(),
    ]).then((values) => {
      setListAuthor(values[0]);
      setListCategories(values[1]);
      setListExpert(values[2]);
    });
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
      expert: productDetail?.expert.id ?? "",
      expertPrice: productDetail?.expert_price ?? 0,
      sold: false,
      description: productDetail?.description ?? "",
      price: productDetail?.price ?? "",
      start_auction:
        (productDetail?.start_auction &&
          format(new Date(productDetail?.start_auction), "yyyy-MM-dd")) ??
        "",
      end_auction:
        (productDetail?.end_auction &&
          format(new Date(productDetail?.end_auction), "yyyy-MM-dd")) ??
        "",
    },
    validationSchema: Yup.object({
      start_auction: Yup.date()
        .required("Vui lòng nhập ngày bắt đầu")
        .min(new Date(), "Ngày bắt đầu phải lớn hơn hiện tại"),
      name: Yup.string().required("Vui lòng nhập tên"),
      category: Yup.string().required("Vui lòng nhập thể loại tranh"),
      author: Yup.string().required("Vui lòng nhập tác giả"),
      description: Yup.string().required("Vui lòng nhập mô tả"),
      price: Yup.number().required("Vui lòng nhập giá bắt đầu"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const requestData = {
          ...values,
          expert_price: values.expertPrice,
        };

        if (productDetail) {
          productAPI
            .updateProduct(productDetail.id, requestData)
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
          productAPI.addProduct(requestData).then(async (rs) => {
            // await productAPI.addPicture(rs.id, file);
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
        toast.error("Lỗi!", {
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
    <>
      {listAuthor && listCategories && listExpert ? (
        <Box sx={style}>
          <AddAuthorModal
            open={openAuthorModal}
            close={() => setOpenAuthorModal(false)}
          ></AddAuthorModal>
          <AddExpertModal
            open={openExpertModal}
            close={() => setOpenExpertModal(false)}
          ></AddExpertModal>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Typography
                variant="h4"
                textAlign={"center"}
                marginBottom={"10px"}
              >
                {productDetail ? "Thêm sản phẩm" : "Cập nhập sản phẩm"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleChange} />
              {file && (
                <div>
                  <span>{file.name}</span>
                  <img src={URL.createObjectURL(file)} className="mb-5" />
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
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
                      !!(formik.touched.category && formik.errors.category)
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
                    error={!!(formik.touched.author && formik.errors.author)}
                    fullWidth
                    helperText={formik.touched.author && formik.errors.author}
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
                      <IconButton onClick={() => setOpenAuthorModal(true)}>
                        <AddCircleRounded>Thêm tác giả</AddCircleRounded>
                      </IconButton>
                    </MenuItem>
                  </TextField>
                  <TextField
                    error={!!(formik.touched.expert && formik.errors.expert)}
                    fullWidth
                    helperText={formik.touched.expert && formik.errors.expert}
                    label="Chuyên gia"
                    select
                    name="expert"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.expert}
                  >
                    {listExpert.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <IconButton onClick={() => setOpenExpertModal(true)}>
                        <AddCircleRounded>Thêm chuyên gia</AddCircleRounded>
                      </IconButton>
                    </MenuItem>
                  </TextField>
                  <TextField
                    error={
                      !!(
                        formik.touched.description && formik.errors.description
                      )
                    }
                    fullWidth
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    label="Mô tả"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.description}
                  />
                  <TextField
                    error={!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
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
                        formik.touched.expertPrice && formik.errors.expertPrice
                      )
                    }
                    fullWidth
                    helperText={
                      formik.touched.expertPrice && formik.errors.expertPrice
                    }
                    label="Giá của chuyên gia"
                    name="expertPrice"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.expertPrice}
                  />
                  <TextField
                    error={
                      !!(
                        formik.touched.start_auction &&
                        formik.errors.start_auction
                      )
                    }
                    helperText={
                      formik.touched.start_auction &&
                      formik.errors.start_auction
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
                        formik.touched.end_auction && formik.errors.end_auction
                      )
                    }
                    helperText={
                      formik.touched.end_auction && formik.errors.end_auction
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
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
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
        </Box>
      ) : (
        <Box sx={style}>
          <FullScreenLoading></FullScreenLoading>
        </Box>
      )}
    </>
  );
};

export default AddModal;
