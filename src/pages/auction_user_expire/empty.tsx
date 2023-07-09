import { Box, Button, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import NextLink from 'next/link';
const EmptyPage = () => {
  return (
   <ShopLayout title='Empty Cart' pageDescription='There are no products to show' isPublic={false}>
     <Box sx={{ flexDirection: {xs:'column', sm:'row'}}} display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' color='#d63031'>
          <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 60 }}  />
          <Typography variant="h1" component='h1' fontSize={60} fontWeight={200}>Giỏ hàng trống</Typography>
          <Typography variant="h2" component='h2' fontSize={80} fontWeight={200} marginLeft={2} sx={{ display: {xs:'none', sm:'block'}}} >|</Typography>
          <Box sx={{flexDirection: 'column', }} marginLeft={2}>
            <Typography >Không có mặt hàng nào trong giỏ hàng</Typography>
            <NextLink href='/' passHref>
              <Link>
                <Button variant="outlined" color="success">Quay lại</Button>
              </Link>
            </NextLink>
          </Box>
          
      </Box>
   </ShopLayout>
  )
}

export default EmptyPage
