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

const HomePage: NextPage = () => {
  const [listProduct, setListProduct] = useState<SeedProduct[]>();

  const getProducts = () => {
    productAPI.getProduct().then((rs: any) => setListProduct(rs));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ShopLayout
      title={"Art Shop - Home"}
      pageDescription={"Find best Tesla products"}
      isPublic={true}
    >
      {listProduct ? (
        <>
          <ImageList
            variant="masonry"
            sx={{
              columnCount: {
                xs: "1 !important",
                sm: "2 !important",
                md: "2 !important",
                lg: "4 !important",
                xl: "4 !important",
              },
            }}
            gap={12}
          >
            <>
              <ProductList products={listProduct} />
              <br />
            </>
          </ImageList>
        </>
      ) : (
        <FullScreenLoading />
      )}
    </ShopLayout>
  );
};

export default HomePage;
