import { useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Item from 'components/organisms/Item'
import ItemDialog from 'components/molecules/ItemDialog/ItemDialog'
import Person from 'components/organisms/Person'
import PersonDialog from 'components/molecules/PersonDialog'
import UserActions from 'components/molecules/UserActions/UserActions'
import { usePersons, useProducts } from 'utils'

const Home = () => {
  const { persons, calculateAmountPerPerson, updatePersons, createPerson } = usePersons()
  const { products, createProduct } = useProducts()

  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openPersonDialog, setOpenPersonDialog] = useState(false)

  const disableCalculateButton = Boolean(!persons.length) || Boolean(!products.length)

  const userActions = [
    { icon: <AddShoppingCartIcon />, name: 'Novo item', onClick: () => setOpenItemDialog(true) },
    { icon: <PersonAddIcon />, name: 'Nova pessoa', onClick: () => setOpenPersonDialog(true) },
  ]

  const handleCalculateAmount = () => {
    const newAmountsPerPerson = calculateAmountPerPerson()
    updatePersons(newAmountsPerPerson)
  }

  return (
    <Container>
      <PersonDialog
        open={openPersonDialog}
        onClose={() => setOpenPersonDialog(false)}
        onSubmit={createPerson}
      />

      <ItemDialog
        open={openItemDialog}
        onClose={() => setOpenItemDialog(false)}
        onSubmit={createProduct}
      />

      <Box p={2}>
        <Grid container spacing={4}>
          <Grid container item xs={12} spacing={2}>
            {Boolean(persons.length) &&
              persons.map(({ id, name, amount }) => (
                <Grid item xs={6} key={id}>
                  <Person id={id} amount={amount} name={name} />
                </Grid>
              ))}
          </Grid>

          <Grid container item xs={12} spacing={2}>
            {Boolean(products.length) &&
              products.map(({ id, name, value, consumedBy }) => (
                <Grid item xs={12} key={id}>
                  <Item id={id} title={name} value={value} consumedBy={consumedBy} />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            disabled={disableCalculateButton}
            onClick={handleCalculateAmount}
          >
            Calcular
          </Button>
        </Box>
      </Box>

      <UserActions actions={userActions} />
    </Container>
  )
}

export default Home
