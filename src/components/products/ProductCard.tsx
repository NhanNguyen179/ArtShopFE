import {
  Chip,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Link,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import { FC, useMemo, useState } from "react";
import { SeedProduct } from "../../database/seed-data";
import InfoIcon from "@mui/icons-material/Info";
import {  format } from "date-fns";
import { fCurrency } from "../../utils/formatNumber";

interface Props {
  product: SeedProduct;
}
export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? `${product.images[1]}` : `${product.images[0]}`;
  }, [isHovered, product.images]);
  return (
    <ImageListItem>
      <NextLink href={`/product/${product.id}`} passHref>
        <Link>
          <div style={{ maxWidth: "320px", height: "auto" }}>
            <img
              src={`${process.env.IMAGE_DOMAIN}${product.images[0]}`}
              srcSet={`${process.env.IMAGE_DOMAIN}${product.images[0]}`}
              alt={product.name}
              className=" "
              loading="lazy"
              style={{
                borderRadius: "8px",
              }}
            />
          </div>

          <ImageListItemBar
            title={
              <p className="font-bold text-3xl mb-1 uppercase">
                {" "}
                {product.name}
              </p>
            }
            sx={{
              background: "white",
              marginTop: "12px",
              maxWidth: "320px",
            }}
            subtitle={
              <div className="w-full">
                <p className="border-b border-gray-400 border-opacity-70 pb-2 text-lg font-light uppercase opacity-70">
                  {" "}
                  {product.author.name}
                </p>
                <div className="mt-4 pl-0 text-gray-400 text-lg">
                  <p>Giá khởi điểm: {fCurrency(Number(product.price))}</p>
                  <p>
                    Giá đấu giá : {fCurrency(Number(product.auction_price))}{" "}
                  </p>
                </div>

                <div className="mb-2 pl-0 text-gray-400">
                  <p>Định giá: {fCurrency(Number(product.expert_price))}</p>

                  <div className="flex gap-2 align-center">
                    <p>
                      {format(new Date(product.start_auction), "dd-MM-yyyy")}
                    </p>
                    <p>-</p>
                    <p>{format(new Date(product.end_auction), "dd-MM-yyyy")}</p>
                  </div>
                  <p>Số người tham gia: {product.auction_participant}</p>
                </div>
                <Button variant="outlined" color="primary" fullWidth>
                  Chi tiết
                </Button>
              </div>
            }
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${product.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
            position="below"
          />
        </Link>
      </NextLink>
    </ImageListItem>
  );
};
