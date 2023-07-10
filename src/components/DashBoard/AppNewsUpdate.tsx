// @mui
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  StepIcon,
} from "@mui/material";
// utils
// components
import { FC } from "react";
import Iconify from "../iconify/Iconify";
import { fToNow } from "../../utils/formatTime";
import { ImportContacts } from "@mui/icons-material";

// ----------------------------------------------------------------------

interface Props {
  title?: string;
  subheader?: string;
  list?: any[];
}

export const AppNewsUpdate: FC<Props> = ({
  title,
  subheader,
  list,
  ...other
}) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {list?.map((news) => (
          <NewsItem key={news.id} news={news} />
        ))}
      </Stack>

      <Divider />
    </Card>
  );
};

// ----------------------------------------------------------------------

interface PropsNewItem {
  news: {
    description: string;
    image: string;
    postedAt: string;
    title: string;
  };
}

export const NewsItem: FC<PropsNewItem> = ({ news }) => {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      /> */}

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
};
