import { FC } from "react";
import { UserAuctionProduct } from "../Type";
import styles from "./Ticket.module.scss";
import { Box, Typography } from "@mui/material";
import { compareAsc, format } from "date-fns";
interface Props {
  auctionItem: UserAuctionProduct;
}

export const Ticket: FC<Props> = ({ auctionItem }) => {
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
      <Typography variant="body1">{auctionItem.user.email}</Typography>
      <Typography variant="body1">{auctionItem.auction_price}$</Typography>
      <Typography variant="caption">
        {format(new Date(auctionItem.create_at), "yyyy-MM-dd")}
      </Typography>
    </Box>
  );
};
