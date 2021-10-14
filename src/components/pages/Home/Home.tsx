import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import ItemDialog from 'components/molecules/ItemDialog/ItemDialog'
import UserActions from 'components/molecules/UserActions/UserActions'
import PersonDialog from 'components/molecules/PersonDialog'
import Person from 'components/molecules/Person'
import Item from 'components/molecules/Item'

import calculateAmountPerPerson from 'utils/calculateAmountPerPerson'
import { createProduct, getPopulatedProducts } from 'services/product'
import { ICreatePerson, ICreateProduct, IPerson, IProductPopulated } from 'db/localStorage'
import { createPerson, getPersons } from 'services/person'

export interface IItem {
  title: string
  value: number
  names: string[]
}

export interface IPersonTableInfo {
  amount: number
}

export interface ITable {
  [key: string]: IPersonTableInfo
}

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
