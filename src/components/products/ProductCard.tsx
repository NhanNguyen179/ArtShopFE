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
  Skeleton,
} from "@mui/material";
import NextLink from "next/link";
import { FC, useMemo, useState } from "react";
import { SeedProduct } from "../../database/seed-data";
import InfoIcon from "@mui/icons-material/Info";
import { compareAsc, format } from "date-fns";

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
          <div style={{ width: "320px", height: "auto" }}>
            <img
              src={`${product.images[0]}`}
              srcSet={`${product.images[0]}`}
              alt={product.name}
              className=" "
              loading="lazy"
            />
          </div>

          <ImageListItemBar
            title={<p className="font-bold text-2xl mb-1"> {product.name}</p>}
            sx={{
              background: "white",
              padding: "8px",
            }}
            subtitle={
              <div className="w-full ">
                <p className="border-b border-gray-400 border-opacity-70 pb-2 text-lg font-bold font-serif">
                  {" "}
                  {product.author.name}
                </p>
                <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-sm text-gray-400">
                  <p>Giá khởi điểm: {product.price}$</p>
                  <p>Giá đấu giá : {product.auction_price}$</p>
                </div>

                <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-sm text-gray-400">
                  <p>
                    Ngày bắt đầu:{" "}
                    {format(new Date(product.start_auction), "dd-MMMM-yyyy")}
                  </p>
                  <p>
                    Ngày kết thúc:{" "}
                    {format(new Date(product.end_auction), "dd-MMMM-yyyy")}
                  </p>
                  <p>Số người tham gia: {product.auction_participant}</p>
                </div>
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