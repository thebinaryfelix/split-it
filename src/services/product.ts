import { IProductPopulated } from 'db/interfaces'
import { getItem, workspace } from 'db/localStorage'

const productsPath = `${workspace}.products`

export const getProducts = (): IProductPopulated[] => {
  const { products } = getItem(productsPath)
  return products ?? []
}
