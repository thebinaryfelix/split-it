import { useStore } from 'store/store'
import { v4 as uuidv4 } from 'uuid'
import { ICreateProduct, IProductPopulated, IUpdateProduct } from 'db/interfaces'

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

  const getProduct = (id: string): IProductPopulated | undefined =>
    products.find(product => product.id === id)

  return { products, createProduct, getProduct, deleteProduct, updateProduct }
}

export default useProducts
