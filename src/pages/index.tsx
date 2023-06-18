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
import { useEffect, useState } from "react";
import productAPI from "./api/productApiFunction";
import { SeedProduct } from "../database/seed-data";
import InfiniteScroll from "react-infinite-scroll-component";

export type InfinitePage = {
  next: number;
  previous: number;
};
const HomePage: NextPage = () => {
  const [listProduct, setListProduct] = useState<SeedProduct[]>();
  const [infinitePage, setInfinitePage] = useState<InfinitePage>();

  const getMoreListProduct = async () => {
    productAPI.getProduct(infinitePage?.next ?? 1).then((rs: any) => {
      setInfinitePage(rs.page);
      if (listProduct !== undefined) {
        setListProduct((listProduct) => [...listProduct, ...rs.data]);
      } else {
        setListProduct((listProduct) => [...rs.data]);
      }
    });
  };
  useEffect(() => {
    getMoreListProduct();
  }, []);

  return (
    <ShopLayout
      title={"Art Shop - Home"}
      pageDescription={"Find best Tesla products"}
      isPublic={true}
    >
      {listProduct ? (
        <>
          <>
            <ProductList
              products={listProduct}
              getMoreListProduct={getMoreListProduct}
              infinitePage={infinitePage}
            />
            <br />
          </>
        </>
      ) : (
        <FullScreenLoading />
      )}
    </ShopLayout>
  );
};

export default HomePage;
