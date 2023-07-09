// interface Props {
//   products: SeedProduct[];
// }

import { Box, Container, List, Typography } from "@mui/material";
import { Ticket } from "./Ticket";
import { FC } from "react";
import { UserAuctionProduct } from "../../components/Type";

interface Props {
  listPeopleAuctionProduct: UserAuctionProduct[];
}
export const ListTickets: FC<Props> = ({ listPeopleAuctionProduct }) => {
  return (
    <List>
      <Box
        sx={{
          width: "100%",
          height: "400px",
          border: "1px solid pink",
          position: "relative",
          padding: "20px 10px 12px 20px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "white !important",
            minWidth: "200px",
            minHeight: "20px",
            padding: "12px 20px 12px 26px",
            top: "-35px",
            left: "-20px",
            display: "flex",
            alignItems: "center",
            zIndex: "2",
          }}
        >
          <p className="text-3xl"> Thông tin đấu giá</p>
        </Box>
        {listPeopleAuctionProduct.map(
          (item: UserAuctionProduct, index: number) => (
            <Ticket auctionItem={item} key={item.id}></Ticket>
          )
        )}
      </Box>
    </List>
  );
};
