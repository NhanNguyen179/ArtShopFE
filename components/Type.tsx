import { SeedProduct } from "../database/seed-data";

export enum ROLE_TYPE_ENUM {
  ADMIN = "admin",
  USER = "user",
  AUTHOR = "author",
}

export type User = {
  id: string;
  email: string;
  phone_number: string;
  role: {
    id: string;
    name: string;
  };
  is_active: boolean;
  total_auction_price: number;
};

export type UserAuctionProduct = {
  id: string;
  user: {
    id: string;
    email: string;
    phone_number: string;
    role: {
      id: string;
      name: string;
    };
  };
  product : SeedProduct;
  is_success: true;
  auction_price: string;
  create_at: string;
};
