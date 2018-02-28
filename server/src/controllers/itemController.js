import Item from '../models/item'

export const itemToJson = (item = {}) => {
  const name = item.name || ''
  const description = item.description || ''
  return { name, description }
}