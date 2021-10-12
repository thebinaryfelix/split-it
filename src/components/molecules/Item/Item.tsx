import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'

interface IItemProps {
  names: string[]
  onClick: (title: string) => void
  title: string
  value: number
}

const Item = ({ title, value, onClick, names }: IItemProps) => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {value}
      </Typography>

      {Boolean(names.length) && names.map(name => <Typography key={name}>{name}</Typography>)}
    </CardContent>

    <CardActions>
      <Button onClick={() => onClick(title)} size="small">
        <AddIcon />
      </Button>
    </CardActions>
  </Card>
)

export default Item
