import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { AuctionList, OrderSummary } from "../../components/AuctionList";
import { ShopLayout } from "../../components/layouts/ShopLayout";

const CartPage = () => {
  return (
    <ShopLayout
      title="Carrito - 3"
      pageDescription={"Danh sách đấu giá của bạn"}
      isPublic={true}
    >
      <Typography variant="h1" component="h1">
        Danh sách đấu giá:
      </Typography>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <AuctionList editable />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;