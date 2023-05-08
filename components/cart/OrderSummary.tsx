import { Divider, Grid, Typography } from "@mui/material"
import { currency } from "../../utils";
export const OrderSummary = () => {
  return (
   <Grid container>
     <Grid item xs={6}>
       <Typography>Số lượng sản phẩm:</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>1 </Typography>
     </Grid>
     <Grid item xs={6}>
       <Typography>Tổng cộng:</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>10000$</Typography>
     </Grid>
     <Grid item xs={6}>
       <Typography>Thuế ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 || 0}%) :</Typography>
     </Grid>
     <Grid item xs={6} display='flex' justifyContent='end'>
       <Typography>10000$</Typography>
     </Grid>
     <Divider  sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  mt:2
                }}/>
     <Grid item xs={12} sx={{mt:2}} display='flex' justifyContent='center'>
       <Typography variant='subtitle1' >Tổng số tiền đấu giá:</Typography>
     </Grid>
     <Grid item xs={12} display='flex' justifyContent='center'>
       <Typography variant='subtitle1' >10000$</Typography>
     </Grid>
   </Grid>
  )
}
