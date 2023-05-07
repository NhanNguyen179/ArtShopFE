import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const CartPage = () => {
  return (
    <ShopLayout title='Carrito - 3' pageDescription={'Danh sách đấu giá của bạn'}>
      <Typography variant='h1' component='h1'>Danh sách đấu giá:</Typography>
      <br></br>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
                <Typography variant='h2'>
                 Tổng giá trị đấu giá
                </Typography>
                <Divider sx={{ my: 1}}/>
                <OrderSummary />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage;
