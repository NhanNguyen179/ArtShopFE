import { ListAuctionOfUser, Product } from "../../components/Type";
import axiosBase from "./axiosbase";

const auctionAPI = {
  async createAuction(productId: string, auctionPrice: number) {
    return await axiosBase.post("auction/", {
      product_id: productId,
      auction_price: auctionPrice,
    });
  },
  async listAuctionOfUser(searchString: string): Promise<ListAuctionOfUser[]> {
    return await axiosBase.get(
      `auction/get_list_auction_of_user/?search=${searchString}`
    );
  },
  async listAuctionExpireOfUser(searchString: string): Promise<Product[]> {
    return await axiosBase.get(
      `products/get_list_product_sold_for_user/?search=${searchString}`
    );
  },
};

export default auctionAPI;
