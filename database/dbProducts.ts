import {  seedData } from "./";
import Product from '../models/Product';
import { IProduct } from '../interfaces/products';

 export const getProductsBySlug = async( slug:string ): Promise<IProduct | null> => {
 
  return seedData.initialData.products[0];

 }
 interface ProductSlug{
   slug: string;
 }

 export const getAllProductSlugs = async(): Promise<ProductSlug[]> => {
 
   return seedData.initialData.products;
 }

 export const getProductsByTerm = async(term:string): Promise<IProduct[]> =>{
  
  return seedData.initialData.products;
 }

 export const getAllProducts = async(): Promise<IProduct[]> => {
  // await db.connect();
  // const products = await Product.find().lean();
  // await db.disconnect();
  return seedData.initialData.products;
 }
