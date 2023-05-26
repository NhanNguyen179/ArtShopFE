import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  Dialog,
} from "@mui/material";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";
import AddModal from "../../components/modal/AddModal";
import { useEffect, useState } from "react";
import { SeedProduct } from "../../database/seed-data";
import productAPI from "../api/productApiFunction";
import { FullScreenLoading } from "../../components/ui";
import { AdminProductCard } from "../../components/products/AdminProductCard";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [listProduct, setListProduct] = useState<SeedProduct[]>();

  const getProducts = () => {
    productAPI.getProduct().then((rs: any) => setListProduct(rs));
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {listProduct ? (
        <DashBoardLayout isPublic={false}>
          <Dialog
            open={openModal}
            onClose={setOpenModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddModal></AddModal>
          </Dialog>
          <Box
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Stack spacing={3}>
                <div>
                  <Typography variant="h4">Quản lí sản phẩm</Typography>
                </div>

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
                    {listProduct.map((item: SeedProduct, index: number) => (
                      <Grid item xs={12} md={6} lg={3}>
                        <AdminProductCard productItem={item} key={index} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Stack>
            </Container>
          </Box>
        </DashBoardLayout>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};

export default Page;
