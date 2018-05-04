import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import LoginButton from './LoginButton'

describe('[LoginButton]', () => {
  test('should render correctly', () => {
    const output = shallow(<LoginButton />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
