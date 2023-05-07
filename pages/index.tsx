import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useProducts, useHomeProducts } from "../hooks/useProducts";

const HomePage: NextPage = () => {
  const { homeProducts,isLoadingHomeProducts } = useHomeProducts("/products");

  const arrayCategories = ["Tranh tĩnh vật"];
  return (
    <ShopLayout
      title={"Tesla Shop - Home"}
      pageDescription={"Find best Tesla products"}
    >
      <Typography variant="h1" component="h1">
        Cửa hàng
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Tất cả các sản phẩm
      </Typography>
      {isLoadingHomeProducts ? (
        <FullScreenLoading />
      ) : (
        arrayCategories.map((categoryItem, index) => {
          const product = homeProducts.filter(
            (item) => item.category && item.category.name === categoryItem
          );
          return (
            <>
              <Typography variant="h1" sx={{ mb: 1 }}>
                {categoryItem}
              </Typography>
              <ProductList products={product} key={index} />
              <br/>
            </>
          );
        })
      )}
    </ShopLayout>
  );
};

export default HomePage;
