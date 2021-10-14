import { v4 as uuidv4 } from 'uuid'
import {
  getItem,
  setItem,
  workspace,
  IProduct,
  ICreateProduct,
  IUpdateProduct,
  IProductPopulated,
} from 'db/localStorage'
import { getPerson } from './person'

const productsPath = `${workspace}.products`

export const createProduct = (product: ICreateProduct): void => {
  const newProduct: IProduct = {
    ...product,
    id: uuidv4(),
    value: parseFloat(product.value),
    consumedBy: [],
  }

  const { products } = getItem(productsPath)

  if (!products) {
    setItem(productsPath, { products: [newProduct] })
  } else {
    setItem(productsPath, { products: [...products, newProduct] })
  }
}

export const getProducts = (): IProduct[] => {
  const { products } = getItem(productsPath)
  return products ?? []
}

export const getPopulatedProducts = (): IProductPopulated[] => {
  const { products } = getItem(productsPath)
  const populatedProducts = []

  if (!products) {
    return []
  }

  for (let i = 0; i < products.length; i += 1) {
    const product = products[i]
    const populatedConsumedBy = []

    for (let j = 0; j < product.consumedBy.length; j += 1) {
      const personId = product.consumedBy[j]
      const person = getPerson(personId)
      populatedConsumedBy.push(person)
    }

    populatedProducts.push({ ...product, consumedBy: [...populatedConsumedBy] })
  }

  return populatedProducts ?? []
}

export const deleteProduct = (id: string): void => {
  const products = getProducts()
  const productsCopy = [...products]
  const productToDeleteIndex = products.findIndex(product => product.id === id)

  productsCopy.splice(productToDeleteIndex, 1)

  setItem(productsPath, { products: [...productsCopy] })
}

export const updateProduct = (id: string, data: IUpdateProduct): void => {
  const products = getProducts()
  const productsCopy = [...products]
  const productToUpdateIndex = products.findIndex(product => product.id === id)

  const originalProduct: IProduct = products[productToUpdateIndex]

  const newConsumer = data.consumedBy ? [data.consumedBy] : []

  const updatedConsumers = [...originalProduct.consumedBy, ...newConsumer]

  productsCopy.splice(productToUpdateIndex, 1, {
    ...originalProduct,
    ...data,
    consumedBy: [...updatedConsumers],
  })

  setItem(productsPath, { products: [...productsCopy] })
}
