import axiosBase from "./axiosbase";

const categoryAPI = {
  async getCategories() {
    return await axiosBase.get("category/");
  },
};

export default categoryAPI;
