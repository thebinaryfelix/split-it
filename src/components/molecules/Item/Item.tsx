import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NumberFormat from 'react-number-format'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'

interface IItemProps {
  names: string[]
  onClick: (title: string) => void
  onDelete: (title: string) => void
  title: string
  value: number
}

const Item = ({ title, value, onClick, onDelete, names }: IItemProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>

            <NumberFormat
              prefix="R$ "
              type="text"
              displayType="text"
              value={value.toFixed(2)}
              allowNegative={false}
              renderText={(formattedValue: string) => (
                <Typography color="text.secondary" gutterBottom>
                  {formattedValue}
                </Typography>
              )}
            />
          </Box>

          <Box>
            <Button onClick={() => onClick(title)} size="small">
              <AddIcon />
            </Button>

            <Button onClick={() => onDelete(title)} size="small">
              <DeleteIcon />
            </Button>
          </Box>
        </Box>

        {Boolean(names.length) && (
          <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Spliters</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {names.map(name => (
                <Typography key={name}>{name}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

export default Item
