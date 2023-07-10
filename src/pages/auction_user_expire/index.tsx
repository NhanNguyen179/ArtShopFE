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

const AuctionUserExpire = () => {
  return (
    <ShopLayout
      title="Danh sách đã đấu giá của bạn"
      pageDescription={"Danh sách đã đấu giá của bạn"}
      isPublic={true}
    >
      <Typography variant="h1" component="h1">
        Danh sách đã đấu giá:
      </Typography>
      <br></br>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <AuctionList editable isExpire={true} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default AuctionUserExpire;