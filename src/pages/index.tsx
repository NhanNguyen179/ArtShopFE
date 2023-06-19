import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  ImageList,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useEffect, useState, useCallback } from "react";
import productAPI from "./api/productApiFunction";
import { SeedProduct } from "../database/seed-data";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

export type InfinitePage = {
  next: number;
  previous: number;
};
const HomePage: NextPage = () => {
  const [listProduct, setListProduct] = useState<SeedProduct[]>([]);
  const [infinitePage, setInfinitePage] = useState<InfinitePage>();
  const router = useRouter();
  console.log(router.query);

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
  useEffect(() => {
    setListProduct([]);
    getMoreListProduct();
  }, [router]);

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
        {listProduct ? (
          <>
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
