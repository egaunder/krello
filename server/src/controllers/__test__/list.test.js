import { listToJson } from '../listController'

describe('listToJson', () => {
  test('should return an object', () => {
    const result = listToJson()
    expect(typeof result).toBe('object')
  })

  test('should return an object with two properties ( name, items )', () => {
    const testList = {
      id: '',
      name: 'Test name',
      items: [],
      testProp: 'hey',
    }

    const desiredResult = {
      id: '',
      name: 'Test name',
      items: [],
    }

    const result = listToJson(testList)
    expect(result).toEqual(desiredResult)
  })
})
