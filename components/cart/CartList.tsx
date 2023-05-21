import {
  Box,
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
import { useHomeProducts } from "../../hooks";
import { ListTickets } from "../ticket/ListTickets";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { homeProducts, isLoadingHomeProducts } = useHomeProducts("/products");

  return (
    <>
      {homeProducts.map((product) => (
        <Grid key={product.slug} container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body1">
                    Ngày đặt: 11/11/2023
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Giá đặt: {`$${product.price}`}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <div className="w-full h-auto ">
                  <ListTickets />
                </div>
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
        </Grid>
      ))}
    </>
  );
};
