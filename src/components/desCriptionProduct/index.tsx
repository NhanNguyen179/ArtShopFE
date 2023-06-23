import { Box, Divider, Typography } from "@mui/material";
import { FC } from "react";
import Countdown from "react-countdown";
import { SeedProduct } from "../../database/seed-data";
interface Props {
  product: SeedProduct;
}
export const DescriptionProduct: FC<Props> = ({ product }) => {
  return (
    <>
      <Box
        sx={{
          border: "1px solid pink",
          position: "relative",
          padding: "14px",
          paddingTop: "26px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "white !important",
            minWidth: "200px",
            minHeight: "30px",
            top: "-20px",
            left: "-44px",
            color: "black",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            alignItems: "start",
          }}
        >
          <p
            className="text-3xl font-medium"
          >
            {product.author.name}
          </p>
        </Box>

        <Box
       
        >
          <p className="text-xl font-medium">Ngày bắt đầu: {product.start_auction}.</p>
          <p className="text-xl font-medium">Ngày kết thúc: {product.end_auction}.</p>

          <p className="text-xl font-medium">
            Số người tham gia: {product.auction_participant}.
          </p>

          <p className="text-xl font-medium">{product.description}.</p>
        </Box>
      </Box>
    </>
  );
};
