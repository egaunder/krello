import { isValidEmail, inputFieldNotEmpty, isValidMinLength, isValidMaxLength } from './form.validations'

describe('isValidEmail', () => {
  test('should return false if no email is passed', () => {
    const result = isValidEmail()
    expect(result).toBe(false)
  })

  test('should return false if invalid email passed', () => {
    const email = 'hey#.com'
    const result = isValidEmail(email)
    expect(result).toBe(false)
  })

  test('should return true if valid email passed in', () => {
    const email = 'test@test.com'
    const result = isValidEmail(email)
    expect(result).toBe(true)
  })
})

describe('inputFieldNotEmpty', () => {
  test('should return false if null passed in', () => {
    const result = inputFieldNotEmpty(null)
    expect(result).toBe(false)
  })

  test('should return false if empty string passed in', () => {
    const result = inputFieldNotEmpty('')
    expect(result).toBe(false)
  })

  test('should return true if valid input passed in', () => {
    const inputValue = 'userTestName'
    const result = inputFieldNotEmpty(inputValue)
    expect(result).toBe(true)
  })
})

describe('isValidMinLength', () => {
  test('should return false if length < min', () => {
    const result = isValidMinLength('', 3)
    expect(result).toBe(false)
  })

  test('should return true if length > min', () => {
    const input = 'hello'
    const result = isValidMinLength(input, 3)
    expect(result).toBe(true)
  })
})

describe('isValidMaxLength', () => {
  test('should return false if length > max', () => {
    const input = 'Hi how are you doing'
    const result = isValidMaxLength(input, 3)
    expect(result).toBe(false)
  })

  test('should return true if length < max', () => {
    const input = 'hello'
    const result = isValidMaxLength(input, 10)
    expect(result).toBe(true)
  })
})
