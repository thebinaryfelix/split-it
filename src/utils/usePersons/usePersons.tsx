import { useStore } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { ICreatePerson, IPerson, IProductPopulated, IUpdatePerson } from 'db/interfaces'

export interface ITable {
  [key: string]: number
}

const updatePersonAmountInProducts = (products: IProductPopulated[]) =>
  products.map(product => {
    const updatedConsumedBy = product.consumedBy.map(person => {
      const amountPerPerson = product.value / product.consumedBy.length
      return { ...person, amount: amountPerPerson }
    })
    return { ...product, consumedBy: [...updatedConsumedBy] }
  })

const usePersons = () => {
  const { persons, products, updateStore } = useStore()

  const createPerson = (person: ICreatePerson) => {
    const newPerson = { ...person, id: uuidv4(), amount: 0 }

    updateStore({ persons: [...persons, newPerson] })
  }

  const getPerson = (id: string): IPerson | undefined => persons.find(person => person.id === id)

  const updatePersons = (data: IUpdatePerson[]): void => {
    const updatedPersons = persons.map(person => {
      const personToUpdate = data.find(newPerson => newPerson.id === person.id)
      return personToUpdate ? { ...person, ...personToUpdate } : { ...person }
    })

    updateStore({ persons: [...updatedPersons] })
  }

  const calculateAmountPerPerson = () => {
    const table: ITable = {}
    const updatedProducts = updatePersonAmountInProducts(products)

    for (let i = 0; i < updatedProducts.length; i += 1) {
      const currentProduct = updatedProducts[i]

      for (let j = 0; j < currentProduct.consumedBy.length; j += 1) {
        const person = currentProduct.consumedBy[j]
        if (!table[person.id]) {
          table[person.id] = person.amount
        } else {
          table[person.id] += person.amount
        }
      }
    }

    return persons.map(person => ({ id: person.id, amount: table[person.id] || 0 }))
  }

  return { persons, calculateAmountPerPerson, createPerson, getPerson, updatePersons }
}

export default usePersons
