import bcrypt from "bcryptjs";
import { Expert } from "../components/Type";

export interface SeedProduct {
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
}

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
  _id: string;
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

// interface SeedData {
//   users: SeedUser[];
//   products: SeedProduct[];
//   homeProducts?: SeedProduct[];
// }

// export const initialData: SeedData = {
// };
