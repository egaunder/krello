import { emailValidate, inputFieldNotEmpty, validateMinLength, validateMaxLength } from './form.validations'

describe('emailValidate', () => {
  test('should return error object with a property of email if no email is passed', () => {
    const result = emailValidate()
    expect(Object.keys(result)).toContain('email')
  })

  test('should return error object with a property of email', () => {
    const email = 'hey#.com'
    const result = emailValidate(email, {})
    expect(Object.keys(result)).toContain('email')
  })

  test('should return empty error object if email passes validation', () => {
    const email = 'test@test.com'
    const result = emailValidate(email, {})
    expect(Object.keys(result)).not.toContain('email')
  })
})

describe('inputFieldNotEmpty', () => {
  test('should contain error object with a property of fieldName', () => {
    const fieldName = 'username'
    const result = inputFieldNotEmpty(null, fieldName, {})
    expect(Object.keys(result)).toContain(fieldName)
  })

  test('should contain error object when property of filedName when input has no length', () => {
    const fieldName = 'username'
    const result = inputFieldNotEmpty('', fieldName, {})
    expect(Object.keys(result)).toContain(fieldName)
  })

  test('should not contain proeprty of username if valid input value passed in', () => {
    const fieldName = 'username'
    const inputValue = 'userTestName'
    const result = inputFieldNotEmpty(inputValue, fieldName, {})
    expect(Object.keys(result)).not.toContain(fieldName)
  })
})

describe('validateMinLength', () => {
  const fieldName = 'username'
  test('should return an object with property of fieldname if length < min', () => {
    const result = validateMinLength('', 3, fieldName, {})
    expect(Object.keys(result)).toContain(fieldName)
  })

  test('should return no object with property of fielName if length > min', () => {
    const input = 'hello'
    const result = validateMinLength(input, 3, fieldName, {})
    expect(Object.keys(result)).not.toContain(fieldName)
  })
})

describe('validateMaxLength', () => {
  const fieldName = 'username'
  test('should return an object with property of fieldname if length > min', () => {
    const input = 'Hi how are you doing'
    const result = validateMaxLength(input, 3, fieldName, {})
    expect(Object.keys(result)).toContain(fieldName)
  })

  test('should return an error with no property of fieldname if length < max', () => {
    const input = 'hello'
    const result = validateMaxLength(input, 10, fieldName, {})
    expect(Object.keys(result)).not.toContain(fieldName)
  })
})
