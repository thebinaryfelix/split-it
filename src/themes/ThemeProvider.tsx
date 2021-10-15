import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { useStore } from 'store/store'
import lightTheme from './lightTheme'
import darkTheme from './darkTheme'

const ThemeProvider: React.FC = ({ children }) => {
  const { theme } = useStore()

  const themeFile = theme === 'dark' ? darkTheme : lightTheme

  return <MuiThemeProvider theme={themeFile}>{children}</MuiThemeProvider>
}

export default ThemeProvider
