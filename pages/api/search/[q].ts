import type { NextApiRequest, NextApiResponse } from 'next'
import {  seedData } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = | { message: string }
            | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch(req.method){
    case 'GET':
      return searchProducts(req,res)
    default:
      return res.status(400).json({
        message: 'Bad Request'
      });
  }
  
}
const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  return seedData.initialData.products
}
