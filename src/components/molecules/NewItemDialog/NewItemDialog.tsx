import { Button, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'

export interface INewItemFormData {
  title: string
  value: string
}

interface INewItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: INewItemFormData) => void
}

const NewItemDialog = ({ open, onClose, onSubmit }: INewItemDialogProps) => {
  const { register, handleSubmit } = useForm()

  const handleSubmitForm = (data: INewItemFormData) => {
    onClose()
    onSubmit(data)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Novo item</DialogTitle>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography>Título</Typography>
        <TextField {...register('title')} />

        <Typography>Valor</Typography>
        <TextField {...register('value')} />

        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </form>
    </Dialog>
  )
}

export default NewItemDialog
