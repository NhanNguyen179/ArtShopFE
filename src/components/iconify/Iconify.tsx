import PropTypes from "prop-types";
import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";
import { FC } from "react";

// ----------------------------------------------------------------------

interface Props {
  sx?: object;
  width?: number | string;
  icon?: any;
  height?: number;
}

export const Iconify: FC<Props> = (
  { icon, width = 20, sx, height, ...other },
  ref
) => (
  <>
    <Box
      ref={ref}
      component={Icon}
      sx={{ width, height: height, ...sx }}
      {...other}
    />
  </>
);

export default Iconify;
