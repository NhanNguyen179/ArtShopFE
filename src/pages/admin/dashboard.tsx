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

const DashBoardPage = () => {
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
            </Grid>
          </Stack>
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default DashBoardPage;
