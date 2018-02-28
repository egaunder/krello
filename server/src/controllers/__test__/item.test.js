import { itemToJson } from '../itemController'

describe('itemToJson', () => {
  test('should return an object', () => {
    const result = itemToJson()
    expect(typeof result).toBe('object')
  })

  test('should only return specific values', () => {
    const name = 'john'
    const description = 'make sure to call john'
    const age = '32'
    const item = { name, description, age }
    const result = itemToJson(item)
    expect(result.name).toBe(name)
    expect(result.description).toBe(description)
    expect(result.age).not.toBeDefined()
  })
})
