import { Divider, Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";
import { currency } from "../../utils";
import { TotalAuctionOfUser } from "./AuctionList";

interface Props {
  totalAuctionOfUser: TotalAuctionOfUser;
}

export const OrderSummary: FC<Props> = ({ totalAuctionOfUser }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>
          Số lượng sản phẩm:{totalAuctionOfUser.amountOfAuction}
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{totalAuctionOfUser.amountOfAuction} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Tổng cộng:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{totalAuctionOfUser.totalOfAuction}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Thuế (%) :</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{totalAuctionOfUser.tax * 100}%</Typography>
      </Grid>
      <Divider
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          mt: 2,
        }}
      />
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Tổng số phải trả:</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {Math.round(totalAuctionOfUser.totalPay)}
        </Typography>
      </Grid>
    </Grid>
  );
};
