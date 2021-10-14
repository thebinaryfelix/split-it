import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

import Item from 'components/molecules/Item'
import ItemDialog from 'components/molecules/ItemDialog/ItemDialog'
import Person from 'components/molecules/Person'
import PersonDialog from 'components/molecules/PersonDialog'
import UserActions from 'components/molecules/UserActions/UserActions'

import { createPerson, getPersons } from 'services/person'
import { createProduct, getPopulatedProducts } from 'services/product'
import { ICreatePerson, ICreateProduct, IPerson, IProductPopulated } from 'db/interfaces'
import calculateAmountPerPerson from 'utils/calculateAmountPerPerson'

const Home = () => {
  const [products, setProducts] = useState<IProductPopulated[]>([])
  const [persons, setPersons] = useState<IPerson[]>([])
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openPersonDialog, setOpenPersonDialog] = useState(false)

  const handleCreatePerson = ({ name }: ICreatePerson) => {
    createPerson({ name })
  }

  const handleCreateProduct = ({ name, value }: ICreateProduct) => {
    createProduct({ name, value })
  }

  const userActions = [
    { icon: <AddShoppingCartIcon />, name: 'Novo item', onClick: () => setOpenItemDialog(true) },
    { icon: <PersonAddIcon />, name: 'Nova pessoa', onClick: () => setOpenPersonDialog(true) },
  ]

  useEffect(() => {
    const productsData = getPopulatedProducts()
    const personsData = getPersons()

    setProducts(productsData)
    setPersons(personsData)
  }, [])

  return (
    <Container>
      <PersonDialog
        open={openPersonDialog}
        onClose={() => setOpenPersonDialog(false)}
        onSubmit={handleCreatePerson}
      />

      <ItemDialog
        open={openItemDialog}
        onClose={() => setOpenItemDialog(false)}
        onSubmit={handleCreateProduct}
      />

      <Box p={2}>
        <Grid container spacing={4}>
          <Grid container item xs={12} spacing={2}>
            {Boolean(persons.length) &&
              persons.map(({ id, name, amount }) => (
                <Grid item xs={4} key={id}>
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
          <Button variant="contained" color="primary" onClick={calculateAmountPerPerson}>
            Calcular
          </Button>
        </Box>
      </Box>

      <UserActions actions={userActions} />
    </Container>
  )
}

export default Home
