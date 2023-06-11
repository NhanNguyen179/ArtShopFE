import { ListAuctionOfUser } from "../../components/Type";
import axiosBase from "./axiosbase";

const auctionAPI = {
  async createAuction(productId: string, auctionPrice: number) {
    return await axiosBase.post("auction/", {
        product_id: productId,
        auction_price: auctionPrice,
    });
  },
  async listAuctionOfUser() : Promise<ListAuctionOfUser[]> {
    return await axiosBase.get("auction/get_list_auction_of_user/");
  },
};

export default auctionAPI;
