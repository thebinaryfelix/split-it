import { Box, Dialog, DialogTitle, Typography, Grid, Paper, IconButton } from '@mui/material'
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

      <Box p={2}>
        <Grid container spacing={2}>
          {Boolean(names?.length) &&
            names.map(name => (
              <Grid key={name} item xs={4}>
                <Paper>
                  <Box p={2}>
                    <IconButton onClick={() => onSubmit(name)}>
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
