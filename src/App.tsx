import { Box, CssBaseline } from '@mui/material'
import { Navbar, Footer } from 'components/templates'
import Routes from 'components/routes/Routes'
import StoreProvider from 'store/store'
import ThemeProvider from 'themes/ThemeProvider'
import './App.css'

const App = () => (
  <StoreProvider>
    <ThemeProvider>
      <CssBaseline />

      <Navbar />

      <Box mt={8}>
        <Routes />
      </Box>

      <Footer />
    </ThemeProvider>
  </StoreProvider>
)

export default App
