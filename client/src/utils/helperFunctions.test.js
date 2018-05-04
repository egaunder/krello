import { empty } from './helperFunctions'

describe('empty', () => {
  test('should return a boolean', () => {
    const result = empty()
    expect(typeof result).toBe('boolean')
  })

  test('should return true if val is null', () => {
    const result = empty(null)
    expect(result).toEqual(true)
  })

  test('should return true if val is undefined', () => {
    const result = empty(undefined)
    expect(result).toEqual(true)
  })

  test('should return false if val is defined and initialized', () => {
    const result = empty('hey')
    expect(result).toEqual(false)
  })
})
