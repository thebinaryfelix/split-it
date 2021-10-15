import { useStore } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { ICreateProduct, IProductPopulated, IUpdateProduct } from 'db/interfaces'
import { useCallback } from 'react'

const useProducts = () => {
  const { products, updateStore } = useStore()

  const createProduct = (product: ICreateProduct): void => {
    const newProduct = {
      ...product,
      id: uuidv4(),
      value: parseFloat(product.value),
      consumedBy: [],
    }

    updateStore({ products: [...products, newProduct] })
  }

  const deleteProduct = (id: string): void => {
    const productsCopy = [...products]
    const productToDeleteIndex = products.findIndex(product => product.id === id)

    productsCopy.splice(productToDeleteIndex, 1)

    updateStore({ products: [...productsCopy] })
  }

  const updateProduct = (id: string, data: IUpdateProduct): void => {
    const productsCopy = [...products]
    const productToUpdateIndex = products.findIndex(product => product.id === id)
    const originalProduct: IProductPopulated = products[productToUpdateIndex]

    const newConsumer = data.consumedBy ? [data.consumedBy] : []
    const updatedConsumers = [...originalProduct.consumedBy, ...newConsumer]

    productsCopy.splice(productToUpdateIndex, 1, {
      ...originalProduct,
      ...data,
      consumedBy: [...updatedConsumers],
    })

    updateStore({ products: [...productsCopy] })
  }

  const getProduct = useCallback(
    (id: string): IProductPopulated | undefined => products.find(product => product.id === id),
    [products],
  )

  const deleteConsumer = (id: string, personId: string): void => {
    const product = getProduct(id)
    if (product) {
      const productCopy = { ...product }
      const consumerIndex = productCopy.consumedBy.findIndex(consumer => consumer.id === personId)
      productCopy.consumedBy.splice(consumerIndex, 1)

      const productsCopy = [...products]
      const productToUpdateIndex = products.findIndex(product => product.id === id)
      const originalProduct: IProductPopulated = products[productToUpdateIndex]

      productsCopy.splice(productToUpdateIndex, 1, {
        ...originalProduct,
        consumedBy: [...productCopy.consumedBy],
      })

      updateStore({ products: [...productsCopy] })
    }
  }

  return { products, createProduct, getProduct, deleteProduct, updateProduct, deleteConsumer }
}

export default useProducts
