import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { SeedProduct } from "../../database/seed-data";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import auctionAPI from "../../pages/api/auction";
import { userAddAuctionPrice } from "../../activity-tracking/ActivityTrackingService";
import ConfirmDialog from "./ConfirmModal";
import { fCurrency } from "../../utils/formatNumber";

const style = {
  border: "2px solid #000",
  maxHeight: "600px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  width: "500px",
};

export interface ILoginFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

interface Props {
  product: SeedProduct;
  onClose: () => void;
}

export const AuctionModal: FC<Props> = ({
  product,
  onClose,
  myProfile,
}: any) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      productId: product.id,
      highestPrice:
        product.auction_price === 0 ? product.price : product.auction_price,
      auctionPrice: 0,
    },
    validationSchema: Yup.object({
      auctionPrice: Yup.number()
        .required("Xin hãy điền giá đấu giá")
        .min(product.price, "Giá lớn hơn giá hiện tại"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (!myProfile.is_completed) {
          toast.error(
            "Bạn chưa cập nhập đủ thông tin cá nhân cần thiết, vui lòng kiểm tra!",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
        const { productId, auctionPrice } = values;
        await auctionAPI.createAuction(productId, auctionPrice);
        userAddAuctionPrice(product, auctionPrice);
        toast.success("Đấu giá thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose();
      } catch (err) {
        toast.error("Đấu giá thất bại!", {
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
    <Box sx={style}>
      <ConfirmDialog
        title={
          formik.values.auctionPrice
            ? `Xác nhận tham gia đấu giá với mức giá ${fCurrency(
                formik.values.auctionPrice
              )}  cho tranh ${product?.name}`
            : ""
        }
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        onConfirm={formik.handleSubmit}
      ></ConfirmDialog>
      <Typography
        id="modal-modal-title"
        variant="h1"
        component="h1"
        sx={{
          marginBottom: "10px",
        }}
      >
        {product.name}
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={
              !!(formik.touched.highestPrice && formik.errors.highestPrice)
            }
            fullWidth
            label="Giá cao nhất hiện tại"
            name="highestPrice"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.highestPrice}
            disabled={true}
          />
          <TextField
            error={
              !!(formik.touched.auctionPrice && formik.errors.auctionPrice)
            }
            helperText={
              formik.touched.auctionPrice && formik.errors.auctionPrice
            }
            fullWidth
            label="Giá đặt"
            name="auctionPrice"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.auctionPrice}
          />
          <Button
            fullWidth
            size="medium"
            type="button"
            sx={{ mt: 3 }}
            onClick={() => setOpenConfirmModal(true)}
            variant="outlined"
            color="primary"
            disabled={formik.values.auctionPrice < formik.values.highestPrice}
          >
            Đấu giá sản phẩm
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
