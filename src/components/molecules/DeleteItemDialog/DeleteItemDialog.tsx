import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface DeleteItemDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteItemDialog = ({ open, onConfirm, onCancel }: DeleteItemDialogProps) => (
  <Dialog open={open}>
    <DialogTitle>Deletar esse item?</DialogTitle>

    <DialogActions>
      <Button variant="outlined" onClick={onConfirm}>
        Sim
      </Button>

      <Button variant="contained" onClick={onCancel}>
        Não
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteItemDialog
