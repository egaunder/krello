import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Login from './Login'

describe('Login', () => {
  test('should render correctly', () => {
    const output = shallow(<Login />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
