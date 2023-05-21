import axiosBase from "./axiosbase";

const productAPI = {
  async getProduct() {
    return await axiosBase.get("products/");
  },
  async addProduct(data) {
    return await axiosBase.post("products/", data);
  },
  async addPicture(idProduct: string, image: File) {
    const formData = new FormData();
    formData.append("files", image);
    return await axiosBase.post(`products/${idProduct}/up_image/`, formData);
  },
};

export default productAPI;
