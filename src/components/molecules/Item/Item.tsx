import { useState } from 'react'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import NumberFormat from 'react-number-format'
import { IPerson } from 'db/interfaces'
import { usePersons, useProducts } from 'utils'
import AddPersonToItemDialog from '../AddPersonToItemDialog'

interface ItemProps {
  id: string
  title: string
  value: number
  consumedBy: IPerson[]
}

const Item = ({ id, title, value, consumedBy }: ItemProps) => {
  const { deleteProduct, updateProduct } = useProducts()
  const { getPerson } = usePersons()

  const [openPersonToItem, setOpenPersonToItem] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleSubmitPersonToItem = (productId: string, personId: string) => {
    const person = getPerson(personId)
    if (person) {
      updateProduct(productId, { consumedBy: { ...person } })
    }
  }

  const handleDelete = () => {
    deleteProduct(id)
  }

  return (
    <>
      <AddPersonToItemDialog
        productId={id}
        open={openPersonToItem}
        onSubmit={handleSubmitPersonToItem}
        onClose={() => setOpenPersonToItem(false)}
      />

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
              <Button onClick={() => setOpenPersonToItem(true)} size="small">
                <AddIcon />
              </Button>

              <Button onClick={handleDelete} size="small">
                <DeleteIcon />
              </Button>
            </Box>
          </Box>

          {Boolean(consumedBy.length) && (
            <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Spliters</Typography>
              </AccordionSummary>

              <AccordionDetails>
                {consumedBy.map(({ id, name }) => (
                  <Typography key={id}>{name}</Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default Item
