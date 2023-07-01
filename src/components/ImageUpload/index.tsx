import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container, Dialog, Typography, Grid, Box } from "@mui/material";
import { Product } from "../Type";
import productAPI from "../../pages/api/productApiFunction";
import { useEffect } from "react";
import { Carousel } from "../Carousel";
import axios from "axios";

export default function ImageUpload({
  open,
  close,
}: {
  open: any;
  close: any;
}) {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [file, setFile] = useState<any>();
  const [listProduct, setListProduct] = useState<Product[]>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const fetchData = async () => {
    Promise.all([productAPI.getProduct(1, "")]).then((values: any) => {
      setListProduct(values[0].data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetectPicture = () => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      axios
        .post(
          "https://art-shop.loca.lt/api/v1/products/detect_image/",
          formData
        )
        .then(async (rs) => {
          const respone = await axios.get(
            `https://art-shop.loca.lt/api/v1/products/${rs.data.id}/get_product_of_category/`
          );
          setListProduct(respone.data);
          console.log({ respone });
        });
    } else {
      return;
    }
  };
  return (
    <Dialog
      style={{ zIndex: 1800, margin: "20px" }}
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth={false}
    >
      <Container
        sx={{
          mt: 3,
          padding: 3,
          display: "flex",
          maxWidth: "auto !important",
          flexDirection: "column",
          gap: "14px",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <Typography variant="h4" textAlign={"center"} marginBottom={"10px"}>
              {" "}
              Gợi ý tranh theo sở thích
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <label htmlFor="upload-image">
              <Button variant="contained" component="span" fullWidth>
                Tải tranh
              </Button>
              <input
                id="upload-image"
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
              />
            </label>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Button
              fullWidth
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => handleDetectPicture()}
            >
              Nhận diện tranh
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded Image" height="300" />
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="body2" color={"green"} textAlign={"center"}>
              ABC
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ position: "relative", marginTop: "30px" }}>
              <Carousel
                listProduct={listProduct}
                title="Có thể bạn sẽ thích"
              ></Carousel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
