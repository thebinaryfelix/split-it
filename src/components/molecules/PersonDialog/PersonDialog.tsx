import { Button, Box, Dialog, DialogTitle, TextField } from '@material-ui/core'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface INewPersonFormData {
  name: string
}

interface INewPersonDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: INewPersonFormData) => void
}

const schema = yup
  .object({
    name: yup.string().required('Informe um nome'),
  })
  .required()

const PersonDialog = ({ open, onClose, onSubmit }: INewPersonDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleSubmitForm = (data: INewPersonFormData) => {
    onClose()
    onSubmit(data)
    reset({ name: '' })
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Adicionar nova pessoa</DialogTitle>

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

export default PersonDialog
