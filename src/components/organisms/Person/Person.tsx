import { Card, CardContent, Typography } from '@mui/material'
import NumberFormat from 'react-number-format'
import EditPersonDialog from 'components/molecules/EditPersonDialog/EditPersonDialog'
import { IPerson, IUpdatePerson } from 'db/interfaces'
import { useState } from 'react'
import { usePersons } from 'utils'

const Person = ({ id, amount, name }: IPerson) => {
  const { updatePersons } = usePersons()

  const [openEditPerson, setEditPerson] = useState(false)

  const handleUpdatePerson = (newPerson: IUpdatePerson) => {
    updatePersons([{ ...newPerson, id }])
  }

  return (
    <>
      <EditPersonDialog
        open={openEditPerson}
        onClose={() => setEditPerson(false)}
        onSubmit={handleUpdatePerson}
        defaultValues={{ name }}
      />

      <Card onClick={() => setEditPerson(true)}>
        <CardContent>
          <Typography color="text.primary">{name}</Typography>

          <NumberFormat
            prefix="R$ "
            type="text"
            displayType="text"
            value={amount.toFixed(2)}
            allowNegative={false}
            renderText={(formattedValue: string) => (
              <Typography color="text.secondary" fontSize="large">
                {formattedValue}
              </Typography>
            )}
          />
        </CardContent>
      </Card>
    </>
  )
}

Person.defaultProps = {
  onClick: () => null,
}

export default Person
