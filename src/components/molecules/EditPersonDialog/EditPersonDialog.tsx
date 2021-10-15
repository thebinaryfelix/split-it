import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IUpdatePerson } from 'db/interfaces'
import { Box, Button, Dialog, DialogTitle, Grid, TextField } from '@mui/material'

interface EditPersonDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: IUpdatePerson) => void
  defaultValues?: { name?: string }
}

const schema = yup
  .object({
    name: yup.string().required('Informe um nome'),
  })
  .required()

const EditPersonDialog = ({ open, onClose, onSubmit, defaultValues }: EditPersonDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues })

  const handleSubmitForm = (data: IUpdatePerson) => {
    onClose()
    onSubmit(data)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Editar pessoa</DialogTitle>

      <Box p={2}>
        <TextField
          fullWidth
          autoFocus
          label="Nome"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />
      </Box>

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth onClick={onClose} variant="outlined">
              Cancelar
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleSubmit(handleSubmitForm)}
              type="submit"
              variant="contained"
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default EditPersonDialog
