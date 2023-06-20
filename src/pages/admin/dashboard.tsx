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
import { AppWebsiteVisits } from "../../components/DashBoard/AppWebsiteVisits";
import { AppCurrentVisits } from "../../components/DashBoard/AppCurrentVisits";
import { useTheme } from "@mui/material/styles";
import { AppConversionRates } from "../../components/DashBoard/AppConversionRates";
import { AppTrafficBySite } from "../../components/DashBoard/AppTrafficBySite";
import Iconify from "../../components/iconify/Iconify";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { AppNewsUpdate } from "../../components/DashBoard/AppNewsUpdate";
import { faker } from "@faker-js/faker";

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
                  title="Weekly Sales"
                  total={714000}
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="New Users"
                  total={1352831}
                  color="info"
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary
                  title="Item Orders"
                  total={1723315}
                  color="warning"
                  icon={<ImportContacts></ImportContacts>}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Website Visits"
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
                      fill: "solid",
                      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                    },
                    {
                      name: "Team B",
                      type: "area",
                      fill: "gradient",
                      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                    },
                    {
                      name: "Team C",
                      type: "line",
                      fill: "solid",
                      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Current Visits"
                  chartData={[
                    { label: "America", value: 4344 },
                    { label: "Asia", value: 5435 },
                    { label: "Europe", value: 1443 },
                    { label: "Africa", value: 4443 },
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Conversion Rates"
                  subheader="(+43%) than last year"
                  chartData={[
                    { label: "Italy", value: 400 },
                    { label: "Japan", value: 430 },
                    { label: "China", value: 448 },
                    { label: "Canada", value: 470 },
                    { label: "France", value: 540 },
                    { label: "Germany", value: 580 },
                    { label: "South Korea", value: 690 },
                    { label: "Netherlands", value: 1100 },
                    { label: "United States", value: 1200 },
                    { label: "United Kingdom", value: 1380 },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <AppTrafficBySite
                  title="Traffic by Site"
                  list={[
                    {
                      name: "FaceBook",
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
                      name: "Google",
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
                      name: "Linkedin",
                      value: 411213,
                      icon: (
                        <Iconify
                          icon={<ImportContacts></ImportContacts>}
                          sx={{ color: "#1C9CEA" }}
                          width={32}
                        />
                      ),
                    },
                    {
                      name: "Twitter",
                      value: 443232,
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
                  title="News Update"
                  list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: faker.name.jobTitle(),
                    description: faker.name.jobTitle(),
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
