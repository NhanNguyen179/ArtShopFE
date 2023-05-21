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
      <NextLink href={`/product/${product.slug}`} passHref>
        <Link>
          <div style={{ width: "320px", height: "auto" }}>
            <img
              src={`https://shopart.loca.lt${product.images[0]}`}
              srcSet={`https://shopart.loca.lt${product.images[0]}`}
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
                  <p>Giá ước tính: {product.price}$</p>
                  <p>Giá đấu giá : 999$</p>
                </div>

                <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-sm text-gray-400">
                  <p>Ngày bắt đầu: 11/11/2023</p>
                  <p>Ngày kết thúc: 11/12/2023</p>
                  <p>Số người tham gia: 11/12/2023</p>
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
