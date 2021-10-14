import { v4 as uuidv4 } from 'uuid'
import { ICreatePerson, IPerson, IUpdatePerson } from 'db/interfaces'
import { getItem, setItem, workspace } from 'db/localStorage'

const personsPath = `${workspace}.persons`

export const createPerson = (person: ICreatePerson): IPerson => {
  return { ...person, id: uuidv4(), amount: 0 }
}

export const getPersons = (): IPerson[] => {
  const { persons } = getItem(personsPath)
  return persons ?? []
}

export const deletePerson = (id: string): void => {
  const persons = getPersons()
  const personsCopy = [...persons]
  const productToDeleteIndex = persons.findIndex(person => person.id === id)

  personsCopy.splice(productToDeleteIndex, 1)

  setItem(personsPath, { persons: [...personsCopy] })
}

export const updatePerson = (id: string, data: IUpdatePerson): void => {
  const persons = getPersons()
  const personsCopy = [...persons]
  const personToUpdateIndex = persons.findIndex(product => product.id === id)

  const originalPerson: IPerson = persons[personToUpdateIndex]

  personsCopy.splice(personToUpdateIndex, 1, {
    ...originalPerson,
    ...data,
  })

  setItem(personsPath, { persons: [...personsCopy] })
}
