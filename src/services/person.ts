import { v4 as uuidv4 } from 'uuid'
import { ICreatePerson, IPerson, IUpdatePerson } from 'db/interfaces'
import { getItem, setItem, workspace } from 'db/localStorage'

const personsPath = `${workspace}.persons`

export const createPerson = (person: ICreatePerson): void => {
  const newPerson: IPerson = { ...person, id: uuidv4(), amount: 0 }

  const { persons } = getItem(personsPath)

  if (!persons) {
    setItem(personsPath, { persons: [newPerson] })
  } else {
    setItem(personsPath, { persons: [...persons, newPerson] })
  }
}

export const getPersons = (): IPerson[] => {
  const { persons } = getItem(personsPath)
  return persons ?? []
}

export const getPerson = (id: string): IPerson | undefined => {
  const persons = getPersons()
  return persons.find(person => person.id === id)
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
