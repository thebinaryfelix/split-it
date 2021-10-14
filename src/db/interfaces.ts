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
  consumedBy?: IPerson
}

export interface IPerson {
  id: string
  name: string
  amount: number
}

export interface IUpdatePerson {
  id: string
  amount: number
}

export interface ICreatePerson {
  name: string
}
