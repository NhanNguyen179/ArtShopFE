// interface Props {
//   products: SeedProduct[];
// }

import { Box, Container, List, Typography } from "@mui/material";
import { FC } from "react";
import { UserAuctionProduct } from "../../components/Type";
import { format } from "util";
import { fCurrency } from "../../utils/formatNumber";

interface Props {
  listPeopleAuctionProduct: UserAuctionProduct[];
}
export const HighestPrice: FC<Props> = ({ listPeopleAuctionProduct }) => {
  return (
    <>
      {listPeopleAuctionProduct && (
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
              <p className="text-3xl font-medium"> Giá cao nhất hiện tại</p>
            </Box>
            <p className="text-3xl font-medium text-center">
              {" "}
              {fCurrency(Number(listPeopleAuctionProduct?.reduce(function (
                accumulator,
                element
              ) {
                return accumulator > element ? accumulator : element;
              },[0]).auction_price)) || "Chưa có giá cao nhất hiện tại"}
            </p>
          </Box>
        </List>
      )}
    </>
  );
};
