import axiosBase from "./axiosbase";

const authAPI = {
  async login(data: { email: string; password: string }) {
    return await axiosBase.post("auth/user/login/", data);
  },
  async getMyProfile() {
    return await axiosBase.get("auth/user/me/");
  },
};

export default authAPI;
