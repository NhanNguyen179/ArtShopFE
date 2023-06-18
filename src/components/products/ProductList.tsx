import { Grid, ImageList, Typography } from "@mui/material";
import { FC } from "react";
import { ProductCard } from "./ProductCard";
import { SeedProduct } from "../../database/seed-data";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfinitePage } from "../../pages";

interface Props {
  products: SeedProduct[];
  getMoreListProduct: any;
  infinitePage: InfinitePage | undefined;
}
export const ProductList: FC<Props> = ({
  products,
  getMoreListProduct,
  infinitePage,
}) => {
  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={getMoreListProduct}
        hasMore={!!infinitePage?.next}
        loader={<h3> Đang tải...</h3>}
        endMessage={<h4>Hết sản phẩm</h4>}
      >
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: "1 !important",
              sm: "2 !important",
              md: "2 !important",
              lg: "3 !important",
              xl: "3 !important",
            },
          }}
          gap={12}
        >
          {products.map((product, index) => (
            <>
              <ProductCard product={product} key={product.slug} />
            </>
          ))}
        </ImageList>
      </InfiniteScroll>
    </>
  );
};
