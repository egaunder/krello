import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Button from './Button'

describe('Button', () => {
  const props = {
    text: 'test',
    style: {},
    onClick: jest.fn(),
  }

  test('should render correctly', () => {
    const output = shallow(<Button {...props} />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  test('should contain a button', () => {
    const wrapper = mount(<Button {...props} />)
    const button = wrapper.find('button')
    expect(button.length).toBe(1)
  })

  test('should invoke callback on click', () => {
    const wrapper = mount(<Button {...props} />)
    wrapper.find('button').simulate('click')
    expect(props.onClick.mock.calls.length).toEqual(1)
  })
})
