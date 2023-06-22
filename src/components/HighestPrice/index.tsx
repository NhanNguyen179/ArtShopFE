// interface Props {
//   products: SeedProduct[];
// }

import { Box, Container, List, Typography } from "@mui/material";
import { FC } from "react";
import { UserAuctionProduct } from "../../components/Type";

interface Props {
  
}
export const HighestPrice: FC<Props> = ({  }) => {
  return (
    <List>
      <Box
        sx={{
          border: "1px solid pink",
          position: "relative",
          padding: "14px",
          paddingTop: "26px",
          minWidth: "200px",
          minHeight: "100px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "white !important",
            minWidth: "200px",
            top: "-25px",
            left: "30px",
            color: "black",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
            }}
          >
            {" "}
            Giá cao nhất hiện tại
          </Typography>
        </Box>
      </Box>
    </List>
  );
};
