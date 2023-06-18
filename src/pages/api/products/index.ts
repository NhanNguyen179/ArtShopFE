import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "../../../database";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    default:
      return res.status(400).json({
        message: "Bad Request",
      });
      break;
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return seedData.initialData.products;
};
