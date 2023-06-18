import axiosBase from "./axiosbase";

const expertApi = {
  async addExpert(data: { name: string; work_from: string; birthday: Date }) {
    return await axiosBase.post("auth/expert/", data);
  },
  async getListExpert() {
    return await axiosBase.get("auth/expert/");
  },
};

export default expertApi;
