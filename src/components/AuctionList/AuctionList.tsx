import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import NextLink from "next/link";
import { FullScreenLoading, ItemCounter } from "../ui";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FC, useContext, useEffect, useState } from "react";
import { ListTickets } from "../ticket/ListTickets";
import auctionAPI from "../../pages/api/auction";
import { ListAuctionOfUser } from "../Type";
import { compareAsc, format } from "date-fns";
import { OrderSummary } from "./OrderSummary";
import { fCurrency } from "../../utils/formatNumber";
import productAPI from "../../pages/api/productApiFunction";

interface Props {
  editable?: boolean;
  isExpire?: boolean;
}

export type TotalAuctionOfUser = {
  amountOfAuction: number;
  totalOfAuction: number;
  tax: number;
  totalPay: number;
};

export const AuctionList: FC<Props> = () => {
  const [listAuctionOfUser, setListAuctionOfUser] =
    useState<ListAuctionOfUser[]>();
  const [totalAuctionOfUser, setTotalAuctionOfUser] =
    useState<TotalAuctionOfUser>({
      amountOfAuction: 0,
      totalOfAuction: 0,
      tax: 0.1,
      totalPay: 0,
    });
  const getListAuctionOfUser = async () => {
    const listAuctionOfUser = await auctionAPI.listAuctionOfUser();
    let startCount = {
      amountOfAuction: listAuctionOfUser.length,
      totalOfAuction: 0,
      tax: 0.1,
      totalPay: 0,
    };
    listAuctionOfUser.forEach((element) => {
      startCount = {
        ...startCount,
        totalOfAuction: startCount.totalOfAuction + element.price_max,
        totalPay:
          startCount.totalPay + element.price_max * (1 + startCount.tax),
      };
    });
    setTotalAuctionOfUser(startCount);
    setListAuctionOfUser(listAuctionOfUser);
  };
  useEffect(() => {
    getListAuctionOfUser();
  }, []);
  return (
    <>
      {listAuctionOfUser && totalAuctionOfUser ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              {listAuctionOfUser.map((auctionItem, index) => (
                <>
                  <Grid item xs={12} sm={12} key={index}>
                    <Card className="summary-card">
                      <Grid container spacing={2} sx={{ mb: 1 }}>
                        <Grid item xs={12} sm={4} key={index}>
                          <NextLink
                            href={`/product/${auctionItem.product.id}`}
                            passHref
                          >
                            <Link>
                              <CardActionArea>
                                <CardMedia
                                  image={`${process.env.IMAGE_DOMAIN}${auctionItem.product.images[0]}`}
                                  component="img"
                                  sx={{
                                    borderRadius: "5px",
                                    maxHeight: "150px",
                                    objectFit: "contain",
                                  }}
                                />
                              </CardActionArea>
                            </Link>
                          </NextLink>
                        </Grid>
                        <Grid item xs={12} sm={8} key={index}>
                          <Box display="flex" flexDirection="column">
                            <p className="text-2xl font-bold uppercase">
                              {auctionItem.product.name}
                            </p>
                          </Box>

                          <p className="text-md font-medium uppercase flex gap-3">
                            Giá đặt cao nhất của bạn:  
                            <p className="text-md font-extrabold uppercase inline">
                              {`${fCurrency(Number(auctionItem.price_max))}`}
                            </p>
                          </p>
                          <p className="text-md font-medium uppercase flex gap-3">
                            Giá đấu giá cao nhất sản phẩm hiện tại:  
                            <p className="text-md font-extrabold uppercase inline">
                              {`${fCurrency(Number(auctionItem.product.auction_price))}`}
                            </p>
                          </p>
                          <p className="text-md font-medium uppercase flex gap-3">
                            Số lượng người tham gia đấu giá:  
                            <p className="text-md font-extrabold uppercase inline">
                              {`${fCurrency(Number(auctionItem.product.auction_participant))}`}
                            </p>
                          </p>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">Tổng giá trị đấu giá</Typography>
                <Divider sx={{ my: 1 }} />
                <OrderSummary totalAuctionOfUser={totalAuctionOfUser} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};
