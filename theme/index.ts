import { createTheme } from '@mui/material/styles'
import { font } from './font/font'

export default createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Shabnam',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: font,
    },
  },
})
