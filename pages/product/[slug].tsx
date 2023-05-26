import { Box, Dialog, Grid, Modal } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow } from "../../components/products";
import { seedData } from "../../database";

import { SeedProduct } from "../../database/seed-data";
import { ListTickets } from "../../components/ticket/ListTickets";
import { AuctionModal } from "../../components/modal/AuctionModal";
import productAPI from "../api/productApiFunction";
import { useRouter } from "next/router";
import { FullScreenLoading } from "../../components/ui";
import { UserAuctionProduct } from "../../components/Type";
interface Props {
  product: SeedProduct;
}

const ProductPage: NextPage<Props> = () => {
  const [open, setOpen] = useState(false);
  const [productDetail, setProductDetail] = useState<SeedProduct>();
  const [listPeopleAuctionProduct, setListPeopleAuctionProduct] =
    useState<UserAuctionProduct[]>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const fetchData = async () => {
    Promise.all([
      productAPI.getDetailProduct(router.query.slug),
      productAPI.getListAuctionPriceProduct(router.query.slug),
    ]).then((values) => {
      setProductDetail(values[0]);
      setListPeopleAuctionProduct(values[1]);
    });
  };
  useEffect(() => {
    if (router.query.slug) {
      fetchData();
    }
  }, [router]);
  return (
    <>
      {productDetail && listPeopleAuctionProduct ? (
        <ShopLayout
          title={productDetail.name}
          pageDescription={productDetail.description}
          isPublic={true}
        >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AuctionModal product={productDetail} />
          </Dialog>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
              <ProductSlideShow images={productDetail.images} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box display="flex" flexDirection="column">
                <div className="w-full ">
                  <p className="border-b border-gray-400 border-opacity-70 pb-2 text-lg font-bold font-serif">
                    {" "}
                    {productDetail.author.name}
                  </p>
                  <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-sm text-gray-400">
                    <p>Ngày bắt đầu: {productDetail.start_auction}</p>
                    <p>Ngày kết thúc: {productDetail.end_auction}</p>
                    <p>
                      Số người tham gia: {productDetail.auction_participant}
                    </p>
                  </div>

                  <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-md">
                    <p className="font-bold text-md">Về tác phẩm: </p>
                    <p>{productDetail.description}</p>
                  </div>
                </div>
                <ListTickets listPeopleAuctionProduct={listPeopleAuctionProduct} ></ListTickets>
                <div className="flex h-28 w-full mt-4">
                  <div className=" h-full w-1/2 bg-red-700 flex items-center justify-center rounded-s-3xl border-r-2 animate-pulse cursor-pointer">
                    <p
                      className="text-4xl text-white font-extrabold"
                      onClick={handleOpen}
                    >
                      {" "}
                      Đấu giá{" "}
                    </p>
                  </div>
                  <div className=" h-full w-1/2 bg-red-800 flex items-center justify-center rounded-e-3xl  cursor-pointer">
                    <p
                      className="text-4xl text-white font-extrabold"
                      onClick={handleOpen}
                    >
                      {" "}
                      +1000${" "}
                    </p>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </ShopLayout>
      ) : (
        <FullScreenLoading />
      )}
    </>
  );
};

//Get Static Paths
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const product = await productAPI.getDetailProduct(ctx.query.slug);
//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductPage;
