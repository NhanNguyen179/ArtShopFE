import axiosBase from "./axiosbase";

const authorAPI = {
  async getAuthor() {
    return await axiosBase.get("auth/author/");
  },
  async addAuthor(data: { name: string; origin: string; birthday: Date }) {
    return await axiosBase.post("auth/author/", data);
  },
};

export default authorAPI;
