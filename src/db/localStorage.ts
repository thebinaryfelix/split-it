export interface IProduct {
  id: string
  name: string
  value: number
  consumedBy: string[]
}

export interface IProductPopulated {
  id: string
  name: string
  value: number
  consumedBy: IPerson[]
}

export interface ICreateProduct {
  name: string
  value: string
}

export interface IUpdateProduct {
  name?: string
  value?: number
  consumedBy?: string
}

export interface IPerson {
  id: string
  name: string
  amount: number
}

export interface IUpdatePerson {
  name?: string
  amount?: number
}

export interface ICreatePerson {
  name: string
}

export const workspace = 'splitit'

export const setItem = (path: string, item: unknown) =>
  window.localStorage.setItem(path, JSON.stringify(item))

export const getItem = (path: string) => {
  const item = window.localStorage.getItem(path)
  return item ? JSON.parse(item) : {}
}
