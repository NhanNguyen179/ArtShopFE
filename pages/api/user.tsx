import axiosBase from "./axiosbase";

const userApi = {
  async getListUser() {
    return await axiosBase.get("/auth/user/");
  },
  async changeStatusUser(id: string) {
    return await axiosBase.put(`/auth/user/${id}/change_active/`);
  },
};

export default userApi;
