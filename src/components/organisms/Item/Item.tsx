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
  IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import NumberFormat from 'react-number-format'
import AddPersonToItemDialog from 'components/molecules/AddPersonToItemDialog'
import { IPerson } from 'db/interfaces'
import { usePersons, useProducts } from 'utils'
import DeleteItemDialog from 'components/molecules/DeleteItemDialog'

interface ItemProps {
  id: string
  title: string
  value: number
  consumedBy: IPerson[]
}

const Item = ({ id, title, value, consumedBy }: ItemProps) => {
  const { deleteProduct, updateProduct, deleteConsumer } = useProducts()
  const { getPerson } = usePersons()

  const [openPersonToItem, setOpenPersonToItem] = useState(false)
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false)
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

  const handleDeleteConsumer = (personId: string) => {
    deleteConsumer(id, personId)
  }

  const handleConfirmItemDeletion = () => {
    handleDelete()
  }

  return (
    <>
      <AddPersonToItemDialog
        productId={id}
        open={openPersonToItem}
        onSubmit={handleSubmitPersonToItem}
        onClose={() => setOpenPersonToItem(false)}
      />

      <DeleteItemDialog
        open={openDeleteItemDialog}
        onConfirm={handleConfirmItemDeletion}
        onCancel={() => setOpenDeleteItemDialog(false)}
      />

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography gutterBottom>{title}</Typography>

              <NumberFormat
                prefix="R$ "
                type="text"
                displayType="text"
                value={value.toFixed(2)}
                allowNegative={false}
                renderText={(formattedValue: string) => (
                  <Typography gutterBottom>{formattedValue}</Typography>
                )}
              />
            </Box>

            <Box>
              <Button onClick={() => setOpenDeleteItemDialog(true)} color="error">
                <DeleteIcon />
              </Button>

              <Button onClick={() => setOpenPersonToItem(true)} color="success">
                <AddIcon />
              </Button>
            </Box>
          </Box>

          {Boolean(consumedBy.length) && (
            <Accordion expanded={expanded} onChange={() => setExpanded(prev => !prev)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Spliters</Typography>
              </AccordionSummary>

              <AccordionDetails>
                {consumedBy.map(({ id: consumerId, name }) => (
                  <Box
                    key={consumerId}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                  >
                    <Typography>{name}</Typography>
                    <IconButton color="error" onClick={() => handleDeleteConsumer(consumerId)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
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
