// interface Props {
//   products: SeedProduct[];
// }
import { Box, Button, Grid, Typography } from "@mui/material";
import RFTextField from "../RFTextField";
import { useForm, SubmitHandler } from "react-hook-form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface ILoginFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

export const AuctionModal = ({}) => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<ILoginFormInput> = async (values) => {
    console.log({ values });
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h1" component="h1" sx={{
        marginBottom:'10px'
      }}>
        Tên sản phẩm
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography> Giá hiện tại: </Typography>
            <RFTextField
              name="email"
              inputType="email"
              placeholder="1000$"
              disabled={true}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
          <Typography> Giá đặt: </Typography>
            <RFTextField
              label="Password"
              inputType="password"
              name="password"
              placeholder="Nhập giá muốn tham gia......"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              type="submit"
            >
              Đấu giá
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
