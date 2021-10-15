import { createTheme, responsiveFontSizes } from '@mui/material'

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#2886a4',
    },
    secondary: {
      main: '#a44728',
    },
    background: {
      default: '#f7f7f7',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: '#3d3d3d',
      disabled: 'rgba(88,85,85,0.38)',
    },
    error: {
      main: '#e43427',
    },
  },
  typography: {
    fontFamily: 'Lato',
    h1: {
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '2.8rem',
    },
    h3: {
      fontSize: '2.3rem',
    },
    h4: {
      fontSize: '2.1rem',
    },
  },
  spacing: 8,
})

export default responsiveFontSizes(lightTheme)
