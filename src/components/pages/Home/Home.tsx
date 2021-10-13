import { useState } from 'react'
import { Box, Button, Container, Grid } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { INewPersonFormData } from 'components/molecules/PersonDialog/PersonDialog'
import AddPersonToItemDialog from 'components/molecules/AddPersonToItemDialog'
import ItemDialog, { INewItemFormData } from 'components/molecules/ItemDialog/ItemDialog'
import UserActions from 'components/molecules/UserActions/UserActions'
import PersonDialog from 'components/molecules/PersonDialog'
import Person from 'components/molecules/Person'
import Item from 'components/molecules/Item'

import calculateAmountPerPerson from 'utils/calculateAmountPerPerson'

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
  // TODO: use localStorage through a common API
  const [items, setItems] = useState<IItem[]>([])
  const [table, setTable] = useState<ITable>({})

  const [activeItem, setActiveItem] = useState('')
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openPersonDialog, setOpenPersonDialog] = useState(false)
  const [openPersonToItem, setOpenPersonToItem] = useState(false)

  const disabledCalculateButton = Boolean(!items.length) || Boolean(!Object.keys(table).length)

  // TODO: maybe move handlers to a custom hook
  const handleSubmitNewPerson = ({ name }: INewPersonFormData) => {
    setOpenPersonDialog(false)
    setTable(prev => ({ ...prev, [name]: { amount: 0 } }))
  }

  const handleSubmitNewItem = ({ title, value }: INewItemFormData) => {
    setOpenItemDialog(false)
    setItems(prev => [...prev, { title, value: parseFloat(value), names: [] }])
  }

  const handleActiveItem = (title: string) => {
    setOpenPersonToItem(true)
    setActiveItem(title)
  }

  const handleSubmitPersonToItem = (name: string) => {
    const itemToUpdate = items.find(({ title }) => title === activeItem)
    itemToUpdate?.names.push(name)
    setItems([...items])
  }

  const handleCalculate = () => {
    const newTable = calculateAmountPerPerson(table, items)
    setTable({ ...newTable })
  }

  const handleDeleteItem = (title: string) => {
    const itemsCopy = [...items]
    itemsCopy.splice(
      items.findIndex(item => item.title === title),
      1,
    )
    setItems([...itemsCopy])
  }

  const userActions = [
    { icon: <AddShoppingCartIcon />, name: 'Novo item', onClick: () => setOpenItemDialog(true) },
    { icon: <PersonAddIcon />, name: 'Nova pessoa', onClick: () => setOpenPersonDialog(true) },
  ]

  return (
    <Container>
      <PersonDialog
        open={openPersonDialog}
        onClose={() => setOpenPersonDialog(false)}
        onSubmit={handleSubmitNewPerson}
      />

      <ItemDialog
        open={openItemDialog}
        onClose={() => setOpenItemDialog(false)}
        onSubmit={handleSubmitNewItem}
      />

      <AddPersonToItemDialog
        open={openPersonToItem}
        onClose={() => setOpenPersonToItem(false)}
        onSubmit={handleSubmitPersonToItem}
        names={Object.keys(table)}
      />

      <Box p={2}>
        <Grid container spacing={4}>
          <Grid container item xs={12} spacing={2}>
            {Boolean(Object.keys(table).length) &&
              Object.keys(table).map(name => (
                <Grid item xs={4} key={name}>
                  <Person amount={table[name].amount} name={name} />
                </Grid>
              ))}
          </Grid>

          <Grid container item xs={12} spacing={2}>
            {Boolean(items.length) &&
              items.map(({ title, value, names }) => (
                <Grid item xs={12} key={title}>
                  <Item
                    title={title}
                    value={value}
                    names={names}
                    onClick={handleActiveItem}
                    onDelete={handleDeleteItem}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            disabled={disabledCalculateButton}
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
