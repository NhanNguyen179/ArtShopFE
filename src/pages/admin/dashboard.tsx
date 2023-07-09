import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";
import { AppWidgetSummary } from "../../components/DashBoard/AppWidgetSummary";
import { ImportContacts } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { AppTrafficBySite } from "../../components/DashBoard/AppTrafficBySite";
import Iconify from "../../components/iconify/Iconify";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { AppNewsUpdate } from "../../components/DashBoard/AppNewsUpdate";
import { faker } from "@faker-js/faker";
import dynamic from "next/dynamic";
import { ComponentType, useState, useEffect } from "react";
import activityTrackingAPI from "../api/activity_tracking";

const AppWebsiteVisits = dynamic(
  () =>
    import("../../components/DashBoard/AppWebsiteVisits").then(
      (mod) => mod.AppWebsiteVisits
    ) as Promise<ComponentType<any>>,
  { ssr: false }
);

const AppCurrentVisits = dynamic(
  () =>
    import("../../components/DashBoard/AppCurrentVisits").then(
      (mod) => mod.AppCurrentVisits
    ) as Promise<ComponentType<any>>,
  { ssr: false }
);

const AppConversionRates = dynamic(
  () =>
    import("../../components/DashBoard/AppConversionRates").then(
      (mod) => mod.AppConversionRates
    ) as Promise<ComponentType<any>>,
  { ssr: false }
);
const DashBoardPage = () => {
  const theme = useTheme();
  const [inforTracking, setInforTracking] = useState<any>({
    popularProduct: [],
    popularCategory: [],
    amountUserAddAuctionProduct: [],
    recentAddAuctionPrice: [],
    amountSessionId: [],
    popularBrowser: [],
    totalUserAddAuctionPrice: [],
    totalApprovedAuction: [],
    getAmountUserAccessWebsite: [],
  });
  const getInformationTracking = () => {
    Promise.all([
      activityTrackingAPI.getAmountSessionId(),
      activityTrackingAPI.getAmountUserAddAuctionProduct(),
      activityTrackingAPI.getPopularBrowser(),
      activityTrackingAPI.getPopularCategory(),
      activityTrackingAPI.getPopularProduct(),
      activityTrackingAPI.getRecentAddAuctionPrice(),
      activityTrackingAPI.getTotalApprovedAuction(),
      activityTrackingAPI.getTotalUserAddAuctionPrice(),
      activityTrackingAPI.getAmountUserAccessWebsite(),
    ]).then((response: any) => {
      let temp = {
        popularProduct: [],
        popularCategory: [],
        amountUserAddAuctionProduct: [],
        recentAddAuctionPrice: [],
        amountSessionId: [],
        popularBrowser: [],
        totalUserAddAuctionPrice: [],
        totalApprovedAuction: [],
        getAmountUserAccessWebsite: [],
      };
      temp.amountSessionId = response[0];
      temp.amountUserAddAuctionProduct = response[1];
      temp.popularBrowser = response[2];
      temp.popularCategory = response[3];
      temp.popularProduct = response[4];
      temp.recentAddAuctionPrice = response[5];
      temp.totalApprovedAuction = response[6];
      temp.totalUserAddAuctionPrice = response[7];
      temp.getAmountUserAccessWebsite = response[8];

      setInforTracking(temp);
    });
  };
  useEffect(() => {
    getInformationTracking();
  }, []);
  return (
    <DashBoardLayout isPublic={false}>
      <Head>
        <title>DashBoard Page</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        {inforTracking && (
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">Hoạt động người dùng</Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary
                    title="Người đã đấu giá"
                    total={inforTracking.amountUserAddAuctionProduct[0]?.result}
                    icon={<ImportContacts></ImportContacts>}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary
                    title="Lượt đấu giá"
                    total={inforTracking.totalUserAddAuctionPrice[0]?.result}
                    color="info"
                    icon={<ImportContacts></ImportContacts>}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <AppWidgetSummary
                    title="Số lượng tranh đấu giá thành công"
                    total={inforTracking.totalApprovedAuction[0]?.result}
                    color="warning"
                    icon={<ImportContacts></ImportContacts>}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <AppWebsiteVisits
                    title="Lượt truy cập trang web"
                    chartLabels={inforTracking.getAmountUserAccessWebsite.dates}
                    chartData={[
                      {
                        name: "Lượt truy cập",
                        type: "column",
                        fill: "lượt xem",
                        data: inforTracking.getAmountUserAccessWebsite
                          .sessionCounts,
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <AppCurrentVisits
                    title="Chủ đề người dùng quan tâm nhất"
                    chartData={inforTracking.popularCategory}
                    chartColors={["#287297", "#6f926e", "#ebed6c", "#20bbe9"]}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <AppConversionRates
                    title="Bức tranh quan tâm nhất"
                    chartData={inforTracking.popularProduct}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <AppTrafficBySite
                    title="Trình duyệt truy cập nhiều nhất"
                    list={inforTracking.popularBrowser}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <AppNewsUpdate
                    title="Sự kiện mới"
                    list={inforTracking.recentAddAuctionPrice}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Container>
        )}
      </Box>
    </DashBoardLayout>
  );
};

export default DashBoardPage;
