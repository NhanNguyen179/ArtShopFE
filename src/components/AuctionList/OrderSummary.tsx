import { Divider, Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { TotalAuctionOfUser } from "./AuctionList";
import { fCurrency } from "../../utils/formatNumber";

interface Props {
  totalAuctionOfUser: TotalAuctionOfUser;
}

export const OrderSummary: FC<Props> = ({ totalAuctionOfUser }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <p className="text-md font-medium">Số lượng sản phẩm:</p>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <p className="text-md font-bold">
          {totalAuctionOfUser.amountOfAuction}{" "}
        </p>
      </Grid>
      <Grid item xs={6}>
        <p className="text-md font-medium">Tổng cộng:</p>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <p className="text-md font-bold">
          {fCurrency(Number(totalAuctionOfUser.totalOfAuction))}
        </p>
      </Grid>
      <Grid item xs={6}>
        <p className="text-md font-medium">Thuế (%) :</p>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <p className="text-md font-bold">{totalAuctionOfUser.tax * 100}%</p>
      </Grid>
      <Divider
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          mt: 2,
        }}
      />
      <Grid item xs={6}>
        <p className="text-md font-medium">Tổng số phải trả:</p>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <p className="text-md font-bold">
          {fCurrency(Math.round(totalAuctionOfUser.totalPay))}
        </p>
      </Grid>
    </Grid>
  );
};
