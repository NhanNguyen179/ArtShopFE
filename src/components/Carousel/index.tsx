import React from "react";
import Slider from "react-slick";
import { FC } from "react";
import { Product } from "../Type";
import { ImageList, Typography } from "@mui/material";
import { ProductCard } from "../products";
import { SuggestProductItem } from "./SuggestProductItem";

interface Props {
  listProduct: Product[];
  title: string;
}

export const Carousel: FC<Props> = ({ listProduct, title }) => {
  var settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
  };
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          margin: "10px 0 25px 50px",
          fontWeight: "500",
          fontSize: "38px",
          position: "relative",
          fontFamily:
            "Mercury Display A,Mercury Display B,MercuryDisplay,serif",
        }}
      >
        {" "}
        {title}
        <div id="borderBottom"></div>
      </Typography>
      <Slider {...settings}>
        {listProduct.map((product) => (
          <SuggestProductItem product={product} key={product.slug} />
        ))}
      </Slider>
    </>
  );
};
