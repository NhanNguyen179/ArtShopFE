import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/light-theme';
import { CartProvider, UiProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
  
    <CartProvider>
      <UiProvider>
        <ThemeProvider theme={ lightTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider> 
      </UiProvider>  
    </CartProvider>  
  )
}

export default MyApp
