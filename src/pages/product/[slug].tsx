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
import { HighestPrice } from "../../components/HighestPrice";
import { Carousel } from "../../components/Carousel";
import { fCurrency } from "../../utils/formatNumber";
import axios from "axios";
interface Props {
  product: SeedProduct;
}

const ProductPage: NextPage<Props> = () => {
  const [open, setOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<Product>();
  const [listPeopleAuctionProduct, setListPeopleAuctionProduct] =
    useState<UserAuctionProduct[]>();
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [suggestListProduct, setSuggestListProduct] = useState<Product[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const fetchData = async () => {
    Promise.all([
      productAPI.getDetailProduct(router.query.slug),
      productAPI.getListAuctionPriceProduct(router.query.slug),
      productAPI.getProduct(1, ""),
      productAPI.getSuggestListOfProduct(router.query.slug),
    ]).then((values: any) => {
      setProductDetail(values[0]);
      setListPeopleAuctionProduct(values[1]);
      visitProductDetailPageEvent(values[0]);
      setListProduct(values[2].data);
      setSuggestListProduct(values[3].data);
    });
  };

  useEffect(() => {
    if (router.query.slug && !open) {
      fetchData();
    }
  }, [router, open]);
  return (
    <>
      {productDetail &&
      listPeopleAuctionProduct &&
      listProduct &&
      suggestListProduct ? (
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
            <Grid item xs={12} sm={7} display={"flex"}>
              <p className="text-6xl font-bold flex items-center">
                {productDetail.name}
              </p>
            </Grid>
            <Grid item xs={12} sm={4}>
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
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  gap: "30px",
                }}
              >
                <p className="text-2xl">
                  {" "}
                  Chuyên gia: {productDetail.expert.name} |
                </p>
                <p className="text-2xl">
                  {" "}
                  Định giá: {fCurrency(Number(productDetail.expert_price))} |
                </p>
                <p className="text-2xl"> {productDetail.expert.work_from} </p>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DescriptionProduct product={productDetail}></DescriptionProduct>
            </Grid>
            <Grid item xs={12} sm={6}>
              <HighestPrice
                listPeopleAuctionProduct={listPeopleAuctionProduct}
              ></HighestPrice>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ position: "relative", marginTop: "30px" }}>
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
                  <p>ĐẤU GIÁ</p>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ position: "relative", marginTop: "30px" }}>
                <Carousel
                  listProduct={suggestListProduct}
                  title="Sản phẩm cùng loại"
                ></Carousel>
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
