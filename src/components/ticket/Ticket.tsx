import { FC } from "react";
import { UserAuctionProduct } from "../Type";
import styles from "./Ticket.module.scss";
import { Box, Typography } from "@mui/material";
import { compareAsc, format } from "date-fns";
import { fCurrency } from "../../utils/formatNumber";
interface Props {
  auctionItem: UserAuctionProduct;
}

export const Ticket: FC<Props> = ({ auctionItem }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "25px",
        padding: "2% 5%",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <p className="text-xl font-medium ">{auctionItem.user.email}</p>
      <p className="text-xl font-medium ">
        {fCurrency(Number(auctionItem.auction_price))}
      </p>
      <p className="text-xl font-medium ">
        {format(new Date(auctionItem.create_at), "dd-MM-yyyy")}
      </p>
    </Box>
  );
};
