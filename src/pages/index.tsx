import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  ImageList,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";

import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useEffect, useState } from "react";
import productAPI from "./api/productApiFunction";
import { SeedProduct } from "../database/seed-data";
import { useRouter } from "next/router";
import { Carousel } from "../components/Carousel";
import ImageUpload from "../components/ImageUpload";
import { Product } from "../components/Type";
import axios from "axios";
import detectAPI from "./api/detect_function";

export type InfinitePage = {
  next: number;
  previous: number;
};
const HomePage: NextPage = () => {
  const [listProduct, setListProduct] = useState<SeedProduct[]>([]);
  const [infinitePage, setInfinitePage] = useState<InfinitePage>();
  const [trendingProduct, setTrendingProduct] = useState<Product[]>();
  const [forYouProduct, setForYouProduct] = useState<Product[]>();

  const [openDetectDialog, setOpenDetectDialog] = useState<boolean>(false);
  const router = useRouter();

  const getMoreListProduct = async () => {
    productAPI
      .getProduct(infinitePage?.next ?? 1, router.query?.searchString)
      .then((rs: any) => {
        setInfinitePage(rs.page);
        if (listProduct !== undefined) {
          setListProduct((listProduct: any) => [...listProduct, ...rs.data]);
        } else {
          setListProduct((listProduct) => [...rs.data]);
        }
      });
  };

  const fetchTrackingProduct = () => {
    Promise.all([
      detectAPI.getProductTrending(),
      detectAPI.getProductTrending(),
    ]).then((values: any) => {
      setTrendingProduct(values[0].data);
      setForYouProduct(values[1].data);
    });
  };
  useEffect(() => {
    setListProduct([]);
    getMoreListProduct();
  }, [router]);

  useEffect(() => {
    fetchTrackingProduct();
  }, []);

  return (
    <ShopLayout
      title={"Art Auction - Home"}
      pageDescription={"Find best Tesla products"}
      isPublic={true}
    >
      {" "}
      <Box
        component="main"
        sx={{
          paddingTop: 3,
        }}
      >
        {listProduct && trendingProduct && forYouProduct ? (
          <>
            <ImageUpload
              open={openDetectDialog}
              close={() => setOpenDetectDialog(false)}
            ></ImageUpload>
            <Button
              fullWidth
              size="medium"
              sx={{ mt: 3 }}
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => setOpenDetectDialog(true)}
            >
              Nhận diện tranh
            </Button>
            <Carousel
              listProduct={trendingProduct}
              title={"Tranh thịnh hành"}
            ></Carousel>
            <br></br>
            <Carousel
              listProduct={forYouProduct}
              title={"Dành cho bạn"}
            ></Carousel>
            <br></br>
            <Typography
              variant="h1"
              sx={{
                margin: "10px 0 15px 50px",
                fontWeight: "500",
                fontSize: "38px",
                position: "relative",
                fontFamily:
                  "Mercury Display A,Mercury Display B,MercuryDisplay,serif",
              }}
            >
              {" "}
              Tranh đấu giá hiện tại
              <div id="borderBottom"></div>
            </Typography>

            <ProductList
              products={listProduct}
              getMoreListProduct={getMoreListProduct}
              infinitePage={infinitePage}
            />

            <br />
          </>
        ) : (
          <FullScreenLoading />
        )}
      </Box>
    </ShopLayout>
  );
};

export default HomePage;
