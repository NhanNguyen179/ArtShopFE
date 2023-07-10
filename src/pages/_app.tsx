import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes/light-theme";
import { UiProvider } from "../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { createTrackingSession } from "../activity-tracking/TrackingSession";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    createTrackingSession();
  },[])
  return (
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
  );
}

export default MyApp;
