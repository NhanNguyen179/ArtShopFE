import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  Dialog,
  Typography,
  Grid,
  Box,
  DialogContent,
  Icon,
} from "@mui/material";
import { Product } from "../Type";
import productAPI from "../../pages/api/productApiFunction";
import { useEffect } from "react";
import { Carousel } from "../Carousel";
import axios from "axios";
import { CheckCircleOutline } from "@mui/icons-material";

export default function ImageUpload({
  open,
  close,
}: {
  open: any;
  close: any;
}) {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [file, setFile] = useState<any>();
  const [listProduct, setListProduct] = useState<Product[]>();
  const [categoryDetect, setCategoryDetect] = useState<string>();

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDetectPicture = () => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      productAPI.detectImage(formData).then(async (rs: any) => {
        setCategoryDetect(rs.name);
        const respone = await productAPI.getProductOfCategory(rs.id);
        setListProduct(respone.data);
      });
    } else {
      return;
    }
  };
  return (
    <Dialog
      style={{ zIndex: 1800, margin: "10px", padding: "10px" }}
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth={false}
    >
      <DialogContent dividers className="dialog-content">
        <Container
          sx={{
            mt: 3,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "1200px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Typography
                variant="h4"
                textAlign={"center"}
                marginBottom={"10px"}
              >
                {" "}
                Gợi ý tranh theo sở thích
                <p className="italic text-md">
                  {" "}
                  *Hệ thống sẽ xử lí và gợi ý tranh phù hợp với sở thích của bạn
                </p>
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

            <Grid item xs={12} md={12} lg={6}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  height="300"
                  width="300"
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              {file && (
                <Button
                  fullWidth
                  size="medium"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDetectPicture()}
                  disabled={!file}
                >
                  Nhận diện tranh
                </Button>
              )}

              {categoryDetect && (
                <>
                  <p className="text-2xl font-medium flex gap-2">
                    {" "}
                    Tranh thuộc thể loại:
                    <p className="italic font-bold text-2xl text-green-500 flex gap-1">
                      {" "}
                      {categoryDetect}{" "}
                      <Icon
                        sx={{
                          height: "32px",
                        }}
                      >
                        <CheckCircleOutline></CheckCircleOutline>
                      </Icon>
                    </p>
                  </p>
                  {!listProduct && (
                    <p className="text-2xl font-medium">
                      {" "}
                      Vui lòng đợi tranh dành cho bạn...
                    </p>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ position: "relative", marginTop: "30px" }}>
                {listProduct ? (
                  <Carousel
                    listProduct={listProduct}
                    title="Sản phẩm cùng loại"
                  ></Carousel>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
