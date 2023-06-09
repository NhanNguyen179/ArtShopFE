import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';

const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de la compra' pageDescription='Resumen de la compra'>
      <Box display='flex' justifyContent='center' sx={{ mt: 15 }}>
        <Typography variant='h1' component='h1'>Tóm tắt theo thứ tự</Typography>
      </Box>
      <Grid container sx={{ mt:5 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
                <Typography variant='h2'>
                Bản tóm tắt ( 3 sản phẩm )
                </Typography>
                <Divider sx={{ my: 1}}/>
                <Box display='flex' justifyContent='end'>
                  <NextLink href='/checkout/address' passHref>
                    <Link underline='always'>
                    Chỉnh sửa
                    </Link>
                  </NextLink>
                </Box>
                <Typography variant='subtitle1'> Địa chỉ giao hàng</Typography>
                <Typography> Avenida Plaza Sezame</Typography>
                <Typography> 322 Golden Valley</Typography>
                <Typography> Bahia de Banderas, Nay</Typography>
                <Typography> Mexico</Typography>
                <Typography> 3223094030 </Typography>
                <Divider sx={{ my:1 }}/>
                <Box display='flex' justifyContent='end'>
                  <NextLink href='/cart' passHref>
                    <Link underline='always'>
                      Editar
                    </Link>
                  </NextLink>
                </Box>
                <OrderSummary />
                <Box sx={{ my:1 }}>
                  <Button color='success' className='circular-btn' fullWidth>
                  Xác nhận đơn hàng
                  </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
