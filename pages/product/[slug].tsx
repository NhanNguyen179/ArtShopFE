import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  GetServerSideProps,
  GetStaticPaths,
  NextPage,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { seedData } from "../../database";
import { IProduct } from "../../interfaces";
import { ICartProduct } from "../../interfaces/cart";
import { IValidSize } from "../../interfaces/products";
import { CartContext } from "../../context/cart/CartContext";
import { SeedProduct } from "../../database/seed-data";
interface Props {
  product: SeedProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: "1",
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.name,
  });
  const selectedSize = (size: IValidSize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };
  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };
  const onAddProduct = () => {
    if (product.sold) {
      return;
    }
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.name} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titulos */}
            <Typography variant="h1" component="h1">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>
            <Button
              color="secondary"
              onClick={onAddProduct}
              disabled={product.sold}
            >
              {product.sold ? "Đấu giá" : "Đã bán"}
            </Button>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion:</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Gender:</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//Get Static Paths
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = seedData.initialData.products;

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

//Get Server Side Props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = seedData.initialData.products[0];

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
