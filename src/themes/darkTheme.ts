import { createTheme, responsiveFontSizes } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#b3b2b2',
      secondary: 'rgba(131,128,128,0.7)',
    },
    error: {
      main: '#6b211b',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#121212',
      paper: '#1c1b1e',
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

export default responsiveFontSizes(darkTheme)
