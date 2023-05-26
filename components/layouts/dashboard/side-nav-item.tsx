import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface Props {
  disable: boolean;
  icon: any;
  path: string;
  title: string;
  active: boolean;
}
export const SideNavItem: FC<Props> = ({
  disable,
  icon,
  path,
  title,
  active,
}) => {
  const linkProps = {
    component: "a",
    href: path,
    target: "_blank",
  };

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          marginBottom:'10px',
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: active ? "red" : "gray",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: active ? "red" : "gray",
            flexGrow: 1,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
