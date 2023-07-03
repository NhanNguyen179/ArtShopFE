import axiosBase from "./axiosbase";

const detectAPI = {
  async getProductTrending() {
    return await axiosBase.get("products/get_product_trending/");
  },
  async getProductSuggestForUser() {
    return await axiosBase.get("products/get_product_suggest_for_user/");
  },
};

export default detectAPI;
