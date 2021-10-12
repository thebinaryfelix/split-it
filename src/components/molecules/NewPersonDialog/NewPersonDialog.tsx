import { Button, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form'

export interface INewPersonFormData {
  name: string
}

interface INewPersonDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: INewPersonFormData) => void
}

const NewPersonDialog = ({ open, onClose, onSubmit }: INewPersonDialogProps) => {
  const { register, handleSubmit } = useForm()

  const handleSubmitForm = (data: INewPersonFormData) => {
    onClose()
    onSubmit(data)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Nova Pessoa</DialogTitle>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography>Nome</Typography>
        <TextField {...register('name')} />

        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </form>
    </Dialog>
  )
}

export default NewPersonDialog
