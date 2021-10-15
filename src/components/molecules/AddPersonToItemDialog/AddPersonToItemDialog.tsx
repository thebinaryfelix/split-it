import {
  Box,
  Dialog,
  DialogTitle,
  Typography,
  Grid,
  Paper,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPerson } from 'db/interfaces'
import { useEffect, useState } from 'react'
import { usePersons, useProducts } from 'utils'

interface IAddPersonToItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (productId: string, personId: string) => void
  productId: string
}

const getAvailablePersons = (persons: IPerson[], consumedBy: IPerson[]): IPerson[] | [] => {
  const available = persons.filter(person =>
    Boolean(!consumedBy.find(consumer => consumer.id === person.id)),
  )
  return [...available]
}

const AddPersonToItemDialog = ({
  open,
  onClose,
  onSubmit,
  productId,
}: IAddPersonToItemDialogProps) => {
  const { persons } = usePersons()
  const { getProduct } = useProducts()

  const [availablePersons, setAvailablePersons] = useState<IPerson[]>([])

  const handleSubmit = (id: string) => {
    onSubmit(productId, id)

    setAvailablePersons(prev => {
      const personIndex = availablePersons.findIndex(person => person.id === id)
      const availablePersonsCopy = [...prev]
      availablePersonsCopy.splice(personIndex, 1)
      return [...availablePersonsCopy]
    })
  }

  useEffect(() => {
    const product = getProduct(productId)
    if (product) {
      setAvailablePersons([...getAvailablePersons(persons, product.consumedBy)])
    }
  }, [getProduct, persons, productId])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        {availablePersons.length ? 'Quem consumiu esse item?' : 'Alguém mais consumiu esse item?'}
      </DialogTitle>

      {Boolean(!availablePersons.length) && (
        <>
          <DialogContent>
            Não há mais pessoas para adicionar a este item. Adicione mais pessoas à conta para poder
            incluí-las aqui.
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Fechar</Button>
          </DialogActions>
        </>
      )}

      <Box p={2}>
        <Grid container spacing={2}>
          {Boolean(availablePersons?.length) &&
            availablePersons.map(({ id, name }) => (
              <Grid key={id} item xs={4}>
                <Paper>
                  <Box p={2}>
                    <IconButton onClick={() => handleSubmit(id)}>
                      <AddIcon />
                    </IconButton>

                    <Typography>{name}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Dialog>
  )
}

export default AddPersonToItemDialog
