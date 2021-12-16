/* eslint-disable @next/next/no-css-tags */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
