import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

interface DeleteItemDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteItemDialog = ({ open, onConfirm, onCancel }: DeleteItemDialogProps) => (
  <Dialog open={open}>
    <DialogTitle>Tem certeza que quer deletar esse item?</DialogTitle>

    <DialogActions>
      <Button variant="outlined" onClick={onConfirm}>
        Sim, deletar
      </Button>

      <Button variant="contained" onClick={onCancel}>
        Cancelar
      </Button>
    </DialogActions>
  </Dialog>
)

export default DeleteItemDialog
