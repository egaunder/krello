import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Signup from './Signup'

describe('Signup', () => {
  test('should render correctly', () => {
    const output = shallow(<Signup />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
