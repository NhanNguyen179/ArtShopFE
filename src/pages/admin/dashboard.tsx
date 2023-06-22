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
import { ComponentType } from "react";

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

  return (
    <DashBoardLayout isPublic={false}>
      <Head>
        <title>Account Page</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Hoạt động người dùng</Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Người đã đấu giá"
                  total={10}
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Lượt truy cập trang web"
                  total={1352}
                  color="info"
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Số lượng tranh đấu giá thành công"
                  total={17}
                  color="warning"
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Lượt xem tranh"
                  subheader="(+43%) than last year"
                  chartLabels={[
                    "01/01/2003",
                    "02/01/2003",
                    "03/01/2003",
                    "04/01/2003",
                    "05/01/2003",
                    "06/01/2003",
                    "07/01/2003",
                    "08/01/2003",
                    "09/01/2003",
                    "10/01/2003",
                    "11/01/2003",
                  ]}
                  chartData={[
                    {
                      name: "Team A",
                      type: "column",
                      fill: "lượt xem",
                      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Chủ đề người dùng quan tâm nhất"
                  chartData={[
                    { label: "Tranh trừu tượng", value: 200 },
                    { label: "Tranh phong cảnh", value: 130 },
                    { label: "Tranh phong cảnh", value: 99 },
                    { label: "Tranh phong cảnh", value: 88 },
                  ]}
                  chartColors={[
                    "yellow",
                    theme.palette.info.main,
                    theme.palette.warning.light,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Bức tranh quan tâm nhất"
                  chartData={[
                    { label: "The Flower", value: 400 },
                    { label: "The Flower 1", value: 430 },
                    { label: "The Flower 2", value: 448 },
                    { label: "The Flower 3", value: 470 },
                    { label: "The Flower 4", value: 470 },
                    { label: "The Flower 5", value: 470 },
                    { label: "The Flower 6", value: 470 },
                    { label: "The Flower 7", value: 470 },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppTrafficBySite
                  title="Trình duyệt truy cập nhiều nhất"
                  list={[
                    {
                      name: "Firefox",
                      value: 323234,
                      icon: (
                        <Iconify
                          icon={<ImportContacts></ImportContacts>}
                          sx={{ color: "#1C9CEA" }}
                          width={32}
                        />
                      ),
                    },
                    {
                      name: "Chrome",
                      value: 341212,
                      icon: (
                        <Iconify
                          icon={<ImportContacts></ImportContacts>}
                          sx={{ color: "#1C9CEA" }}
                          width={32}
                        />
                      ),
                    },
                    {
                      name: "IE",
                      value: 411213,
                      icon: (
                        <Iconify
                          icon={<ImportContacts></ImportContacts>}
                          sx={{ color: "#1C9CEA" }}
                          width={32}
                        />
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppNewsUpdate
                  title="Sự kiện mới"
                  list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: "Đấu giá sản phẩm The Flower 2",
                    description: "nhan1709rt@ đã đấu giá 1000000",
                    postedAt: faker.date.recent(),
                  }))}
                />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default DashBoardPage;
