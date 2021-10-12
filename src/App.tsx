import { useState } from 'react'
import { Button, Grid } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { INewPersonFormData } from './components/molecules/NewPersonDialog/NewPersonDialog'
import AddPersonToItemDialog from './components/molecules/AddPersonToItemDialog'
import NewItemDialog, { INewItemFormData } from './components/molecules/NewItemDialog/NewItemDialog'
import UserActions from './components/molecules/UserActions/UserActions'
import NewPersonDialog from './components/molecules/NewPersonDialog'
import Person from './components/molecules/Person'
import Item from './components/molecules/Item'

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

const App = () => {
  const [items, setItems] = useState<IItem[]>([])
  const [table, setTable] = useState<ITable>({})

  const [activeItem, setActiveItem] = useState('')
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openPersonDialog, setOpenPersonDialog] = useState(false)
  const [openPersonToItem, setOpenPersonToItem] = useState(false)

  const handleSubmitNewPerson = ({ name }: INewPersonFormData) => {
    setOpenPersonDialog(false)
    setTable(prev => ({ ...prev, [name]: { amount: 0 } }))
  }

  const handleSubmitNewItem = ({ title, value }: INewItemFormData) => {
    setOpenItemDialog(false)
    setItems(prev => [...prev, { title, value: parseFloat(value), names: [] }])
  }

  const handleActiveItem = (title: string) => {
    setActiveItem(title)
    setOpenPersonToItem(true)
  }

  const handleSubmitPersonToItem = (name: string) => {
    const itemToUpdate = items.find(({ title }) => title === activeItem)
    itemToUpdate?.names.push(name)
    setItems([...items])
  }

  const userActions = [
    { icon: <AddShoppingCartIcon />, name: 'Novo item', onClick: () => setOpenItemDialog(true) },
    { icon: <PersonAddIcon />, name: 'Nova pessoa', onClick: () => setOpenPersonDialog(true) },
  ]

  const handleCalculate = () => {
    const newTable = calculateAmountPerPerson(table, items)
    setTable({ ...newTable })
  }

  return (
    <>
      <NewPersonDialog
        open={openPersonDialog}
        onClose={() => setOpenPersonDialog(false)}
        onSubmit={handleSubmitNewPerson}
      />

      <NewItemDialog
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

      <Grid container spacing={2}>
        {Boolean(Object.keys(table).length) &&
          Object.keys(table).map((name, index) => (
            <Grid item xs={4} key={name}>
              <Person amount={table[name].amount} name={name} />
            </Grid>
          ))}
      </Grid>

      <Grid container spacing={2}>
        {Boolean(items.length) &&
          items.map(({ title, value, names }) => (
            <Grid item xs={3} key={title}>
              <Item title={title} value={value} names={names} onClick={handleActiveItem} />
            </Grid>
          ))}
      </Grid>
      <UserActions actions={userActions} />

      <Button onClick={handleCalculate}>Calcular</Button>
    </>
  )
}

export default App
