import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import NextLink from "next/link";
import { ItemCounter } from "../ui";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FC, useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { ICartProduct } from "../../interfaces";
import { seedData } from "../../database";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const cartProducts = seedData.initialData.products;
  return (
    <>
      {cartProducts.map((product) => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={9}>
            <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
              <Grid
                item
                xs={9}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">{product.name}</Typography>
                </Box>
              </Grid>
              <Grid
              item
              xs={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Button color="info">Danh sách người đấu giá</Button>
            </Grid>
            </Grid>
           
          </Grid>

          <Divider
            sx={{
              width: "80%",
              bgcolor: "background.paper",
              margin: "10px auto",
              px: 2,
            }}
          />
          <br></br>
        </Grid>
      ))}
    </>
  );
};
