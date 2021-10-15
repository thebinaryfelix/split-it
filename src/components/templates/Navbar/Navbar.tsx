import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { usePersons, useProducts } from 'utils'
// import { useState } from 'react'
// import { Switch } from 'components/atoms'
// import { useStore } from 'store/store'

// TODO: implement dark theme with correct text contrast on Input

const Navbar = () => {
  const { persons, calculateAmountPerPerson, updatePersons } = usePersons()
  const { products } = useProducts()
  // const [checked, setChecked] = useState(false)

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(prev => !prev)
  //   updateStore({ theme: event.target.value })
  // }

  const disableCalculateButton = Boolean(!persons.length) || Boolean(!products.length)

  const handleCalculateAmount = () => {
    const newAmountsPerPerson = calculateAmountPerPerson()
    updatePersons(newAmountsPerPerson)
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Split-It!
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          disabled={disableCalculateButton}
          onClick={handleCalculateAmount}
        >
          Calcular
        </Button>

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
