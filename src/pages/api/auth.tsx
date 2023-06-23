import { User } from "../../components/Type";
import axiosBase from "./axiosbase";

const authAPI = {
  async login(data: { email: string; password: string }) {
    return await axiosBase.post("auth/user/login/", data);
  },
  async register(data: {
    email: string;
    password: string;
    phone_number: string;
  }) {
    return await axiosBase.post("auth/user/", data);
  },
  async getMyProfile(): Promise<User> {
    return await axiosBase.get("auth/user/me/");
  },
  async updateProfile(data : any): Promise<User> {
    return await axiosBase.put("auth/user/update_profile/",data);
  },
  
};

export default authAPI;
