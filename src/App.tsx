import { Box, CssBaseline } from '@mui/material'
import Routes from 'components/routes/Routes'
import Navbar from 'components/templates/Navbar'
import StoreProvider from 'store/store'
import './App.css'

const App = () => (
  <>
    <CssBaseline />

    <StoreProvider>
      <Navbar />

      <Box mt={8}>
        <Routes />
      </Box>
    </StoreProvider>
  </>
)

export default App
