// interface Props {
//   products: SeedProduct[];
// }

import { List } from "@mui/material";
import { Ticket } from "./Ticket";

export const ListTickets = ({}) => {
  return (
    <List
      sx={{
        position: "relative",
        display: "flex",
        gap: "10px",
        overflowX: "scroll",
      }}
    >
        <Ticket></Ticket>
        <Ticket></Ticket>
        <Ticket></Ticket>
        <Ticket></Ticket>
    </List>
  );
};
