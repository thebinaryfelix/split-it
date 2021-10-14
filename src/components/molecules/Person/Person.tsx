import { Card, CardContent, Typography } from '@mui/material'
import { IPerson } from 'db/interfaces'
import NumberFormat from 'react-number-format'

const Person = ({ id, amount, name }: IPerson) => (
  <Card>
    <CardContent>
      <Typography color="text.secondary" fontSize="small">
        {name}
      </Typography>

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
)

Person.defaultProps = {
  onClick: () => null,
}

export default Person
