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
      alignItems:'center',
      padding:"2% 5%"
    }}>
      <p className="text-xl">{auctionItem.user.email}</p>
      <p className="text-xl">{auctionItem.auction_price}$</p>
      <p className="text-xl">
        {format(new Date(auctionItem.create_at), "yyyy-MM-dd")}
      </p>
    </Box>
  );
};
