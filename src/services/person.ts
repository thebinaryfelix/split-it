import { v4 as uuidv4 } from 'uuid'
import { ICreatePerson, IPerson } from 'db/interfaces'
import { getItem, workspace } from 'db/localStorage'

const personsPath = `${workspace}.persons`

export const createPerson = (person: ICreatePerson): IPerson => {
  return { ...person, id: uuidv4(), amount: 0 }
}

export const getPersons = (): IPerson[] => {
  const { persons } = getItem(personsPath)
  return persons ?? []
}
