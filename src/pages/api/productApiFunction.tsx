import { AuctionOfProduct } from "../../components/Type";
import axiosBase from "./axiosbase";

const productAPI = {
  async getProduct(page: number) {
    return await axiosBase.get(`products?page=${page}`);
  },
  async addProduct(data: any) {
    return await axiosBase.post("products/", data);
  },
  async addPicture(idProduct: string, image: File | undefined) {
    const formData = new FormData();
    if (image) {
      formData.append("files", image);
    }
    return await axiosBase.post(`products/${idProduct}/up_image/`, formData);
  },
  async getDetailProduct(idProduct: string | string[] | undefined) {
    return await axiosBase.get(`products/${idProduct}/`);
  },
  async getListAuctionPriceProduct(
    idProduct: string | string[] | undefined
  ): Promise<AuctionOfProduct[]> {
    return await axiosBase.get(`auction/${idProduct}/get_list_auction_of_art/`);
  },
  async updateProduct(idProduct: string, data: any) {
    return await axiosBase.put(`products/${idProduct}/`, data);
  },
  async approvedAuctionProduct(idAuction: string) {
    return await axiosBase.put(`auction/${idAuction}/approve_auction/`);
  },
  async getListProductExpireAuction(page: number) {
    return await axiosBase.get(
      `products/get_list_product_expire_auction/?page=${page.toString()}`
    );
  },
};

export default productAPI;
