import axiosBase from "./axiosbase";

const productAPI = {
  async getProduct() {
    return await axiosBase.get("products/");
  },
  async addProduct(data : any) {
    return await axiosBase.post("products/", data);
  },
  async addPicture(idProduct: string, image: File) {
    const formData = new FormData();
    formData.append("files", image);
    return await axiosBase.post(`products/${idProduct}/up_image/`, formData);
  },
  async getDetailProduct(idProduct: string | string[] | undefined) {
    return await axiosBase.get(`products/${idProduct}/`);
  },
  async getListAuctionPriceProduct(idProduct: string | string[] | undefined) {
    return await axiosBase.get(`auction/${idProduct}/get_list_auction_of_art/`);
  },
  async updateProduct(idProduct: string,data : any) {
    return await axiosBase.put(`products/${idProduct}/`, data);
  },
};

export default productAPI;
