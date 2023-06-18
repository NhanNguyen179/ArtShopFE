import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow } from "../../components/products";
import Countdown from "react-countdown";
import { SeedProduct } from "../../database/seed-data";
import { ListTickets } from "../../components/ticket/ListTickets";
import { AuctionModal } from "../../components/modal/AuctionModal";
import productAPI from "../api/productApiFunction";
import { useRouter } from "next/router";
import { FullScreenLoading } from "../../components/ui";
import { Product, UserAuctionProduct } from "../../components/Type";
import { CountDown } from "../../components/countDown";
import { DescriptionProduct } from "../../components/desCriptionProduct";
import { visitProductDetailPageEvent } from "../../activity-tracking/ActivityTrackingService";
interface Props {
  product: SeedProduct;
}

const ProductPage: NextPage<Props> = () => {
  const [open, setOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<Product>();
  const [listPeopleAuctionProduct, setListPeopleAuctionProduct] =
    useState<UserAuctionProduct[]>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const fetchData = async () => {
    Promise.all([
      productAPI.getDetailProduct(router.query.slug),
      productAPI.getListAuctionPriceProduct(router.query.slug),
    ]).then((values: any) => {
      setProductDetail(values[0]);
      setListPeopleAuctionProduct(values[1]);
      visitProductDetailPageEvent(values[0]);
    });
  };
  useEffect(() => {
    if (router.query.slug && !open) {
      fetchData();
    }
  }, [router, open]);
  return (
    <>
      {productDetail && listPeopleAuctionProduct ? (
        <ShopLayout
          title={productDetail.name}
          pageDescription={productDetail.description}
          isPublic={true}
        >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AuctionModal product={productDetail} onClose={handleClose} />
          </Dialog>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <Typography
                sx={{
                  fontSize: "50px",
                }}
              >
                {productDetail.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} display={"flex"} alignItems={"center"}>
              <CountDown
                endDate={new Date(productDetail.end_auction)}
              ></CountDown>
            </Grid>
            <Grid item xs={12} sm={12} alignItems={"flex-end"}>
              <ProductSlideShow images={productDetail.images} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider></Divider>
              <Box
                sx={{
                  width: "100%",
                  height: "80px",
                  backgroundColor: "#edececb8",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  gap: "30px",
                }}
              >

                <Typography variant="subtitle1">
                  {" "}
                  Chuyên gia: {productDetail.expert.name} |
                </Typography>
                <Typography variant="subtitle1">
                  {" "}
                  Định giá: {productDetail.expert_price} |
                </Typography>
                <Typography variant="subtitle1">
                  {" "}
                  {productDetail.expert.work_from}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DescriptionProduct product={productDetail}></DescriptionProduct>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ position: "relative" }}>
                <ListTickets
                  listPeopleAuctionProduct={listPeopleAuctionProduct}
                ></ListTickets>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    right: "0",
                    borderRadius: "0 0 0px 20px",
                    backgroundColor: "white !important",
                  }}
                >
                  <Typography variant="button">ĐẤU GIÁ</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ShopLayout>
      ) : (
        <FullScreenLoading />
      )}
    </>
  );
};

//Get Static Paths
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const product = await productAPI.getDetailProduct(ctx.query.slug);
//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductPage;
