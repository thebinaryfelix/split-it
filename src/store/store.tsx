import { IPerson, IProductPopulated } from 'db/interfaces'
import { createContext, useContext, useState } from 'react'
import { getPersons } from 'services/person'
import { getProducts } from 'services/product'

interface IStoreUpdate {
  theme?: string
  persons?: IPerson[]
  products?: IProductPopulated[]
}

interface IStoreContext {
  theme: string
  persons: IPerson[]
  products: IProductPopulated[]
  updateStore: (data: IStoreUpdate) => void
}

const initialPersons = getPersons()
const initialProducts = getProducts()

export const StoreContext = createContext<IStoreContext>({
  persons: [],
  products: [],
  theme: '',
  updateStore: () => null,
})

export const useStore = () => useContext(StoreContext)

const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState({
    persons: [...initialPersons],
    products: [...initialProducts],
    theme: 'light',
  })

  const handleUpdateStore = (data: IStoreUpdate) => {
    setStore(prev => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <StoreContext.Provider value={{ ...store, updateStore: handleUpdateStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
