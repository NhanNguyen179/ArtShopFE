import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { ProductCard } from "./ProductCard";
import { SeedProduct } from "../../database/seed-data";

interface Props {
  products: SeedProduct[];
}
export const ProductList: FC<Props> = ({ products }) => {
  return (
    <>
      {products.map((product, index) => (
        <>
          <ProductCard product={product} key={product.slug} />
        </>
      ))}
    </>
  );
};
