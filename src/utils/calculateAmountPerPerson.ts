import { getPersons, updatePerson } from 'services/person'
import { getProducts } from 'services/product'

export interface ITable {
  [key: string]: number
}

const calculateAmountPerPerson = (): void => {
  const persons = getPersons()
  const products = getProducts()

  const newTable: ITable = {}

  for (let i = 0; i < persons.length; i += 1) {
    const { id: personId } = persons[i]

    const isNewPerson = Boolean(!newTable[personId])
    if (isNewPerson) {
      newTable[personId] = 0
    }

    for (let j = 0; j < products.length; j += 1) {
      const currentProduct = products[j]
      const personHasConsumedItem = currentProduct.consumedBy.includes(personId)

      if (personHasConsumedItem) {
        const amountOfPeopleSharingTheItem = currentProduct.consumedBy.length
        const valuePerPerson = currentProduct.value / amountOfPeopleSharingTheItem

        if (newTable[personId]) {
          newTable[personId] += valuePerPerson
        } else {
          newTable[personId] = valuePerPerson
        }
      }
    }
  }

  const tableKeys = Object.keys(newTable)

  for (let i = 0; i < tableKeys.length; i += 1) {
    const personId = tableKeys[i]
    updatePerson(personId, { amount: newTable[personId] })
  }
}

export default calculateAmountPerPerson
