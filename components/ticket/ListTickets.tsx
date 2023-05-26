// interface Props {
//   products: SeedProduct[];
// }

import { List } from "@mui/material";
import { Ticket } from "./Ticket";
import { FC } from "react";
import { UserAuctionProduct } from "../../components/Type";

interface Props {
  listPeopleAuctionProduct: UserAuctionProduct[];
}
export const ListTickets: FC<Props> = ({ listPeopleAuctionProduct }) => {
  console.log({listPeopleAuctionProduct})
  return (
    <List
      sx={{
        position: "relative",
        display: "flex",
        gap: "10px",
        overflowX: "scroll",
      }}
    >
      {listPeopleAuctionProduct.map(
        (item: UserAuctionProduct, index: number) => (
          <Ticket auctionItem={item} key={item.id}></Ticket>
        )
      )}
    </List>
  );
};
