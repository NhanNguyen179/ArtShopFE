import { Grid } from '@mui/material'
import { FC } from 'react'
import { ProductCard } from './ProductCard';
import { SeedProduct } from '../../database/seed-data';

interface Props{
  products: SeedProduct[];
}
export const ProductList:FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {
        products.map(product =>(
            <ProductCard product={product}  key={product.slug}/>
        ))
      }
    </Grid>
  )
}
