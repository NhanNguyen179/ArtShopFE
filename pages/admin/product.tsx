import Head from "next/head";
import { Box, Container, Stack, Typography, Grid, Button, Dialog } from "@mui/material";
import { Modal } from "@mui/material";
import { AccountProfile } from "../../sections/account/account-profile";
import { AccountProfileDetails } from "../../sections/account/account-profile-details";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";
import AdminProductCard from "../../components/products/AdminProductCard";
import AddModal from "../../components/modal/AddModal";
import { useState } from "react";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <DashBoardLayout isPublic={false}>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Product</Typography>
            </div>
            <Dialog
              open={openModal}
              onClose={setOpenModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddModal></AddModal>
            </Dialog>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="outlined"
                    color="primary"
                  >
                    Thêm sản phẩm
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>{" "}
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>{" "}
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>{" "}
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <AdminProductCard />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default Page;
