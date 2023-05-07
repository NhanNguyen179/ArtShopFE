import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'
import { seedData } from '../../../database'
type Data = 
  | { message: string }
  | IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProduct(req,res)
    default:
      return res.status(400).json({
        message: 'Bad Request'
      })
      break;
  }
}

const getProduct = async(req: NextApiRequest, res: NextApiResponse) => {

  return res.json(JSON.stringify(seedData.initialData.products));
}
