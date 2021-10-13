import { Box, CssBaseline } from '@mui/material'
import Routes from 'components/routes/Routes'
import Navbar from 'components/templates/Navbar'
import './App.css'

const App = () => (
  <>
    <CssBaseline />

    <Navbar />

    <Box mt={8}>
      <Routes />
    </Box>
  </>
)

export default App
