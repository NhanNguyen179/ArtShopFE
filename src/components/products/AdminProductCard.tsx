import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Dialog } from "@mui/material";
import AddModal from "../modal/AddModal";
import { EditNotifications } from "@mui/icons-material";
import { SeedProduct } from "../../database/seed-data";
import { FC } from "react";
import Image from "next/image";
import productAPI from "../../pages/api/productApiFunction";
import { AuctionOfProduct } from "../Type";
import { toast } from "react-toastify";
import ConfirmDialog from "../modal/ConfirmModal";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  productItem: SeedProduct;
  isApproved?: boolean;
}
export const AdminProductCard: React.FC<Props> = ({
  productItem,
  isApproved,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [maxAuctionPeopleOfProduct, setMaxAuctionPeopleOfProduct] =
    React.useState<AuctionOfProduct>();
  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);

  const handleClose = () => setOpenModal(false);

  const getMaxAuctionPeopleOfProduct = async () => {
    const response = await productAPI.getListAuctionPriceProduct(
      productItem.id
    );
    const maxObject =
      response.length > 1
        ? response.reduce(function (prev, current) {
            return prev.auction_price > current.auction_price ? prev : current;
          })
        : response.length === 1
        ? response[0]
        : {};

    setMaxAuctionPeopleOfProduct(maxObject);
  };

  const approvedAuctionProduct = async () => {
    if (maxAuctionPeopleOfProduct?.id) {
      productAPI
        .approvedAuctionProduct(maxAuctionPeopleOfProduct.id)
        .then((rs) => {
          toast.success("Xác nhận đấu giá thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((rs) => {
          toast.error("Xác nhận thất bại!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  React.useEffect(() => {
    if (isApproved) {
      getMaxAuctionPeopleOfProduct();
    }
  }, [isApproved]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddModal productDetail={productItem} />
      </Dialog>
      <ConfirmDialog
        title={
          maxAuctionPeopleOfProduct
            ? `Xác nhận tài khoản ${maxAuctionPeopleOfProduct?.user?.name} với mức đấu giá ${maxAuctionPeopleOfProduct?.auction_price} cho sản phẩm ${maxAuctionPeopleOfProduct?.product?.name}`
            : ""
        }
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        onConfirm={approvedAuctionProduct}
      ></ConfirmDialog>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img
                src={`${productItem.images[0]}`}
              ></img>
            </Avatar>
          }
          action={
            !isApproved && (
              <IconButton aria-label="settings">
                <EditNotifications onClick={() => setOpenModal(true)} />
              </IconButton>
            )
          }
          title={productItem.name}
          subheader={productItem.start_auction}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {productItem.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {isApproved && maxAuctionPeopleOfProduct && (
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => setOpenConfirmModal(true)}
              disabled={!maxAuctionPeopleOfProduct.id}
            >
              Xác nhận
            </Button>
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia
              component="img"
              height="100"
              image={`${productItem.images[0]}`}
              alt="Paella dish"
            />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
