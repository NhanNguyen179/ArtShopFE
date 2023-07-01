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

interface Props {
  editable?: boolean;
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
          <Grid item xs={12} sm={7}>
            {listAuctionOfUser.map((auctionItem) => (
              <Grid
                key={auctionItem.product.id}
                container
                spacing={2}
                sx={{ mb: 1 }}
              >
                <Grid item xs={3}>
                  <NextLink
                    href={`/product/${auctionItem.product.id}`}
                    passHref
                  >
                    <Link>
                      <CardActionArea>
                        <CardMedia
                          image={`${auctionItem.product.images[0]}`}
                          component="img"
                          sx={{ borderRadius: "5px" }}
                        />
                      </CardActionArea>
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={6}>
                      <Box display="flex" flexDirection="column">
                        <Typography variant="body1">
                          {auctionItem.product.name}
                        </Typography>
                        <Typography variant="body1">
                          {format(
                            new Date(auctionItem?.product.start_auction),
                            "yyyy-MM-dd"
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Typography>Giá đặt cao nhất của bạn:</Typography>
                      <Typography variant="subtitle1">
                        {`${fCurrency(Number(auctionItem.price_max))}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider
                  sx={{
                    width: "80%",
                    bgcolor: "background.paper",
                    margin: "20px auto",
                    px: 8,
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} sm={5}>
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
