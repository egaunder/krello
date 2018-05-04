import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import NavButton from './NavButton'

describe('NavButton', () => {
  test('should render correctly', () => {
    const render = jest.fn();
    const output = shallow(<NavButton render={render} />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  test('should render button when passed as props', () => {
    const render = () => <button>Test Button</button>
    const wrapper = mount(<NavButton render={render} />)
    const button = wrapper.find('button')
    expect(button.length).toBe(1)
  })
})