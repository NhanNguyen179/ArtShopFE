import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  Dialog,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import { DashBoardLayout } from "../../components/layouts/dashboard/layout";
import AddModal from "../../components/modal/AddModal";
import { useCallback, useEffect, useState } from "react";
import { SeedProduct } from "../../database/seed-data";
import productAPI from "../api/productApiFunction";
import { FullScreenLoading } from "../../components/ui";
import { AdminProductCard } from "../../components/products/AdminProductCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [listProduct, setListProduct] = useState<SeedProduct[]>([]);
  const [value, setValue] = useState(0);
  const [pageProduct, setPageProduct] = useState(1);
  const [pageProductExpire, setPageProductExpire] = useState(1);
  const [totalPageProduct, setTotalPageProduct] = useState<number>(1);
  const [totalPageProductExpire, setTotalPageProductExpire] =
    useState<number>(1);

  const [listProductExpireAuction, setListProductExpireAuction] = useState<
    SeedProduct[]
  >([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClose = () => setOpenModal(false);

  const handleChangePageProduct = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageProduct(value);
  };

  const handleChangePageProductExpire = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageProductExpire(value);
  };
  const getProducts = useCallback(async () => {
    const respone: any = await productAPI.getProduct(pageProduct, "");
    setListProduct(respone.data);
    setTotalPageProduct(respone.total_page);
  }, [pageProduct]);

  const getProductsEXpire = useCallback(async () => {
    const respone: any = await productAPI.getListProductExpireAuction(
      pageProductExpire
    );
    setTotalPageProductExpire(respone.total_page);
    setListProductExpireAuction(respone.data);
  }, [pageProductExpire]);

  useEffect(() => {
    if (value == 0) {
      getProducts();
    } else {
      getProductsEXpire();
    }
  }, [getProducts, getProductsEXpire, value]);
  return (
    <>
      {listProduct && listProductExpireAuction ? (
        <DashBoardLayout isPublic={false}>
          <Dialog
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddModal></AddModal>
          </Dialog>

          <Box
            sx={{
              flexGrow: 1,
              py: 2,
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Quản lí sản phẩm" {...a11yProps(0)} />
                  <Tab label="Xác nhận sản phẩm" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Stack spacing={1}>
                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12} lg={12}>
                        <Button
                          onClick={() => setOpenModal(true)}
                          variant="outlined"
                          color="primary"
                        >
                          Thêm sản phẩm
                        </Button>
                      </Grid>
                      {listProduct.map((item: SeedProduct, index: number) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                          <AdminProductCard productItem={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                  {listProductExpireAuction.map(
                    (item: SeedProduct, index: number) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <AdminProductCard
                          productItem={item}
                          key={index}
                          isApproved={true}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </TabPanel>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={value == 0 ? totalPageProduct : totalPageProductExpire}
                  page={value == 0 ? pageProduct : pageProductExpire}
                  onChange={
                    value == 0
                      ? handleChangePageProduct
                      : handleChangePageProductExpire
                  }
                />
              </Box>
            </Container>
          </Box>
        </DashBoardLayout>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};

export default ProductPage;
