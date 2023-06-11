import { BorderRight, LockClock, LockClockOutlined, PunchClock } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { FC } from "react";
import Countdown from "react-countdown";
interface Props {
  endDate: Date;
}
export const CountDown: FC<Props> = ({ endDate }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          maxWidth: "400px",
          gap: "30px",
          padding: "20px",
          paddingLeft:'30px',
          fontSize: "30px",
          letterSpacing: "2px",
          alignItems: "center",
          borderRadius:'20px',
        }}
      >
        <LockClockOutlined></LockClockOutlined>
        <Countdown date={endDate}>
          <Typography> Đấu giá đã kết thúc</Typography>
        </Countdown>
      </Box>
    </>
  );
};
