import { Box, Button, Chip, Grid, Modal, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { seedData } from "../../database";
import { IProduct } from "../../interfaces";
import { ICartProduct } from "../../interfaces/cart";
import { IValidSize } from "../../interfaces/products";
import { CartContext } from "../../context/cart/CartContext";
import { SeedProduct } from "../../database/seed-data";
import { ListTickets } from "../../components/ticket/ListTickets";
import { AuctionModal } from "../../components/modal/AuctionModal";
import productAPI from "../api/productApiFunction";
interface Props {
  product: SeedProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <ShopLayout title={product.name} pageDescription={product.description} isPublic={true}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AuctionModal />
      </Modal>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <div className="w-full ">
              <p className="border-b border-gray-400 border-opacity-70 pb-2 text-lg font-bold font-serif">
                {" "}
                {product.author.name}
              </p>
              <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-sm text-gray-400">
                <p>Ngày bắt đầu: 11/11/2023</p>
                <p>Ngày kết thúc: 11/12/2023</p>
                <p>Số người tham gia: 11/12/2023</p>
              </div>

              <div className="border-b border-gray-400 border-opacity-70 mb-2 p-2 pl-0 text-md">
                <p className="font-bold text-md">Về tác phẩm: </p>
                <p>{product.description}</p>
              </div>
            </div>
            <ListTickets></ListTickets>
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
            {/* <Button
              color="secondary"
              onClick={onAddProduct}
              disabled={product.sold}
            >
              {product.sold ? "Đấu giá" : "Đã bán"}
            </Button> */}
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//Get Static Paths
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const product = seedData.initialData.products[0];
  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
