import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes/light-theme";
import { CartProvider, UiProvider } from "../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <ToastContainer />

          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </CartProvider>
  );
}

export default MyApp;