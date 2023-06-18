import axiosBase from "./axiosbase";

const categoriesAPI = {
  async getCategories() {
    return await axiosBase.get("category/");
  },
};

export default categoriesAPI;
