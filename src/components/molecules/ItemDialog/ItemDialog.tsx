import { Button, Box, Dialog, DialogTitle, TextField } from '@material-ui/core'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface INewItemFormData {
  title: string
  value: string
}

interface INewItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: INewItemFormData) => void
}

const schema = yup
  .object({
    title: yup.string().required('Informe o título do item'),
    value: yup
      .number()
      .typeError('Apenas números [0-9] e use ponto como separador')
      .required('Informe o valor do item'),
  })
  .required()

const ItemDialog = ({ open, onClose, onSubmit }: INewItemDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleSubmitForm = (data: INewItemFormData) => {
    onClose()
    onSubmit(data)
    reset({ title: '', value: 0 })
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Adicionar novo Item</DialogTitle>

      <Box p={2}>
        <TextField
          fullWidth
          autoFocus
          label="Título"
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register('title')}
        />
      </Box>

      <Box p={2}>
        <TextField
          fullWidth
          label="Valor"
          error={Boolean(errors.value)}
          helperText={errors.value?.message}
          {...register('value')}
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

export default ItemDialog
