import { IItem, ITable } from 'App'

interface NewTable extends ITable {}

const calculateAmountPerPerson = (table: ITable, items: IItem[]): ITable => {
  const newTable: NewTable = {}
  const tableKeys = Object.keys(table)

  for (let tableIndex = 0; tableIndex < tableKeys.length; tableIndex += 1) {
    const personName = tableKeys[tableIndex]

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const currentItem = items[itemIndex]
      const personHasConsumedItem = currentItem.names.includes(personName)

      if (personHasConsumedItem) {
        const isNewPerson = Boolean(!newTable[personName])

        if (isNewPerson) {
          newTable[personName] = { amount: 0 }
        }

        const personInfo = newTable[personName]
        const amountOfPeopleSharingTheItem = currentItem.names.length
        const valuePerPerson = currentItem.value / amountOfPeopleSharingTheItem

        if (personInfo.amount) {
          personInfo.amount = personInfo.amount + valuePerPerson
        } else {
          personInfo.amount = valuePerPerson
        }
      }
    }
  }

  return { ...newTable }
}

export default calculateAmountPerPerson
