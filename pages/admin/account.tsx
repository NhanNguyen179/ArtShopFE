import Head from "next/head";
import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import { AccountProfile } from "../../sections/account/account-profile";
import { AccountProfileDetails } from "../../sections/account/account-profile-details";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";

const Page = () => (
  <DashBoardLayout isPublic={false}>
    <Head>
      <title>Account Page</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </DashBoardLayout>
);

export default Page;
