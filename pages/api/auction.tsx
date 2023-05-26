import axiosBase from "./axiosbase";

const auctionAPI = {
  async createAuction(productId: string, auctionPrice: number) {
    return await axiosBase.post("auction/", {
        product_id: productId,
        auction_price: auctionPrice,
    });
  },
};

export default auctionAPI;
