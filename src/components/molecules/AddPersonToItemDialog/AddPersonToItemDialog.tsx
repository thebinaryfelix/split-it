import { Box, Dialog, DialogTitle, Typography, Grid, Paper, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPerson } from 'db/interfaces'
import { getPersons } from 'services/person'
import { useEffect, useState } from 'react'

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
  const [persons, setPersons] = useState<IPerson[]>([])

  useEffect(() => {
    const personsData = getPersons()

    setPersons(personsData)
  }, [])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Quem consumiu esse item?</DialogTitle>

      <Box p={2}>
        <Grid container spacing={2}>
          {Boolean(persons?.length) &&
            persons.map(({ id, name }) => (
              <Grid key={id} item xs={4}>
                <Paper>
                  <Box p={2}>
                    <IconButton onClick={() => onSubmit(productId, id)}>
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
