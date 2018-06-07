import React from 'react'
import { render, Simulate } from 'react-testing-library'
import SignupButton from '../SignupButton'

describe('SignupButton', () => {
  let onClick

  test('should render signup button', () => {
    onClick = jest.fn()
    expect(render(<SignupButton onClick={onClick} />))
  })

  test('should envoke onClick property', () => {
    onClick = jest.fn()
    const { getByText } = render(<SignupButton onClick={onClick} />)
    Simulate.click(getByText('Signup'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
