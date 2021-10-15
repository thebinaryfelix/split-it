import { AppBar, Toolbar, Typography } from '@mui/material'
// import { useState } from 'react'
// import { Switch } from 'components/atoms'
// import { useStore } from 'store/store'

// TODO: implement dark theme with correct text contrast on Input

const Navbar = () => {
  // const { updateStore } = useStore()
  // const [checked, setChecked] = useState(false)

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(prev => !prev)
  //   updateStore({ theme: event.target.value })
  // }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Split-It!
        </Typography>

        {/* <Switch
          checked={checked}
          value={checked ? 'light' : 'dark'}
          sx={{ m: 1 }}
          onChange={handleChange}
        /> */}

        <Typography>v.{process.env.REACT_APP_VERSION}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
