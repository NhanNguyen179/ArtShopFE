import { Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../context/cart/CartContext";
import { currency } from "../../utils";
export const OrderSummary = () => {
  const {numberOfItems, subTotal, total, tax} = useContext(CartContext);
  return (
   <Grid container>
     <Grid item xs={6}>
       <Typography>Số lượng sản phẩm:</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>{numberOfItems} </Typography>
     </Grid>
     <Grid item xs={6}>
       <Typography>Tổng cộng:</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>{currency.format(subTotal)}</Typography>
     </Grid>
     <Grid item xs={6}>
       <Typography>Thuế ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 || 0}%) :</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>{currency.format(tax)}</Typography>
     </Grid>
     <Divider  sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  mt:2
                }}/>
     <Grid item xs={6} sx={{mt:2}}>
       <Typography variant='subtitle1' >Tổng số phải trả:</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography variant='subtitle1' >{currency.format(total)}</Typography>
     </Grid>
   </Grid>
  )
}
