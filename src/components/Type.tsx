import { SeedProduct } from "../database/seed-data";

export type Expert = {
  id: string;
  name: string;
  work_from: string;
  role: string;
  birthday: string;
};

export enum ROLE_TYPE_ENUM {
  ADMIN = "admin",
  USER = "user",
  AUTHOR = "author",
}

export type User = {
  id: string;
  email: string;
  phone_number: string;
  name: string;
  role: {
    id: string;
    name: string;
  };
  is_active: boolean;
  is_completed: boolean;
  total_auction_price: number;
};

export type Product = {
  description: string;
  images: string[];
  slug: string;
  price: number;
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    name: string;
    origin: string;
    birthday: string;
  };
  sold: true;
  start_auction: string;
  end_auction: string;
  auction_participant: number;
  auction_price: number;
  expert: Expert;
  expert_price?: number;
  is_completed: boolean;
};

export type AuctionOfProduct = {
  id: string;
  product: Product;
  user: User;
  auction_price: number;
  create_at: string;
  is_success: boolean;
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
  product: SeedProduct;
  is_success: true;
  auction_price: string;
  create_at: string;
};

export type ListAuctionOfUser = {
  product: Product;
  price_max: number;
};
