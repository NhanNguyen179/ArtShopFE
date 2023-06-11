import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { User } from "../../components/Type";
import { FullScreenLoading } from "../../components/ui";
import { FC } from "react";

export const AccountProfile = ({ myProfile }) => (
  <>
    {myProfile ? (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Typography gutterBottom variant="h5">
              {myProfile.name}
            </Typography>

            <Typography variant="body2">{myProfile.role.name}</Typography>
          </Box>
        </CardContent>
      </Card>
    ) : (
      <FullScreenLoading></FullScreenLoading>
    )}
  </>
);
