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
            background: "#f7f6fb",
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
          <Typography
            sx={{
              fontSize: "22px",
              color:"#120b39"
            }}
          >
            {product.author.name}
          </Typography>
        </Box>

        <Box
       
        >
          <Typography variant="body1">Ngày bắt đầu: {product.start_auction}.</Typography>
          <Typography variant="body1">Ngày kết thúc: {product.end_auction}.</Typography>

          <Typography variant="body1">
            Số người tham gia: {product.auction_participant}.
          </Typography>

          <Typography variant="body1">{product.description}.</Typography>
        </Box>
      </Box>
    </>
  );
};
