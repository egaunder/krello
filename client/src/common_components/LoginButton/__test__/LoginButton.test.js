import React from 'react'
import { render, Simulate } from 'react-testing-library'
import LoginButton from '../LoginButton'

describe('LoginButton', () => {
  let onClick

  test('should render a button', () => {
    onClick = jest.fn()
    expect(render(<LoginButton onClick={onClick} />))
  })

  test('should envoke onClick when button is clicked on', () => {
    onClick = jest.fn()
    const { getByText } = render(<LoginButton onClick={onClick} />)
    Simulate.click(getByText('Login'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
