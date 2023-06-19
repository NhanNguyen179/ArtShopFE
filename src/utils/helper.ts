import { User } from "../components/Type";
import jwt_decode from "jwt-decode";
export type decodeUser = {
  user_id: string;
  email: string;
  name: string;
  role: string;
};

export const getUserFromCookie = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    return null;
  } else {
    const decoded: decodeUser = jwt_decode(token);
    return decoded;
  }
};


