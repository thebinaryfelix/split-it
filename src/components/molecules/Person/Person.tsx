import { Card, CardContent, Typography } from '@material-ui/core'
import { IPerson } from '@types'
import NumberFormat from 'react-number-format'

const Person = ({ amount, name }: IPerson) => (
  <Card>
    <CardContent>
      <Typography color="text.secondary" fontSize="small">
        {name}
      </Typography>

      <NumberFormat
        prefix="R$"
        value={amount}
        type="text"
        displayType="text"
        renderText={(formattedValue: string) => (
          <Typography color="text.secondary" fontSize="large">
            {formattedValue}
          </Typography>
        )}
      />
    </CardContent>
  </Card>
)

export default Person
