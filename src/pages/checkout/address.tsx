import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

const AddressPage = () => {
  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion de destino">
      <Box sx={{mt:15}} display='flex' justifyContent='center'>
        <Typography variant='h1' component='h1' >
        Địa chỉ
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{mt:3}}>
        <Grid item xs={12} sm={6}>
          <TextField label='Tên' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Họ' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Địa chỉ' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Địa chỉ 2' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Mã bưu điện' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Thành phố' variant="filled" fullWidth/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant='filled'
              label="País"
              value={1}
            >
              <MenuItem value={1}>EUA</MenuItem>
              <MenuItem value={2}>Colombia</MenuItem>
              <MenuItem value={3}>México</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Điện thoại' variant="filled" fullWidth/>
        </Grid>
      </Grid>
      <Box sx={{mt:5}} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
        Xem lại đơn đặt hàng
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage
