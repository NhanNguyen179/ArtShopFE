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
import { Dialog } from "@mui/material";
import AddModal from "../modal/AddModal";
import { EditNotifications } from "@mui/icons-material";
import { SeedProduct } from "../../database/seed-data";
import { FC } from "react";
import Image from "next/image";

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
}
export const AdminProductCard: React.FC<Props> = ({ productItem }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddModal productDetail={productItem} />
      </Dialog>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img
                src={`https://shopart.loca.lt${productItem.images[0]}`}
              ></img>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <EditNotifications onClick={() => setOpenModal(true)} />
            </IconButton>
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
              image={`https://shopart.loca.lt${productItem.images[0]}`}
              alt="Paella dish"
            />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
