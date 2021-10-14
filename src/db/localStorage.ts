export const workspace = 'splitit'

export const setItem = (path: string, item: unknown) =>
  window.localStorage.setItem(path, JSON.stringify(item))

export const getItem = (path: string) => {
  const item = window.localStorage.getItem(path)
  return item ? JSON.parse(item) : {}
}
