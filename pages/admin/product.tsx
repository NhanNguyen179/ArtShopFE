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
import { useEffect, useState } from "react";
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
  const [listProduct, setListProduct] = useState<SeedProduct[]>();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [listProductExpireAuction, setListProductExpireAuction] =
    useState<SeedProduct[]>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClose = () => setOpenModal(false);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const getProducts = () => {
    Promise.all([
      productAPI.getProduct(page),
      productAPI.getListProductExpireAuction(page),
    ]).then((values) => {
      setListProduct(values[0].data);
      setListProductExpireAuction(values[1].data);

      if (value === 0) {
        setTotalPage(values[0].total_page);
      } else {
        setTotalPage(values[1].total_page);
      }
    });
  };
  useEffect(() => {
    getProducts();
  }, [page,value]);
  useEffect(() => {
    setPage(1);
  }, [value]);
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
              py: 8,
            }}
          >
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
              <Stack spacing={3}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                {listProductExpireAuction.map(
                  (item: SeedProduct, index: number) => (
                    <Grid item xs={12} md={6} lg={3}>
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
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </DashBoardLayout>
      ) : (
        <FullScreenLoading></FullScreenLoading>
      )}
    </>
  );
};

export default ProductPage;
