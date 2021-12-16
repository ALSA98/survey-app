import '../styles/globals.css'
import type { AppProps } from 'next/app'

import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
const cacheRtl = createCache({ key: 'muirtl', stylisPlugins: [rtlPlugin] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
