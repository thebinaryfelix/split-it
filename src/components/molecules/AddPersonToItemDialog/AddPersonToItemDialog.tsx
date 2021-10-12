import { Button, Dialog, DialogTitle, Typography } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'

interface IAddPersonToItemDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  names: string[]
}

const AddPersonToItemDialog = ({ open, onClose, onSubmit, names }: IAddPersonToItemDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Quem consumiu esse item?</DialogTitle>

      {Boolean(names?.length) &&
        names.map(name => (
          <div key={name}>
            <Typography key={name}>{name}</Typography>
            <Button onClick={() => onSubmit(name)} size="small">
              <AddIcon />
            </Button>
          </div>
        ))}
    </Dialog>
  )
}

export default AddPersonToItemDialog
