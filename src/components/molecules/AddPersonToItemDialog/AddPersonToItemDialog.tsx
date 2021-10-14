import { Box, Dialog, DialogTitle, Typography, Grid, Paper, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPerson } from 'db/interfaces'
import { useEffect, useState } from 'react'
import { usePersons } from 'utils'

interface IAddPersonToItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (productId: string, personId: string) => void
  productId: string
}

const AddPersonToItemDialog = ({
  open,
  onClose,
  onSubmit,
  productId,
}: IAddPersonToItemDialogProps) => {
  const { persons } = usePersons()

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
    setAvailablePersons(persons)
  }, [persons])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Quem consumiu esse item?</DialogTitle>

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
