import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "../../../database";
import { User } from "../../../models";
import  bcrypt from 'bcryptjs';
import { jwt } from "../../../utils";
type Data =
 | { message: string; }
 | {
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  switch(req.method){
    case 'POST':
      return loginUser(req, res)
    default:
      res.status(400).json({
        message: 'Bad Request',
      })
  }
}
const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  
  const user = seedData.initialData.users[0];
  
  const { role, name, email, _id} = user;

  const token = jwt.signToken(_id,email);

  return res.status(200).json({
    token, //JWT
    user: {
      email, name, role
    }
  })
}

