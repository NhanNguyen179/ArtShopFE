// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
// components
import { FC } from "react";
import Iconify from "../iconify/Iconify";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface Props {
  color?: string;
  icon: any;
  title: string;
  total: number;
  sx?: object;
}

export const AppWidgetSummary: FC<Props> = ({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) => {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: "",
        bgcolor: "#e3e3e3",
        ...sx,
      }}
      {...other}
    >
      <p className="text-5xl font-bold">{total}</p>

      <p className="text-xl font-normal">
        {title}
      </p>
    </Card>
  );
};
