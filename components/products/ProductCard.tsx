import { Chip, Box, Card, CardActionArea, CardMedia, Grid, Typography, Link } from '@mui/material'
import NextLink from 'next/link'
import { FC, useMemo, useState } from 'react'
import { SeedProduct } from '../../database/seed-data';

interface Props{
  product: SeedProduct;
}
export const ProductCard:FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const productImage = useMemo(()=>{
    return isHovered 
    ? `/products/${product.images[1]}`
    : `/products/${product.images[0]}`
  }, [isHovered, product.images])
  return (
    <Grid 
      item 
      xs={6} sm={4} 
      onMouseEnter={()=> setIsHovered(true) }
      onMouseLeave={()=> setIsHovered(false) }
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref>
          <Link>
            <CardActionArea>
              {
                (product.sold) && (
                  <Chip 
                    color="primary"
                    label="Hết hàng"
                    sx= {{ position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
                  />
                )
              }
              
              <CardMedia 
                component='img'
                className='fadeIn'
                image={ productImage }
                alt={ product.name }
                onLoad={ ()=> setIsImageLoaded(true) }
              />
            </CardActionArea>
          </Link>
        </NextLink>
        
      </Card>
      <Box sx={{mt:1,  display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={800}>{ product.name }</Typography>
        <Typography fontWeight={600}>{ `$${product.price}` }</Typography>
        <Typography fontWeight={600}>Tác giả: { product.author.name }</Typography>
      </Box>
  </Grid>
  )
}
