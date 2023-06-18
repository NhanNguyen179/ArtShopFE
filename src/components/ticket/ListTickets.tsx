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
    <List
      sx={{
        position: "relative",
        backgroundColor: "#edecec",
        minWidth: "300px",
        height: "400px",
        borderRadius: "0 0 0 100px",
        padding: "40px 20px 40px 40px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "1px solid pink",
          position: "relative",
          padding: "20px 10px 12px 20px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "#edecec",
            minWidth: "200px",
            minHeight: "20px",
            padding: "12px 20px 12px 26px",
            top: "-35px",
            left: "-30px",
            display: "flex",
            alignItems: "center",
            zIndex: "2",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
            }}
          >
            {" "}
            Thông tin đấu giá
          </Typography>
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
